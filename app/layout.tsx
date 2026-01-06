import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Image from "next/image"
import { Analytics } from "@vercel/analytics/next"
import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from "@/lib/generate-og-image"

const geistSans = localFont({
  variable: "--font-geist-sans",
  src: "../public/fonts/Geist[wght].ttf",
})

const geistMono = localFont({
  variable: "--font-geist-mono",
  src: "../public/fonts/GeistMono[wght].ttf",
})

const images = [
  {
    url: "/opengraph-image",
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt: "Blog Homepage",
  },
]

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL!),
  title: process.env.SITE_TITLE!,
  description: process.env.SITE_DESCRIPTION!,
  openGraph: {
    title: process.env.SITE_TITLE!,
    description: process.env.SITE_DESCRIPTION!,
    url: process.env.SITE_URL!,
    siteName: process.env.SITE_TITLE!,
    images,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.SITE_TITLE!,
    description: process.env.SITE_DESCRIPTION!,
    images,
    siteId: process.env.SITE_AUTHOR_TWITTER_ID!,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[70ch] m-3 sm:m-4 prose dark:prose-invert prose-hr:my-10`}
      >
        <main role="main" className="font-sans prose-code:font-mono prose-pre:font-mono">{children}</main>
        <hr />
        <footer className="font-sans text-xs flex items-center">
          {/* aria-label provides the accessible name for this link. Images use alt="" 
              to mark them as decorative, avoiding aria-hidden conflicts with the focusable <a>. */}
          <a href="https://github.com/johncmunson/blog" aria-label="View source on GitHub">
            <Image
              src="/logo-light.svg"
              alt=""
              width={42}
              height={42}
              className="m-0! dark:hidden"
            />
            <Image
              src="/logo-dark.svg"
              alt=""
              width={42}
              height={42}
              className="m-0! hidden dark:inline"
            />
          </a>
          <div className="ml-2.5">
            <p className="mb-0">
              <a href="https://github.com/johncmunson">Github</a> •{" "}
              <a href="https://x.com/curtismunson">Twitter</a> •{" "}
              <a href="https://www.instagram.com/john_munson_91/">Instagram</a>{" "}
              • <a href="https://www.linkedin.com/in/john-munson/">LinkedIn</a>
            </p>
            <p className="mt-1.5">
              Code: MIT License // Content: Licensed under CC BY 4.0
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
