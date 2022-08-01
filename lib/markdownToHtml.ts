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
      h1: 'text-5xl mb-5',
      h2: 'text-4xl mb-5',
      h3: 'text-3xl mb-5',
      h4: 'text-2xl mb-5',
      h5: 'text-xl mb-5',
      h6: 'text-lg mb-5',
      p: 'mb-5',
      ol: '-mt-4 mb-5 ml-5 list-decimal',
      ul: '-mt-4 mb-5 ml-5 list-disc',
    })
    .use(rehypeStringify)
    .process(
      new VFile({
        value: post.markdown,
      })
    )
  return result.toString()
}
