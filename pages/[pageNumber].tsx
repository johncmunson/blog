import { GetStaticPaths, GetStaticProps } from 'next'
import Home, {
  HomePathParams,
  HomeProps,
  _getStaticPathsFactory,
  _getStaticPropsFactory,
} from '../components/templates/HomeLayout'
import { PAGE_SIZE } from '../utils/constants'
import { getPosts } from '../utils/mdx'

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  return _getStaticPropsFactory(() => getPosts({ offset: PAGE_SIZE }))(context)
}

export const getStaticPaths: GetStaticPaths<HomePathParams> = (context) =>
  _getStaticPathsFactory(() => getPosts({ offset: PAGE_SIZE }))(context)

export default Home
