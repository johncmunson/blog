import Link from 'next/link'
import { Post, Posts, Series } from '../../types'

type BlogPostSeriesProps = {
  series: Series
  currentPost: Post
  postsInSeries: Posts
}

export const BlogPostSeries = ({
  series,
  currentPost,
  postsInSeries,
}: BlogPostSeriesProps) => {
  return (
    <div>
      <p>
        {series} ({postsInSeries.length} Part Series)
      </p>
      <ol>
        {postsInSeries.map((post, i) => (
          <li key={i}>
            {post.frontmatter.title === currentPost.frontmatter.title ? (
              post.frontmatter.title
            ) : post.date === 'DRAFT' ? (
              `${post.frontmatter.title} (coming soon)`
            ) : (
              <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
