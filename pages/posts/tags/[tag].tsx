import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Posts as PostsType, Tag } from '../../../types'
import { getAllPostTags, getPostsByTag } from '../../../lib/md'
import { BlogFeed } from '../../../components/organisms/BlogFeed'
import { PageHeading } from '../../../components/atoms/PageHeading'

type TagPathParams = ParsedUrlQuery & {
  tag: Tag
}

type TagProps = { tag: Tag; posts: PostsType }

const Tag = ({ tag, posts }: TagProps) => {
  return (
    <>
      <PageHeading>
        <span>
          Posts tagged with <span className="underline">{tag}</span>
        </span>
      </PageHeading>
      <BlogFeed posts={posts} className="mt-10 sm:mt-12 md:mt-14 lg:mt-16" />
    </>
  )
}

export const getStaticProps: GetStaticProps<TagProps> = async (context) => {
  const { tag } = context.params as TagPathParams
  const posts = (await getPostsByTag(tag)) ?? []

  return {
    props: { tag, posts },
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
