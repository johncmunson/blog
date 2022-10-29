import Link from 'next/link'
import { UL } from '../../lib/constants'
import { Posts as PostsType } from '../../types'

type PostsProps = {
  posts: PostsType
}

export const Posts = ({ posts }: PostsProps) => (
  <ul className={`${UL}`}>
    {posts.map((post, i) => (
      <li key={i}>
        <Link href={`/posts/${post.slug}`} className={`hover:text-primary-400`}>
          {post.frontmatter.title}
        </Link>
      </li>
    ))}
  </ul>
)
