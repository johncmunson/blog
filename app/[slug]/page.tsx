import type { Metadata } from "next"
import Link from "next/link"
import { getPostData, getAllPosts } from "../../lib/markdown"
import { formatDate, toNoonISO8601 } from "@/lib/utils"
import { DateText } from "@/components/date-text"
import { PencilLineIcon } from "@/components/pencil-line-icon"
import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from "@/lib/generate-og-image"
import { TableOfContents } from "@/components/table-of-contents"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostData(slug)

  const images = [
    {
      url: `/${slug}/opengraph-image`,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: post.title,
    },
  ]

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: slug,
      siteName: process.env.SITE_TITLE!,
      images,
      locale: "en_US",
      type: "article",
      publishedTime: toNoonISO8601(post.date),
      authors: [process.env.SITE_AUTHOR!],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
      siteId: process.env.SITE_AUTHOR_TWITTER_ID!,
    },
  }
}

export async function generateStaticParams() {
  const includeDrafts = process.env.NODE_ENV === "development"
  const posts = await getAllPosts(includeDrafts)
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const postData = await getPostData(slug)
  const hasTableOfContents = postData.headings.length > 0

  return (
    // Keep paragraphs the same, but reduce the top/bottom margins slightly.
    // Then, change h2 styles to exactly match paragraphs, except...
    //   - larger top margin
    //   - bold font weight
    <div className="prose-p:my-4 prose-h2:text-base prose-h2:leading-[1.75] prose-h2:mt-8 prose-h2:mb-4 prose-h2:font-bold">
      <Link href="/" className="text-sm">
        {"<<"} back
      </Link>
      <article>
        <div className="not-prose flex items-center gap-2 mt-9 mb-0">
          <h1 className="font-bold text-xl">{postData.title}</h1>
          {postData.isDraft && (
            <span title="This is a draft post">
              <PencilLineIcon className="size-5 text-red-500 shrink-0" />
            </span>
          )}
        </div>
        <DateText>{formatDate(postData.date)}</DateText>
        <div
          className={
            hasTableOfContents
              ? "mt-8 lg:grid lg:grid-cols-[var(--container-readable)_auto] lg:gap-24 lg:items-start"
              : "mt-8"
          }
        >
          <div className="min-w-0 flow-root [&>*:first-child]:mt-0">
            {postData.content}
          </div>
          {hasTableOfContents && (
            <TableOfContents headings={postData.headings} />
          )}
        </div>
      </article>
    </div>
  )
}
