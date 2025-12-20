import { generateOGImage, OG_IMAGE_SIZE } from "@/lib/generate-og-image"

export const alt = "Blog homepage"
export const size = OG_IMAGE_SIZE
export const contentType = "image/png"

export default async function Image() {
  return generateOGImage({
    title: process.env.SITE_TITLE!,
    description: process.env.SITE_DESCRIPTION!,
  })
}

