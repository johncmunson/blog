import { z } from 'zod'

export type Files = Record<string, string>

export type Post = {
  code: string
  slug: string // slugs are determined by the directory names inside of the content folder
  frontmatter: Frontmatter
}

export const Frontmatter = z.object({
  title: z.string(),
  description: z.string(),
})

export type Frontmatter = z.infer<typeof Frontmatter>
