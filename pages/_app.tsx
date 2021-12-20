import "../styles/globals.css"
import type { AppProps } from "next/app"

// https://nextjs.org/docs/advanced-features/custom-app

const x = 5
const y = 6

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
