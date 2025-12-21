import { generateTwitterImage, TWITTER_IMAGE_SIZE } from "@/lib/generate-og-image"
import { getPostData } from "@/lib/markdown"

export const alt = "Blog post"
export const size = TWITTER_IMAGE_SIZE
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { isDraft } = await getPostData(slug)

  // Skip generating Twitter images for drafts, matching RSS/sitemap behavior
  if (isDraft) {
    return new Response(null, { status: 404 })
  }

  return generateTwitterImage()
}
