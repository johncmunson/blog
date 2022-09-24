import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllPostTags, getPostsByTag } from '../../../lib/md'
import { Posts as PostsType, Tag } from '../../../types'
import { PageHeading } from '../../../components/atoms/PageHeading'
import { Posts } from '../../../components/atoms/Posts'
import { CLEARANCE_FROM_PAGE_LEVEL_HEADER } from '../../../lib/constants'

type TagPathParams = ParsedUrlQuery & {
  tag: Tag
}

type TagProps = { tag: Tag; posts: PostsType }

const Tag = ({ tag, posts }: TagProps) => {
  return (
    <>
      <PageHeading>
        Posts tagged with <span className="underline">{tag}</span>...
      </PageHeading>
      <div className={CLEARANCE_FROM_PAGE_LEVEL_HEADER} />
      <Posts posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps<TagProps> = async (context) => {
  const { tag } = context.params as TagPathParams
  const postsForTag = (await getPostsByTag(tag)) ?? []

  return {
    props: { tag, posts: postsForTag },
  }
}

export const getStaticPaths: GetStaticPaths<TagPathParams> = async () => {
  const allTags = await getAllPostTags()

  return {
    paths: allTags.map((tag) => ({ params: { tag } })),
    fallback: false,
  }
}

export default Tag
