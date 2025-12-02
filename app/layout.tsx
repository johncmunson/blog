import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  variable: "--font-geist-sans",
  src: "../public/fonts/Geist[wght].ttf",
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  src: "../public/fonts/GeistMono[wght].ttf",
});

export const metadata: Metadata = {
  title: process.env.SITE_TITLE!,
  description: process.env.SITE_DESCRIPTION!,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[70ch] m-2.5 prose dark:prose-invert prose-hr:my-10`}
      >
        <div className="font-sans">{children}</div>
        <hr />
        <footer className="text-xs">
          <p>
            <Link href="https://github.com/johncmunson">Github</Link> •{" "}
            <Link href="https://x.com/curtismunson">Twitter</Link> •{" "}
            <Link href="https://www.linkedin.com/in/john-munson/">
              LinkedIn
            </Link>
          </p>
          <p>Code: MIT License // Content: Licensed under CC BY 4.0</p>
        </footer>
      </body>
    </html>
  );
}
