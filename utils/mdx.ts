import fs from 'fs'
import path from 'path'
import { asyncForEach } from '.'
import memoize from 'lodash/memoize'
import { bundleMDX } from 'mdx-bundler'
import { PluggableList } from 'unified'
import { Files, Frontmatter, Post } from '../types'

// @ts-expect-error: no types available
import addClasses from 'rehype-add-classes'
// This package is useful for parsing frontmatter
// import matter from "gray-matter"

const { readdir, readFile } = fs.promises
const POSTS_PATH = path.join(process.cwd(), 'content')

const getFileContent = async (slug: string) => {
  const fileBuffer = await readFile(path.join(POSTS_PATH, slug, 'index.mdx'))
  return fileBuffer.toString().trim()
}

const prepareMDX = async (
  slug: string,
  rawMdx: string,
  rawMdxComponents?: Files
): Promise<Post> => {
  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  // Add your remark and rehype plugins here
  const remarkPlugins: PluggableList = []
  const rehypePlugins: PluggableList = [
    [
      addClasses,
      {
        h1: 'text-5xl mb-5',
        h2: 'text-4xl mb-5',
        h3: 'text-3xl mb-5',
        h4: 'text-2xl mb-5',
        h5: 'text-xl mb-5',
        h6: 'text-lg mb-5',
        p: 'mb-5',
        ol: '-mt-4 mb-5 ml-5 list-decimal',
        ul: '-mt-4 mb-5 ml-5 list-disc',
      },
    ],
  ]

  const mdx = await bundleMDX<Frontmatter>({
    source: rawMdx,
    files: rawMdxComponents,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mdxOptions(options, frontmatter) {
      // This is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...rehypePlugins,
      ]

      return options
    },
  })

  // Extract the date from the slug
  const date = slug.slice(0, 10)

  // Use zod to validate the frontmatter
  const validatedFrontmatter = Frontmatter.safeParse(mdx.frontmatter)
  if (!validatedFrontmatter.success) {
    throw new Error(
      `Error parsing frontmatter for post '${slug}': ${JSON.stringify(
        validatedFrontmatter.error.issues
      )}`
    )
  }

  return { ...mdx, date, slug }
}

const getComponents = async (slug: string) => {
  const components: Files = {}

  const files = await readdir(path.join(POSTS_PATH, slug))

  await asyncForEach(files, async (file) => {
    if (file.slice(-3) === 'tsx') {
      const filePath = path.join(POSTS_PATH, slug, file)
      const fileBuffer = await readFile(filePath)
      components[`./${file}`] = fileBuffer.toString().trim()
    }
  })

  return components
}

export const getAllSlugs = async () => {
  return readdir(POSTS_PATH)
}

const _getSinglePost = async (slug: string) => {
  const rawMdx = await getFileContent(slug)
  const rawMdxComponents = await getComponents(slug)
  return prepareMDX(slug, rawMdx, rawMdxComponents)
}
export const getSinglePost = memoize(_getSinglePost)

export const getAllPosts = async () => {
  const slugs = await getAllSlugs()
  return Promise.all(slugs.map(getSinglePost))
}
