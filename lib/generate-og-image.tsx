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
 * Uses Geist font to match the site's typography.
 */
export async function generateOGImage({ title, description }: OGImageProps) {
  // Load Geist fonts for different weights. Using the non-variable font files instead of the variable font files
  // because variable fonts (like Geist[wght].ttf) aren't supported by ImageResponse/Satori.
  const geistRegular = await readFile(
    join(process.cwd(), "public/fonts/Geist-Regular.ttf"),
  )
  const geistSemiBold = await readFile(
    join(process.cwd(), "public/fonts/Geist-SemiBold.ttf"),
  )

  // Load logo SVG and convert to base64 data URL
  const logoData = await readFile(
    join(process.cwd(), "public/logo-light.svg"),
    "utf-8",
  )
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoData).toString("base64")}`

  // Create a subtle noise/grain pattern using SVG
  // Using a dot pattern approach that works reliably with Satori
  const noiseSVG = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grain" width="3" height="3" patternUnits="userSpaceOnUse">
        <circle cx="0.5" cy="0.5" r="0.6" fill="rgba(0,0,0,0.12)"/>
        <circle cx="2.5" cy="2.5" r="0.6" fill="rgba(0,0,0,0.12)"/>
        <circle cx="0.5" cy="2.5" r="0.5" fill="rgba(0,0,0,0.1)"/>
        <circle cx="2.5" cy="0.5" r="0.5" fill="rgba(0,0,0,0.1)"/>
        <circle cx="1.5" cy="1.5" r="0.4" fill="rgba(0,0,0,0.08)"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="url(#grain)"/>
  </svg>
`
  const noiseSrc = `data:image/svg+xml;base64,${Buffer.from(noiseSVG).toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f6f6f6 0%, #f0f0f0 100%)",
          padding: "0px 150px 0px 80px",
          fontFamily: "Geist",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Subtle noise/grain overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            opacity: 1,
            pointerEvents: "none",
            display: "flex",
          }}
        >
          <img
            src={noiseSrc}
            width="1200"
            height="630"
            alt=""
            style={{
              width: "1200px",
              height: "630px",
            }}
          />
        </div>

        {/* Subtle decorative accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            right: 80,
            height: "25x",
            background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
          }}
        />

        {/* Logo and Title on same line */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: "24px",
            position: "relative",
          }}
        >
          <img
            src={logoSrc}
            width="60"
            height="60"
            alt=""
            style={{
              marginRight: "40px",
              flexShrink: 0,
              marginTop: "5px",
            }}
          />
          <h1
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.08,
              color: "#000000",
              margin: 0,
              whiteSpace: "pre-wrap",
              fontFamily: "Geist",
              flex: 1,
              textShadow: "0 1px 2px rgba(0,0,0,0.02)",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Subtle divider line */}
        <div
          style={{
            width: "850px",
            height: "1.5px",
            backgroundColor: "rgba(0,0,0,0.4)",
            marginLeft: "100px",
            marginBottom: "24px",
            position: "relative",
          }}
        />

        {/* Description aligned with title text */}
        <p
          style={{
            fontSize: 32,
            fontWeight: 400,
            lineHeight: 1.4,
            color: "#666666",
            margin: 0,
            marginLeft: "100px",
            whiteSpace: "pre-wrap",
            fontFamily: "Geist",
            position: "relative",
          }}
        >
          {description}
        </p>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        {
          name: "Geist",
          data: geistRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Geist",
          data: geistSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  )
}
