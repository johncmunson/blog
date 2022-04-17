import '../styles/globals.css'
import { AppProps } from 'next/app'
import { MainLayout } from '../components/templates/MainLayout'

// Custom App: https://nextjs.org/docs/advanced-features/custom-app
// Layouts: https://nextjs.org/docs/basic-features/layouts

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
