import { GetStaticProps } from 'next'
import { getPosts } from '../utils/mdx'
import { PAGE_SIZE } from '../utils/constants'
import Home, { HomeProps } from '../components/templates/HomeLayout'

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const posts = await getPosts({ limit: PAGE_SIZE })

  return {
    props: {
      posts,
    },
  }
}

export default Home
