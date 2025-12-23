import fs from "fs"
import path from "path"
import { unified, type Plugin } from "unified"
import remarkParse from "remark-parse"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeReact from "rehype-react"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeShiki from "@shikijs/rehype"
import { jsx, jsxs } from "react/jsx-runtime"
import Image from "next/image"
import Link from "next/link"
import React, { Fragment } from "react"
import { type VFile } from "vfile"
import { read } from "to-vfile"
import { matter } from "vfile-matter"
import type { ComponentProps } from "react"
import { remarkImageSize } from "./remark-image-size"
import { LinkIcon } from "@/components/link-icon"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
// the mdast package is not actually installed, but @types/mdast is and this is how we get the types
import type { Root, Blockquote, ListItem, Paragraph } from "mdast"
import { dateObjToYYYYMMDD } from "@/lib/utils"
import "@/tmp/reload-trigger"

const contentDirectory = path.join(process.cwd(), "content")

let cachedContentFilenames: string[] | null = null

function getContentFilenames(): string[] {
  if (!cachedContentFilenames) {
    cachedContentFilenames = fs.readdirSync(contentDirectory)
  }

  return cachedContentFilenames
}

function findFilenameBySlug(slug: string): string | undefined {
  return getContentFilenames().find((filename) =>
    filename.endsWith(`.${slug}.md`),
  )
}

function isDraftFilename(filename: string): boolean {
  return filename.startsWith("DRAFT.")
}

function parsePostFilename(filename: string): { date: string; slug: string } {
  const isDraft = isDraftFilename(filename)
  const parts = filename.split(".")

  if (parts.length < 3) {
    throw new Error(
      `[markdown] Invalid content filename "${filename}". Expected format "YYYY-MM-DD.post-slug.md", or "DRAFT.YYYY-MM-DD.post-slug.md".`,
    )
  }

  const date = isDraft ? dateObjToYYYYMMDD(new Date()) : parts[0]
  const slug = parts[1]

  return { date, slug }
}

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href, children, ...rest } = props

  if (href && (href.startsWith("/") || href.startsWith("#"))) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

// Remark, annoyingly, treats regular list and lists inside blockquotes differently.
// Regular list items render as "tight": <li>some text</li>
// Blockquote list items render as "loose": <li><p>some text</p></li>
// This plugin standardizes blockquote lists to be tight as well.
// https://github.com/remarkjs/remark/issues/104
export const tightenBlockquoteLists: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, "blockquote", (blockquoteNode) => {
      const blockquote = blockquoteNode as Blockquote

      visit(blockquote, "listItem", (listItemNode) => {
        const item = listItemNode as ListItem
        if (
          item.children.length === 1 &&
          item.children[0].type === "paragraph"
        ) {
          const paragraph = item.children[0] as Paragraph
          item.children = paragraph.children as typeof item.children
        }
      })
    })
  }
}

// Expects width/height to be present on the img element, which is ensured
// by running remark-image-size before remarkRehype in the markdown pipeline.
const MarkdownImage = (props: ComponentProps<"img">) => {
  const { src, alt = "", width, height, ...rest } = props

  if (typeof src !== "string" || src.length === 0) {
    throw new Error("[markdown] Missing image src while rendering markdown.")
  }

  const parsedWidth =
    typeof width === "number" ? width : Number.parseInt(String(width ?? ""), 10)
  const parsedHeight =
    typeof height === "number"
      ? height
      : Number.parseInt(String(height ?? ""), 10)

  if (!Number.isFinite(parsedWidth) || !Number.isFinite(parsedHeight)) {
    throw new Error(
      `[markdown] Missing image dimensions for "${src}". Did remark-image-size run?`,
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={parsedWidth}
      height={parsedHeight}
      {...rest}
    />
  )
}

const production = { Fragment, jsx, jsxs }

type PostData = {
  slug: string
  date: string
  title: string
  description: string
  content: React.ReactNode
  isDraft: boolean
}

type PostMeta = Omit<PostData, "content">

type Frontmatter = {
  title: string
  description: string
  // Allow additional frontmatter properties without constraining them here.
  [key: string]: unknown
}

const markdownComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h2 {...props} />
    // If adding additional classes, merge them in like this:
    // <h2 {...props} className={cn(props.className, "foo bar")} />
  ),
  h2: (props: ComponentProps<"h2">) => <h2 {...props} />,
  h3: (props: ComponentProps<"h3">) => <h2 {...props} />,
  h4: (props: ComponentProps<"h4">) => <h2 {...props} />,
  h5: (props: ComponentProps<"h5">) => <h2 {...props} />,
  h6: (props: ComponentProps<"h6">) => <h2 {...props} />,
  a: CustomLink,
  img: MarkdownImage,
  span: (props: ComponentProps<"span">) => {
    if ("data-link-icon" in props) {
      return (
        <span {...props}>
          <LinkIcon className="size-3.5" />
        </span>
      )
    }
    return <span {...props} />
  },
}

function createMarkdownProcessor() {
  return (
    unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(() => (_: unknown, file: VFile) => {
        matter(file)
      })
      .use(remarkImageSize)
      .use(remarkGfm)
      .use(tightenBlockquoteLists)
      // Intentionally allow raw HTML in markdown and pass it through.
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeShiki, {
        themes: {
          light: "one-light",
          dark: "one-dark-pro",
          // light: "github-light",
          // dark: "github-dark",
        },
      })
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        behavior: "append",
        content: [
          {
            type: "element",
            tagName: "span",
            properties: { "data-link-icon": "" },
            children: [],
          },
        ],
        properties: {
          class: "heading-anchor",
          ariaHidden: true,
          tabIndex: -1,
        },
        headingProperties: { class: "with-heading-anchor" },
      })
      .use(rehypeReact, {
        ...production,
        components: markdownComponents,
      })
  )
}

export async function getPostData(slug: string): Promise<PostData> {
  const filename = findFilenameBySlug(slug)

  if (!filename) {
    throw new Error(`Post not found for slug: ${slug}`)
  }

  const isDraft = isDraftFilename(filename)
  const { date } = parsePostFilename(filename)

  const fullPath = path.join(contentDirectory, filename)

  const processor = createMarkdownProcessor()
  const file = await processor.process(await read(fullPath))

  const frontmatter = file.data.matter as Frontmatter | undefined

  if (!frontmatter || !frontmatter.title || !frontmatter.description) {
    throw new Error(
      `[markdown] Missing required "title" or "description" frontmatter in "${filename}".`,
    )
  }

  const { title, description } = frontmatter

  return {
    slug,
    date,
    title,
    description,
    content: file.result as React.ReactNode,
    isDraft,
  }
}

export async function getAllPosts(
  includeDrafts: boolean = false,
): Promise<PostMeta[]> {
  const allPostsData = await Promise.all(
    getContentFilenames()
      .filter((filename) => {
        // Filter out drafts unless includeDrafts is true
        if (isDraftFilename(filename)) {
          return includeDrafts
        }
        return true
      })
      .map(async (filename) => {
        const isDraft = isDraftFilename(filename)
        const { date, slug } = parsePostFilename(filename)

        const fullPath = path.join(contentDirectory, filename)

        const file = await read(fullPath)
        matter(file)
        const frontmatter = file.data.matter as Frontmatter | undefined

        if (!frontmatter || !frontmatter.title || !frontmatter.description) {
          throw new Error(
            `[markdown] Missing required "title" or "description" frontmatter in "${filename}".`,
          )
        }

        // Enforcing maximum length for title and description mainly because of Open Graph and Twitter card limitations.
        if (frontmatter.title.length > 70) {
          throw new Error(
            `[markdown] Title is too long in "${filename}". Expected less than 70 characters.`,
          )
        }
        if (frontmatter.description.length > 200) {
          throw new Error(
            `[markdown] Description is too long in "${filename}". Expected less than 200 characters.`,
          )
        }

        const { title, description } = frontmatter

        return {
          slug,
          title,
          description,
          date,
          isDraft,
        }
      }),
  )

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })
}
