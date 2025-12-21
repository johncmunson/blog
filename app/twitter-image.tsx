import { generateTwitterImage, TWITTER_IMAGE_SIZE } from "@/lib/generate-og-image"

export const alt = "Blog homepage"
export const size = TWITTER_IMAGE_SIZE
export const contentType = "image/png"

export default async function Image() {
  return generateTwitterImage()
}
