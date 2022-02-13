import { useMemo } from 'react'
import { Post } from '../../types'
import { ParsedUrlQuery } from 'querystring'
import { getMDXComponent } from 'mdx-bundler/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllSlugs, getSinglePost } from '../../utils/mdx'

type PostPathParams = ParsedUrlQuery & {
  slug: string
}

type PostProps = Post

const Post = ({ code, frontmatter }: PostProps) => {
  // It's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <header className="mb-4">
        <h1>Title: {frontmatter.title}</h1>
        <p>Description: {frontmatter.description}</p>
        <p className="text-xs">
          (This is the header. It&apos;s part of the layout that is applied to
          every post.)
        </p>
        <hr />
      </header>
      <main>
        <Component />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const { slug } = context.params as PostPathParams
  const post = await getSinglePost(slug)

  return {
    props: post,
  }
}

export const getStaticPaths: GetStaticPaths<PostPathParams> = async () => {
  const slugs = await getAllSlugs()

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
