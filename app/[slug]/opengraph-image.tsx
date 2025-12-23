import {
  generateOGImage,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from "@/lib/generate-og-image"
import { getPostData } from "@/lib/markdown"

export const alt = "Blog Post"
export const size = {
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
}
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { title, description, isDraft } = await getPostData(slug)

  // Skip generating OG images for drafts, matching RSS/sitemap behavior
  if (isDraft) {
    return new Response(null, { status: 404 })
  }

  return generateOGImage({
    title,
    description,
    size,
  })
}
