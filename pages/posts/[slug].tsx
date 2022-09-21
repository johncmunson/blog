import { Post } from '../../types'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPostBySlug, getPostSlugs } from '../../lib/md'
import markdownToHtml from '../../lib/markdownToHtml'

type PostPathParams = ParsedUrlQuery & {
  slug: string
}

type PostProps = Post & { html: string }

const Post = ({ html, frontmatter, date }: PostProps) => {
  return (
    <>
      <div className="mt-16">
        <h1 className="font-semibold tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {frontmatter.title}
        </h1>
        <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 font-mono mt-2 sm:mt-3 md:mt-5 lg:mt-6 text-sm md:text-base">
          <p>By: {frontmatter.author}</p>
          <p>&bull;</p>
          <p>Published: {date}</p>
        </div>
        <p className="sm:mt-1 text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {frontmatter.description}
        </p>
      </div>
      <main className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        <article
          // The tailwind typography plugin is a good way to style Markdown HTML,
          // but we're using remark, rehype, and unified instead.
          // https://tailwindcss.com/docs/typography-plugin
          // className="prose prose-lg md:prose-xl lg:prose-2xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const { slug } = context.params as PostPathParams
  const post = await getPostBySlug(slug)
  const html = await markdownToHtml(post)

  return {
    props: { ...post, html },
  }
}

export const getStaticPaths: GetStaticPaths<PostPathParams> = async () => {
  const slugs = getPostSlugs()

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    // If user tries to access an invalid post, i.e. localhost:3000/posts/not-valid,
    // then display a 404 page. True is used for very large sites that have a ton
    // of pages.
    fallback: false,
  }
}

export default Post
