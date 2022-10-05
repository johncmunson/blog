import { VFile } from 'vfile'
import { Post } from '../types'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// @ts-expect-error: no types available
import addClasses from 'rehype-add-classes'
import rehypeStringify from 'rehype-stringify'
import { BODY_TEXT, UL, OL, H2, H3 } from './constants'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import { createElement, Fragment } from 'react'
import remarkUnwrapImages from 'remark-unwrap-images'
import { Element } from 'rehype-react/lib'
import { renderToString } from 'react-dom/server'
import { BlogPostImage } from '../components/atoms/BlogPostImage'

type ImgProps = {
  node: Element & { properties: { src: string; alt: string } }
  [k: string]: any
}

export default async function markdownToHtml(post: Post) {
  const htmlHast = await unified()
    .use(remarkParse)
    .use(remarkUnwrapImages)
    .use(remarkRehype)
    .use(addClasses, {
      // Prefer top and left margins, b/c Adam says so -> https://twitter.com/adamwathan/status/1399473286224957442
      // Also, we're not including h1 because the title of blog posts is already an h1 and we don't want multiple
      // h1 tags on the page. We're not including h4 through h6 because there's really no reason to ever use those
      // tags in a blog post. We just need a heading (h2) and a subheading (h3).
      h2: `${H2}`,
      h3: `${H3}`,
      p: `${BODY_TEXT}`,
      ul: `${UL}`,
      ol: `${OL}`,
    })
    .use(rehypeStringify)
    .process(
      new VFile({
        value: post.markdown,
      })
    )

  const html = htmlHast.toString()

  const transformedHtmlHast = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement,
      Fragment,
      passNode: true,
      components: {
        img: (props: any) => {
          const castedProps = props as ImgProps
          const { node } = castedProps
          return (
            <div
              className={`w-11/12 sm:w-5/6 md:w-4/5 lg:w-3/4 mx-auto mt-3 sm:mt-4 md:mt-5 lg:mt-6`}
            >
              <BlogPostImage
                src={node.properties.src}
                alt={node.properties.alt}
              />
            </div>
          )
        },
      },
    })
    .process(new VFile({ value: html }))

  // Might consider trying out renderToStaticMarkup instead. Could save a few bytes being sent over the wire.
  // https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
  const transformedHtmlString = renderToString(transformedHtmlHast.result)

  return transformedHtmlString
}
