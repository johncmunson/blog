import fs from 'fs'
import { join } from 'path'
import { sleep } from './utils'
import matter from 'gray-matter'
import {
  Frontmatter,
  Post,
  Tag,
  Tags,
  PostsByTag,
  Posts,
  PostsBySeries,
  Series,
  Serieses,
} from '../types'

const postsDirectory = join(process.cwd(), 'content')

export function getPostSlugs(includeDrafts = false) {
  const slugs = fs
    .readdirSync(postsDirectory)
    .map((slug) => slug.replace(/\.md$/, ''))
    .sort((slug1, slug2) => (slug1 > slug2 ? -1 : 1))

  return includeDrafts ? slugs : slugs.filter((s) => !s.startsWith('DRAFT'))
}

export function getNextSlug(slug: string): string | undefined {
  const slugs = getPostSlugs()
  const index = slugs.indexOf(slug)
  return slugs[index + 1]
}

export function getPrevSlug(slug: string): string | undefined {
  const slugs = getPostSlugs()
  const index = slugs.indexOf(slug)
  return slugs[index - 1]
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const date = slug.startsWith('DRAFT') ? 'DRAFT' : slug.slice(0, 10)
  const fullPath = join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // Consider using Remark to parse the frontmatter, since we're using that anyway to parse the markdown
  const { data: frontmatter, content: markdown } = matter(fileContents)

  const validatedFrontmatter = Frontmatter.safeParse(frontmatter)
  if (!validatedFrontmatter.success) {
    throw new Error(
      `Error parsing frontmatter for post '${slug}': ${JSON.stringify(
        validatedFrontmatter.error.issues
      )}`
    )
  }

  // This function doesn't actually need to be async because the content is all on the local filesystem.
  // But if we were fetching posts from an external source, such as a CMS or something, then this function
  // would definitely be async. So it's good to get in the async mindset.
  await sleep(1)

  return {
    markdown,
    frontmatter: validatedFrontmatter.data,
    slug,
    date,
  }
}

export async function getAllPosts(includeDrafts = false) {
  const slugs = getPostSlugs(includeDrafts)
  return await Promise.all(slugs.map(getPostBySlug))
}

export async function getPostsByTag(): Promise<PostsByTag>
export async function getPostsByTag(tag: Tag): Promise<Posts | undefined>
export async function getPostsByTag(
  tag?: Tag
): Promise<PostsByTag | Posts | undefined> {
  const posts = await getAllPosts()
  const postsByTag = posts.reduce<{ [tag: Tag]: Post[] }>(
    (postsByTag, currentPost) => {
      const { tags } = currentPost.frontmatter
      tags.forEach((t) => {
        postsByTag[t] = postsByTag[t]
          ? [...postsByTag[t], currentPost]
          : [currentPost]
      })
      return postsByTag
    },
    {}
  )

  return tag ? postsByTag[tag] : postsByTag
}

export async function getPostsBySeries(): Promise<PostsBySeries>
export async function getPostsBySeries(
  series: Series
): Promise<Posts | undefined>
export async function getPostsBySeries(
  series?: Series
): Promise<PostsBySeries | Posts | undefined> {
  // Include drafts as well so we can show upcoming posts in a series
  const posts = await getAllPosts(true)
  const postsBySeries = posts.reduce<{ [series: Series]: Post[] }>(
    (postsBySeries, currentPost) => {
      const { series } = currentPost.frontmatter
      if (series) {
        postsBySeries[series] = postsBySeries[series]
          ? [currentPost, ...postsBySeries[series]]
          : [currentPost]
      }
      return postsBySeries
    },
    {}
  )

  // It's not yet a "series" if there is only one post in the series
  for (const series in postsBySeries) {
    if (postsBySeries[series as Series].length === 1)
      delete postsBySeries[series as Series]
  }

  return series ? postsBySeries[series] : postsBySeries
}

export async function getAllPostTags(): Promise<Tags> {
  const postsByTag = await getPostsByTag()
  const allTags = Object.keys(postsByTag) as Tags
  const sortedTags = [...allTags].sort((a, b) => a.localeCompare(b))
  return sortedTags
}

export async function getAllPostSeries(): Promise<Serieses> {
  const postsBySeries = await getPostsBySeries()
  const allSeries = Object.keys(postsBySeries) as Serieses
  const sortedSeries = [...allSeries].sort((a, b) => a.localeCompare(b))
  return sortedSeries
}
