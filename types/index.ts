import { z } from "zod"

export type Files = Record<string, string>

export type Post = {
  code: string
  frontmatter: Frontmatter
}

export const Frontmatter = z.object({
  title: z.string(),
  description: z.string(),
})

export type Frontmatter = z.infer<typeof Frontmatter>
