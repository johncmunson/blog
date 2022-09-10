// @ts-expect-error: no types available
import addClasses from 'rehype-add-classes'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { VFile } from 'vfile'
import { Post } from '../types'

export default async function markdownToHtml(post: Post) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(addClasses, {
      // Prefer top and left margins, b/c Adam says so -> https://twitter.com/adamwathan/status/1399473286224957442
      // Also, we're not including h1 because the title of blog posts is already an h1 and we don't want multiple
      // h1 tags on the page. We're not including h4 through h6 because there's really no reason to ever use those
      // tags in a blog post. We just need a heading (h2) and a subheading (h3).
      h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-7 sm:mt-8 md:mt-9 lg:mt-10',
      h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl mt-6 sm:mt-7 md:mt-8 lg:mt-9',
      p: 'text-base sm:text-lg md:text-xl lg:text-2xl mt-1 sm:mt-2 md:mt-3 lg:mt-4',
      ol: 'ml-5 mt-0 sm:mt-1 md:mt-2 lg:mt-3 list-decimal',
      ul: 'ml-5 mt-0 sm:mt-1 md:mt-2 lg:mt-3 list-disc',
    })
    .use(rehypeStringify)
    .process(
      new VFile({
        value: post.markdown,
      })
    )
  return result.toString()
}
