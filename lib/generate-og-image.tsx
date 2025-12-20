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

  const noiseSVG = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03"/>
  </svg>
`
  const noiseSrc = `data:image/svg+xml;base64,${Buffer.from(noiseSVG).toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #f6f6f6 0%, #f0f0f0 100%)",
        // Change to where the left has 80px padding and the right has 100px padding and the top and bottom have 0px padding
        padding: "0px 150px 0px 80px",
        fontFamily: "Geist",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Subtle decorative accent line */}
      {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            right: 80,
            height: "30x",
            background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
          }}
        /> */}

      {/* Logo and Title on same line */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: "24px",
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
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.1)",
          marginLeft: "100px",
          marginBottom: "24px",
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
        }}
      >
        {description}
      </p>
    </div>,
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
