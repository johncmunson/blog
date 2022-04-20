import { ReactNode } from 'react'
import { Header } from '../molecules/Header'

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <footer className="mt-14 border-2">I&apos;m a footer</footer>
  </>
)
