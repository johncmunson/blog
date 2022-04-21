import { ReactNode } from 'react'
import { Footer } from '../molecules/Footer'
import { Header } from '../molecules/Header'

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)
