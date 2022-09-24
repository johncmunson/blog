import { z } from 'zod'

// Create branded types
// https://github.com/colinhacks/zod/issues/3#issuecomment-794459823
// https://spin.atomicobject.com/2017/06/19/strongly-typed-date-string-typescript/
type Tagged<T, Tag> = T & { __tag: Tag }

export type Files = Record<string, string>

export type Post = {
  markdown: string
  frontmatter: Frontmatter
  // Slugs are determined by the filenames inside of the content folder
  slug: string
  date: string
}
export type Posts = Post[]
export type Tag = Tagged<string, 'tag'>
export type Tags = Tag[]
export type PostsByTag = { [tag: Tag]: Posts }

export const Frontmatter = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  tags: z.array(z.string().min(1)).min(1) as unknown as z.Schema<Tags>,
})

export type Frontmatter = z.infer<typeof Frontmatter>
