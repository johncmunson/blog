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

export type Posts = Post[]

export type Tag = Tagged<string, 'tag'>
export type Tags = Tag[]
export type PostsByTag = { [tag: Tag]: Posts }

export type Series = Tagged<string, 'series'>
export type Serieses = Series[]
export type PostsBySeries = { [series: Series]: Posts }

export const Author = z.object({
  first: z.string(),
  last: z.string(),
  avatar: z.string(),
  bio: z.string().min(100).max(1000),
  twitter: z.string().optional(),
  numberOfPosts: z.number(),
})
export type Author = z.infer<typeof Author>
export type Authors = Author[]
export type PostsByAuthors = { [author: string]: Posts }

const Frontmatter = z.object({
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
})

const PublishDate = z
  .string()
  .regex(/20\d{2}-[01]\d-[0123]\d/)
  .or(z.literal('DRAFT'))

export const Post = z.object({
  markdown: z.string(),
  frontmatter: Frontmatter,
  slug: z.string(),
  // Can be 'YYYY-MM-DD' or 'DRAFT'
  // I would prefer to make the type Date | 'DRAFT', but Next doesn't allow date objects to be
  // returned from getStaticProps, etc. You have to first serialize them yourself. In addition,
  // it's not readily apparent how to customize the deserialize behavior, so that date strings
  // can be parsed back into date objects before being passed as props to the page components.
  // JSON.parse accepts a "reviver" function, but Next doesn't seem to expose this. Although,
  // I know this is somehow possible, since the next-superjson-plugin is doing this.
  publishDate: PublishDate,
})

export type Post = z.infer<typeof Post>
