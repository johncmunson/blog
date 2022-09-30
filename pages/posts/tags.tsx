import { GetStaticProps } from 'next'
import { PostsByTag, Tags } from '../../types'
import { getAllPostTags, getPostsByTag } from '../../lib/md'
import { PageHeading } from '../../components/atoms/PageHeading'
import { CLEARANCE_FROM_PAGE_LEVEL_HEADER } from '../../lib/constants'
import { TagWithPosts } from '../../components/molecules/TagWithPosts'

type TagsProps = { allTags: Tags; postsByTag: PostsByTag }

const Tags = ({ allTags, postsByTag }: TagsProps) => {
  return (
    <>
      <PageHeading>Posts tagged with...</PageHeading>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-y-5 md:gap-y-9 gap-x-10 ${CLEARANCE_FROM_PAGE_LEVEL_HEADER}`}
      >
        {allTags.map((tag, i) => (
          <TagWithPosts key={i} tag={tag} posts={postsByTag[tag]} />
        ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  const allTags = await getAllPostTags()
  const postsByTag = await getPostsByTag()

  return {
    props: { allTags, postsByTag },
  }
}

export default Tags
