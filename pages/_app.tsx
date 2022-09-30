import '../styles/globals.css'
import { AppProps } from 'next/app'
import { MainLayout } from '../components/templates/MainLayout'
import { DarkModeProvider } from '../context/darkMode'

// Custom App: https://nextjs.org/docs/advanced-features/custom-app
// Layouts: https://nextjs.org/docs/basic-features/layouts
// Layouts RFC: https://nextjs.org/blog/next-12-3#new-router-and-layouts-update

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </DarkModeProvider>
  )
}

export default MyApp
