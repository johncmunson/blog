import Link from "next/link"
import { getPostData, getAllPosts } from "../../lib/markdown"
import { formatDate } from "@/lib/utils"
import { DateText } from "@/components/date-text"
import { PencilLineIcon } from "@/components/pencil-line-icon"

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

  return (
    // Keep paragraphs the same, but reduce the top/bottom margins slightly.
    // Then, change h2 styles to exactly match paragraphs, except...
    //   - larger top margin
    //   - bold font weight
    <main className="prose-p:my-4 prose-h2:text-base prose-h2:leading-[1.75] prose-h2:mt-8 prose-h2:mb-4 prose-h2:font-bold">
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
        <div className="mt-8">{postData.content}</div>
      </article>
    </main>
  )
}
