import fs from 'fs'
import { join } from 'path'
import { sleep } from './utils'
import matter from 'gray-matter'
import authors from '../public/authors.json'
import {
  Tag,
  Tags,
  Post,
  Posts,
  Series,
  Author,
  Authors,
  Serieses,
  PostsByTag,
  PostsBySeries,
  PostsByAuthors,
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
  const publishDate = slug.startsWith('DRAFT') ? 'DRAFT' : slug.slice(0, 10)
  const fullPath = join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // Consider using Remark to parse the frontmatter, since we're using that anyway to parse the markdown
  const { data: frontmatter, content: markdown } = matter(fileContents)

  // This function doesn't actually need to be async because the content is all on the local filesystem.
  // But if we were fetching posts from an external source, such as a CMS or something, then this function
  // would definitely be async. So it's good to get in the async mindset.
  await sleep(1)

  const validatedPost = Post.safeParse({
    markdown,
    frontmatter,
    slug,
    publishDate,
  })

  if (!validatedPost.success) {
    throw new Error(
      `Error parsing the data for post '${slug}': ${JSON.stringify(
        validatedPost.error.issues
      )}`
    )
  }

  return validatedPost.data
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
  const postsByTag = posts.reduce<{ [tag: Tag]: Posts }>(
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
  const postsBySeries = posts.reduce<{ [series: Series]: Posts }>(
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

export async function getPostsByAuthor(): Promise<PostsByAuthors>
export async function getPostsByAuthor(
  fullName: string
): Promise<Posts | undefined>
export async function getPostsByAuthor(
  fullName?: string
): Promise<PostsByAuthors | Posts | undefined> {
  const posts = await getAllPosts()
  const postsByAuthor = posts.reduce<{ [author: string]: Posts }>(
    (postsByAuthor, currentPost) => {
      const { author } = currentPost.frontmatter
      postsByAuthor[author] = postsByAuthor[author]
        ? [...postsByAuthor[author], currentPost]
        : [currentPost]
      return postsByAuthor
    },
    {}
  )

  return fullName ? postsByAuthor[fullName] : postsByAuthor
}

export async function getAllPostTags(): Promise<Tags> {
  const postsByTag = await getPostsByTag()
  const allTags = Object.keys(postsByTag) as Tags
  allTags.sort((a, b) => a.localeCompare(b))

  return allTags
}

export async function getAllPostSeries(): Promise<Serieses> {
  const postsBySeries = await getPostsBySeries()
  const allSeries = Object.keys(postsBySeries) as Serieses
  allSeries.sort((a, b) => a.localeCompare(b))

  return allSeries
}

export async function getAllPostAuthors(): Promise<Authors> {
  const postsByAuthor = await getPostsByAuthor()

  const publishedAuthors = Object.keys(postsByAuthor)
    .map((fullName) => {
      const jsonAuthor = authors.find(
        (a) => `${a.first} ${a.last}` === fullName
      )
      if (!jsonAuthor)
        throw new Error(
          `${fullName} has not been registered in /public/authors.json`
        )
      return {
        ...jsonAuthor,
        numberOfPosts: postsByAuthor[fullName].length,
      }
    })
    .sort((a, b) => b.numberOfPosts - a.numberOfPosts)

  const validatedAuthors = publishedAuthors.map((author) => {
    const validatedAuthor = Author.safeParse(author)
    if (!validatedAuthor.success) {
      throw new Error(
        `Error parsing the data for author '${author}': ${JSON.stringify(
          validatedAuthor.error.issues
        )}`
      )
    }
    return validatedAuthor.data
  })

  return validatedAuthors
}

export async function getAuthorByName(fullName: string): Promise<Author> {
  const authorPosts = await getPostsByAuthor(fullName)
  if (!authorPosts) throw new Error(`${fullName} has not published any posts`)
  const jsonAuthor = authors.find((a) => `${a.first} ${a.last}` === fullName)
  const validatedAuthor = Author.safeParse({
    ...jsonAuthor,
    numberOfPosts: authorPosts.length,
  })
  if (!validatedAuthor.success) {
    throw new Error(
      `Error parsing the data for author '${fullName}': ${JSON.stringify(
        validatedAuthor.error.issues
      )}`
    )
  }
  return validatedAuthor.data
}
