import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[70ch] m-3 sm:m-4 prose dark:prose-invert prose-hr:my-10`}
      >
        <div className="font-sans">{children}</div>
        <hr />
        <footer className="text-xs flex items-center">
          <a href="https://github.com/johncmunson/blog">
            <Image
              src="/logo-light.svg"
              alt="Logo"
              width={42}
              height={42}
              className="m-0! dark:hidden"
            />
            <Image
              src="/logo-dark.svg"
              alt="Logo (dark mode)"
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
      </body>
    </html>
  );
}
