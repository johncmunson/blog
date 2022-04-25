import Head from 'next/head'
import { Post } from '../../types'
import { ParsedUrlQuery } from 'querystring'
import { BlogFeed } from '../organisms/BlogFeed'

import { GetStaticPaths, GetStaticProps } from 'next'
import { chunk } from 'lodash'
import { PAGE_SIZE } from '../../utils/constants'

export type HomePathParams = ParsedUrlQuery & {
  pageNumber: string
}

export type HomeProps = {
  posts: Post[]
}

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-xl md:text-2xl lg:text-3xl mt-16">
        <span className="font-medium">Howdy there.</span> Find out what
        we&apos;re thinking about with a look behind the curtain at the things
        that make us tick.
      </h1>

      <BlogFeed posts={posts} />
    </>
  )
}

export const _getStaticPropsFactory: (
  getPosts: () => Promise<Post[]>
) => GetStaticProps<HomeProps> = (getPosts) => async (context) => {
  const posts = await getPosts()

  if (!context.params) {
    return {
      props: {
        posts,
      },
    }
  }

  const pageNumber = Number((context.params as HomePathParams).pageNumber)

  return {
    props: {
      posts: chunk(posts, PAGE_SIZE)[pageNumber - 2],
    },
  }
}

export const _getStaticPathsFactory: (
  getPosts: () => Promise<Post[]>
) => GetStaticPaths<HomePathParams> = (getPosts) => async (context) => {
  const posts = await getPosts()
  return {
    paths: chunk(posts, PAGE_SIZE).map((_, i) => ({
      params: { pageNumber: (i + 2).toString() },
    })),
    // If user tries to access an invalid post, i.e. localhost:3000/posts/not-valid,
    // then display a 404 page. True is used for very large sites that have a ton
    // of pages.
    fallback: false,
  }
}

export default Home
