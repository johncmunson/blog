import Link from 'next/link'
import { Post } from '../../types'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPostBySlug, getPostSlugs } from '../../lib/md'
import markdownToHtml from '../../lib/markdownToHtml'

type PostPathParams = ParsedUrlQuery & {
  slug: string
}

type PostProps = Post & { html: string }

const Post = ({ html, frontmatter }: PostProps) => {
  return (
    <>
      <header className="mb-4">
        <h1>Title: {frontmatter.title}</h1>
        <p>Description: {frontmatter.description}</p>
        <p className="text-xs">
          This is the header. It&apos;s part of the layout that is applied to
          every post.{' '}
          <Link href="/">
            <a className="underline text-blue-500">Back to home</a>
          </Link>
        </p>
        <hr />
      </header>
      <main>
        <article
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
  const html = await markdownToHtml(post.markdown)

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
