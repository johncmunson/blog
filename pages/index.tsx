import { GetStaticProps } from 'next'
import Home, {
  HomeProps,
  _getStaticPropsFactory,
} from '../components/templates/HomeLayout'
import { getPosts } from '../utils/mdx'
import { PAGE_SIZE } from '../utils/constants'

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  return _getStaticPropsFactory(() => getPosts({ limit: PAGE_SIZE }))(context)
}

export default Home
