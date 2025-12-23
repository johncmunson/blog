import { generateOGImage } from "@/lib/generate-og-image"

export const alt = "Blog Homepage"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return generateOGImage({
    title: process.env.SITE_TITLE!,
    description: process.env.SITE_DESCRIPTION!,
    size,
  })
}
