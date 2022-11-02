import Link from 'next/link'
import { BLOG_NAME } from '../../lib/constants'

const BlogTitleText = (props: { [prop: string]: unknown }) => (
  <p
    {...props}
    className={`text-2xl font-semibold tracking-wide ${props.className}`}
  >
    <Link href="/">{BLOG_NAME}</Link>
  </p>
)

// All this work just to animate the fading in and out of the text underline. It doesn't seem that CSS can natively do this. Sigh.
export const BlogTitle = () => (
  <div data-cy="blog-title" className="relative">
    <BlogTitleText />
    <BlogTitleText
      aria-hidden
      className="absolute top-0 left-0 underline decoration-wavy underline-offset-8 opacity-0 hover:opacity-100 transition-[opacity] duration-500 ease-in-out"
    />
  </div>
)
