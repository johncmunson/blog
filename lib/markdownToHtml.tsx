import { VFile } from 'vfile'
import { Post } from '../types'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// @ts-expect-error: no types available
import addClasses from 'rehype-add-classes'
import { BODY_TEXT, UL, OL, H2, H3 } from './constants'
import rehypeReact from 'rehype-react'
import { createElement, Fragment } from 'react'
import remarkUnwrapImages from 'remark-unwrap-images'
import { Element } from 'rehype-react/lib'
import { renderToString } from 'react-dom/server'
import { BlogPostImage } from '../components/atoms/BlogPostImage'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

// FYI, if you ever have the need to write a custom Remark/Rehype plugin, this article is pretty helpful...
// https://jeffchen.dev/posts/Markdown-Image-Captions/

/**
 * MARKDOWN TO HTML PIPELINE
 */
export default async function markdownToHtml(post: Post) {
  const reactTree = await unified()
    // 1. Parse the markdown content into a markdown AST
    .use(remarkParse)
    // 2. Markdown parsers often wrap images in a paragraph, e.g. <p><img /></p>
    //    This is kinda weird and I don't like it. So, unwrap the images.
    .use(remarkUnwrapImages)
    // 3. Allow writing plain HTML inside markdown
    //    https://github.com/remarkjs/remark-rehype#example-supporting-html-in-markdown-properly
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    // 4. Add some styles
    //    Prefer top and left margins, b/c Adam says so -> https://twitter.com/adamwathan/status/1399473286224957442
    //    Also, we're not including h1 because the title of blog posts is already an h1 and we don't want multiple
    //    h1 tags on the page. We're not including h4 through h6 because there's really no reason to ever use those
    //    tags in a blog post. We just need a heading (h2) and a subheading (h3).
    .use(addClasses, {
      h2: `${H2}`,
      h3: `${H3}`,
      p: `${BODY_TEXT}`,
      ul: `${UL}`,
      ol: `${OL}`,
    })
    // 5. Add self-referencing links to the headers
    //    - rehypeSlug simply adds id's to headers
    //    - rehypeAutolinkHeadings takes headings that have id's and wraps their text content with an anchor tag
    //      linking back to itself
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    // 6. Compile HTML AST to a React node. Swap in some React components.
    .use(rehypeReact, {
      createElement,
      Fragment,
      passNode: true,
      components: {
        img: imgToFigureWithCaption,
      },
    })
    // 7. Pass in the raw markdown string to get processed by the above pipeline
    .process(
      new VFile({
        value: post.markdown,
      })
    )

  // 8. Compile the React node to an HTML string that can be used with dangerouslySetInnerHTML
  // Might consider trying out renderToStaticMarkup instead. Could save a few bytes being sent over the wire.
  // https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
  const htmlString = renderToString(reactTree.result)

  return htmlString
}

/**
 * PIPELINE HELPERS
 */
type ImgProps = {
  node: Element & { properties: { src: string; alt: string } }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any
}

// Supports adding captions to markdown images like so...
// ![Business Meeting{caption=Fig. 1: A very important business meeting}](/business-meeting.jpg)
function extractCaptionFromAltText(altText?: string | null) {
  if (!altText) throw new Error('Missing alt text on image')

  const captionRegex = /(\{caption=([^{}]+)\})/

  if (!captionRegex.test(altText)) {
    return { alt: altText }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [captionWithControl, , caption] = captionRegex.exec(altText)!

  return {
    caption,
    alt: altText.replace(captionWithControl, ''),
  }
}

// Convert an <img /> to a <figure><img /><figcaption /><figure>
function imgToFigureWithCaption(props: unknown) {
  const castedProps = props as ImgProps
  const { node } = castedProps

  const { alt, caption } = extractCaptionFromAltText(node.properties.alt)

  return (
    <figure
      className={`w-11/12 sm:w-5/6 md:w-4/5 lg:w-3/4 mx-auto mt-3 sm:mt-4 md:mt-5 lg:mt-6`}
    >
      <BlogPostImage src={node.properties.src} alt={alt} />
      {caption && (
        <figcaption className="italic text-center text-xs sm:text-base md:text-lg lg:text-lx">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
