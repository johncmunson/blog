import Image from 'next/future/image'

type BlogPostImageProps = {
  src: string
  alt: string
  className?: string
}
export const BlogPostImage = ({ src, alt, className }: BlogPostImageProps) => (
  <Image
    src={src}
    alt={alt}
    // We use the fill property instead of the width property b/c width requires
    // the value to be in pixels. That just won't work when we're trying to make
    // responsive layouts. It's a pretty big shortcoming of next/future/image.
    // So, we use the hack below.
    fill
    // the Image component is *really* quirky to work with. By default, it is given
    // absolute positioning when using the fill property. Weird. So we use !static
    // as a hack to make it behave normally.
    // https://nextjs.org/docs/api-reference/next/future/image#fill
    className={`!static rounded-md ${className}`}
  />
)
