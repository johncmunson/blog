import { ImageResponse } from "next/og"

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
}

type OGImageProps = {
  title: string
  description: string
}

/**
 * Generates an OG image with logo, title, and optional description.
 * Uses theme-neutral design suitable for social media sharing.
 * Uses Geist font to match the site's typography.
 */
export async function generateOGImage({ title, description }: OGImageProps) {

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#fafafa",
        padding: "0px 150px 0px 80px",
        fontFamily: "Geist",
        justifyContent: "center",
        position: "relative",
      }}
    >
      hello
    </div>,
    {
      ...OG_IMAGE_SIZE,
    },
  )
}
