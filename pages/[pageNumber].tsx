import { chunk } from 'lodash'
import { PAGE_SIZE } from '../utils/constants'
import { getAllPosts, getPosts } from '../utils/mdx'
import { GetStaticPaths, GetStaticProps } from 'next'
import Home, { HomePathParams, HomeProps } from '../components/templates/Home'

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const pageNumber = Number((context.params as HomePathParams).pageNumber)
  const posts = chunk(await getAllPosts(), PAGE_SIZE)[pageNumber - 1]

  return {
    props: {
      posts,
    },
  }
}

export const getStaticPaths: GetStaticPaths<HomePathParams> = async (
  context
) => {
  const posts = await getPosts({ offset: PAGE_SIZE })
  const pageNumbers = chunk(posts, PAGE_SIZE).map((_, i) => (i + 2).toString())

  return {
    paths: pageNumbers.map((pageNumber) => ({
      params: { pageNumber },
    })),
    // If user tries to access an invalid post, i.e. localhost:3000/posts/not-valid,
    // then display a 404 page. True is used for very large sites that have a ton
    // of pages.
    fallback: false,
  }
}

export default Home
