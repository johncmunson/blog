import { z } from 'zod'

/**
 * Create branded types
 * https://github.com/colinhacks/zod/issues/3#issuecomment-794459823
 * https://spin.atomicobject.com/2017/06/19/strongly-typed-date-string-typescript/
 *
 * UPDATE: Zod now has this functionality built-in. Use that instead. Todo later.
 * https://github.com/colinhacks/zod#brand
 */
type Tagged<T, Tag> = T & { __tag: Tag }

export type Files = Record<string, string>

export type Post = {
  markdown: string
  frontmatter: Frontmatter
  slug: string
  date: string
}
export type Posts = Post[]

export type Tag = Tagged<string, 'tag'>
export type Tags = Tag[]
export type PostsByTag = { [tag: Tag]: Posts }

export type Series = Tagged<string, 'series'>
export type AllSeries = Series[]
export type PostsBySeries = { [series: Series]: Posts }

/**
 * 'published' will get built
 * 'draft' will not
 * 'infer' is the default and will look at the publish date to determine whether or not to build a post
 */
export type Status = 'published' | 'draft' | 'infer'

export const Frontmatter = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  tags: z.array(z.string().min(1)).min(1) as unknown as z.Schema<Tags>,
  coverPhoto: z
    .string()
    .optional()
    .refine((str) =>
      str ? str.endsWith('.png') || str.endsWith('.jpg') : true
    ),
  series: z.string().optional() as unknown as z.Schema<Series | undefined>,
  status: z
    .string()
    .regex(/^published$|^draft$|^infer$/)
    .optional()
    .default('infer') as unknown as z.Schema<Status>,
})

export type Frontmatter = z.infer<typeof Frontmatter>
