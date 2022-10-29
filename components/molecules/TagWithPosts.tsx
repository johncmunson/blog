import Link from 'next/link'
import { H2 } from '../../lib/constants'
import { Tag, Posts as PostsType } from '../../types'
import { Posts } from '../atoms/Posts'

type TagWithPostsProps = {
  tag: Tag
  posts: PostsType
}

export const TagWithPosts = ({ tag, posts }: TagWithPostsProps) => (
  <div>
    <h2 className={`${H2} -99xl:mt-0`}>
      <Link href={`/posts/tags/${tag}`} className={`hover:text-primary-400`}>
        {tag}
      </Link>
    </h2>
    <Posts posts={posts} />
  </div>
)
