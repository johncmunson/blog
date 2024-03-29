import Head from 'next/head'
import { Post } from '../types'
import { GetStaticProps } from 'next'
import { getAllPosts } from '../lib/md'
import { BlogFeed } from '../components/organisms/BlogFeed'
import { NextPrev } from '../components/molecules/NextPrev'
import { useQueryStringPagination } from '../hooks/useQueryStringPagination'

export type HomeProps = {
  posts: Post[]
}

const Home = ({ posts }: HomeProps) => {
  const {
    currentItems: postsToDisplay,
    nextHref,
    prevHref,
  } = useQueryStringPagination(posts)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={`text-xl md:text-2xl lg:text-3xl`}>
        <span className="font-medium">Howdy there.</span> Find out what
        we&apos;re thinking about with a look behind the curtain at the things
        that make us tick.
      </h1>

      <BlogFeed posts={postsToDisplay} className="mt-20" />
      <NextPrev prevHref={prevHref} nextHref={nextHref} />
    </>
  )
}

/**
 * Pagination for the blog feed used to be handled with a route structure like...
 *   baseUrl
 *   baseUrl/2
 *   baseUrl/3
 *
 * This required two separate NextJS pages to accomplish, index.tsx and [paginate].tsx.
 * It was a little awkward to implement, but it had the advantage only shipping the required
 * blog posts necessary to render the current page. See commit 617ac4c to see what this
 * was like.
 *
 * The new setup uses the following route structure...
 *   baseUrl
 *   baseUrl/?page=2
 *   baseUrl/?page=3
 */

// Yeah, yeah... no unused vars, thanks eslint. But I wanted to keep this here
// to remind myself that both getStaticProps and getStaticPaths come with a
// context parameter that provides useful metadata.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const posts = await getAllPosts()

  return {
    props: {
      posts,
    },
  }
}

export default Home
