import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="mt-9 mx-4 sm:mt-16 sm:mx-8 md:mt-32 md:mx-20 bg-neutral-100 dark:bg-neutral-900 dark:text-white">
        <div className="max-w-5xl mx-auto">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
