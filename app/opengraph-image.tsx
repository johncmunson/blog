import {
  generateOGImage,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from "@/lib/generate-og-image"

export const alt = "Blog Homepage"
export const size = {
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
}
export const contentType = "image/png"

export default async function Image() {
  return generateOGImage({
    title: process.env.SITE_TITLE!,
    description: process.env.SITE_DESCRIPTION!,
    size,
  })
}
