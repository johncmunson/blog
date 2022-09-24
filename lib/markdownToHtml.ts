import { VFile } from 'vfile'
import { Post } from '../types'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// @ts-expect-error: no types available
import addClasses from 'rehype-add-classes'
import rehypeStringify from 'rehype-stringify'
import { BODY_TEXT, UL, OL, H2, H3 } from './constants'

export default async function markdownToHtml(post: Post) {
  const result = await unified()
    .use(remarkParse)
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
  return result.toString()
}
