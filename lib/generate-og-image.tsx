import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

type OGImageProps = {
  title: string
  description: string
  size: { width: number; height: number }
}

/**
 * Generates an OG image with logo, title, and optional description.
 * Uses theme-neutral design suitable for social media sharing.
 * Uses Geist font to match the site's typography.
 */
export async function generateOGImage({
  title,
  description,
  size,
}: OGImageProps) {
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
  <svg width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Base noise pattern -->
      <pattern id="grain" width="5" height="5" patternUnits="userSpaceOnUse">
        <circle cx="0.5" cy="0.5" r="0.6" fill="rgba(64, 64, 64, 0.12)"/>
        <circle cx="2.5" cy="2.5" r="0.6" fill="rgba(64, 64, 64, 0.12)"/>
        <circle cx="0.5" cy="2.5" r="0.5" fill="rgba(64, 64, 64, 0.08)"/>
        <circle cx="2.5" cy="0.5" r="0.5" fill="rgba(64, 64, 64, 0.08)"/>
        <circle cx="1.5" cy="1.5" r="0.4" fill="rgba(64, 64, 64, 0.04)"/>
      </pattern>
      
      <!-- Turbulence filter - Remove this if you want a perfectly uniform noise pattern -->
      <filter id="noise-filter">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.4 0.6" 
          numOctaves="4" 
          result="noise"
        />
        <feDisplacementMap 
          in="SourceGraphic" 
          in2="noise" 
          scale="12"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
    <rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="url(#grain)" filter="url(#noise-filter)"/>
  </svg>
`
  const noiseSrc = `data:image/svg+xml;base64,${Buffer.from(noiseSVG).toString("base64")}`

  return new ImageResponse(
    <div
      tw="flex flex-col w-full h-full bg-neutral-50 px-[150px] pl-20 justify-center"
      style={{
        fontFamily: "Geist",
      }}
    >
      {/* Subtle noise/grain overlay */}
      <div
        tw="absolute top-0 left-0 opacity-100 flex"
        style={{
          width: `${OG_IMAGE_WIDTH}px`,
          height: `${OG_IMAGE_HEIGHT}px`,
        }}
      >
        <img src={noiseSrc} />
      </div>

      {/* Subtle decorative accent line */}
      <div
        tw="absolute top-0 h-[25px]"
        style={{
          left: "80px",
          right: "80px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
        }}
      />

      {/* Logo and Title on same line */}
      <div tw="flex flex-row items-start mb-6">
        <img
          src={logoSrc}
          width="60"
          height="60"
          tw="mr-10 shrink-0 mt-[5px]"
        />
        <h1
          tw="text-[64px] font-semibold leading-[1.08] text-black m-0 whitespace-pre-wrap flex-1"
          style={{ fontFamily: "Geist" }}
        >
          {title}
        </h1>
      </div>

      {/* Subtle divider line */}
      <div tw="w-[850px] h-[1.5px] bg-neutral-400 ml-[100px] mb-6" />

      {/* Description aligned with title text */}
      <p
        tw="text-[38px] font-normal leading-[1.4] text-neutral-500 m-0 ml-[100px] whitespace-pre-wrap"
        style={{ fontFamily: "Geist" }}
      >
        {description}
      </p>
    </div>,
    {
      ...size,
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
