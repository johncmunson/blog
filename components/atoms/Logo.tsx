import Link from 'next/link'
import { BLOG_NAME } from '../../utils/constants'

export const LogoText = (props: { [prop: string]: any }) => (
  <h1
    {...props}
    className={`text-2xl font-semibold tracking-wide ${props.className}`}
  >
    <Link href="/">
      <a>{BLOG_NAME}</a>
    </Link>
  </h1>
)

// All this work just to animate the fading in and out of the text underline. It doesn't seem that CSS can natively do this. Sigh.
export const Logo = () => (
  <div className="relative">
    <LogoText />
    <LogoText
      aria-hidden
      className="absolute top-0 left-0 underline decoration-wavy underline-offset-8 opacity-0 hover:opacity-100 transition-[opacity] duration-500 ease-in-out"
    />
  </div>
)
