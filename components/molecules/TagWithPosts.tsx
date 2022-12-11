import Link from 'next/link'
import { H2, UL } from '../../lib/constants'
import { Tag, Posts as PostsType } from '../../types'

type TagWithPostsProps = {
  tag: Tag
  posts: PostsType
}

export const TagWithPosts = ({ tag, posts }: TagWithPostsProps) => (
  <div data-cy={`tag-${tag}-with-posts`}>
    <h2 className={`${H2} -99xl:mt-0`}>
      <Link href={`/posts/tags/${tag}`} className={`hover:text-primary-400`}>
        {tag}
      </Link>
    </h2>
    <ul className={`${UL}`}>
      {posts.map((post, i) => (
        <li key={i}>
          <Link
            href={`/posts/${post.slug}`}
            className={`hover:text-primary-400`}
          >
            {post.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)
