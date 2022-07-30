import { z } from 'zod'

export type Files = Record<string, string>

export type MdxPost = {
  code: string
  // Slugs are determined by the directory names inside of the mdx-content folder
  slug: string
  // Would be cool to use a branded type for the date
  // https://spin.atomicobject.com/2017/06/19/strongly-typed-date-string-typescript/
  date: string
  frontmatter: Frontmatter
}

export type Post = {
  markdown: string
  frontmatter: Frontmatter
  // Slugs are determined by the directory names inside of the md-content folder
  slug: string
  // Would be cool to use a branded type for the date
  // https://spin.atomicobject.com/2017/06/19/strongly-typed-date-string-typescript/
  date: string
}

export const Frontmatter = z.object({
  title: z.string(),
  description: z.string(),
})

export type Frontmatter = z.infer<typeof Frontmatter>
