import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

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
 * Uses the default Noto Sans font that comes with ImageResponse.
 */
export async function generateOGImage({ title, description }: OGImageProps) {
  // Load logo SVG and convert to base64 data URL
  const logoData = await readFile(
    join(process.cwd(), "public/logo-light.svg"),
    "utf-8",
  )
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoData).toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#f6f6f6",
          padding: "60px 80px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <img src={logoSrc} width="60" height="60" alt="" />
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.2,
              color: "#000000",
              margin: 0,
              marginBottom: "24px",
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </h1>

          {/* Description */}
            <p
              style={{
                fontSize: 32,
                fontWeight: 400,
                lineHeight: 1.4,
                color: "#666666",
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
            {description}
          </p>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
    },
  )
}

