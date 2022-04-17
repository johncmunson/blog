import { Header } from '../molecules/Header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <footer>I&apos;m a footer</footer>
  </>
)
