import fs from 'fs'
import { sleep } from './utils'
import { join } from 'path'
import matter from 'gray-matter'
import { Frontmatter, Post, Tag, Tags, PostsByTag, Posts } from '../types'

const postsDirectory = join(process.cwd(), 'content')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).map((slug) => slug.replace(/\.md$/, ''))
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const date = slug.slice(0, 10)
  const fullPath = join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: frontmatter, content: markdown } = matter(fileContents)

  // Use zod to validate the frontmatter
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

export async function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = (await Promise.all(slugs.map(getPostBySlug))).sort(
    (post1, post2) => (post1.date > post2.date ? -1 : 1)
  )
  return posts
}

export async function getPostsByTag(): Promise<PostsByTag>
export async function getPostsByTag(tag: Tag): Promise<Posts>
export async function getPostsByTag(tag?: Tag): Promise<PostsByTag | Posts> {
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

export async function getAllPostTags(): Promise<Tags> {
  const posts = await getAllPosts()
  const tags = Array.from(new Set(posts.map((p) => p.frontmatter.tags).flat()))
  // Did you know that .sort mutates the original array in place??
  const sortedTags = [...tags].sort((a, b) => a.localeCompare(b))
  return sortedTags
}
