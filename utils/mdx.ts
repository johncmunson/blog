import fs from "fs"
import path from "path"
import { bundleMDX } from "mdx-bundler"
import { PluggableList } from "unified"
import matter from "gray-matter"
// @ts-ignore - no types available
import addClasses from "rehype-add-classes"

const { readdir, readFile } = fs.promises
const POSTS_PATH = path.join(process.cwd(), "content")

export type Frontmatter = {
  title: string
  description: string
}
type Files = Record<string, string>

export async function asyncForEach<T>(
  array: T[],
  callback: (item: T, index: number, allItems: T[]) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const getFileContent = async (slug: string) => {
  const fileBuffer = await readFile(path.join(POSTS_PATH, slug, "index.mdx"))
  return fileBuffer.toString().trim()
}

export const prepareMDX = async (source: string, files?: Files) => {
  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    )
  }

  // Add your remark and rehype plugins here
  const remarkPlugins: PluggableList = []
  const rehypePlugins: PluggableList = [
    [
      addClasses,
      {
        h1: "text-5xl mb-5",
        h2: "text-4xl mb-5",
        h3: "text-3xl mb-5",
        h4: "text-2xl mb-5",
        h5: "text-xl mb-5",
        h6: "text-lg mb-5",
        p: "mb-5",
        ol: "-mt-4 mb-5 ml-5 list-decimal",
        ul: "-mt-4 mb-5 ml-5 list-disc",
      },
    ],
  ]

  const mdx = await bundleMDX<Frontmatter>({
    source,
    files,
    xdmOptions(options, frontmatter) {
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

  // Should use Zod to validate the mdx.frontmatter before returning.
  // If it's invalid, we want to fail early with a helpful error message.

  return mdx
}

export const getSinglePost = async (slug: string) => {
  const source = await getFileContent(slug)
  const files = await getComponents(slug)
  return prepareMDX(source, files)
}

export const getAllPosts = async () => {
  const slugs = await getAllSlugs()
  return Promise.all(slugs.map(getSinglePost))
}

export const getAllSlugs = async () => {
  return readdir(POSTS_PATH)
}

// Use this in [slug].tsx getStaticProps
export const getComponents = async (slug: string) => {
  const components: Files = {}

  const files = await readdir(path.join(POSTS_PATH, slug))

  await asyncForEach(files, async (file) => {
    if (file.substr(-3) === "tsx") {
      const fileBuffer = await readFile(path.join(POSTS_PATH, slug, file))

      components[`./${file}`] = fileBuffer.toString().trim()
    }
  })

  return components
}
