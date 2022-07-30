import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Frontmatter, Post } from '../types'
import { sleep } from '.'

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
    slug: slug,
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
