import {
  BODY_TEXT_FONT_SIZE,
  CLEARANCE_FROM_PAGE_LEVEL_HEADER,
} from '../../lib/constants'
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
    <div
      data-cy="blog-post-series"
      className={`${CLEARANCE_FROM_PAGE_LEVEL_HEADER} ${BODY_TEXT_FONT_SIZE} divide-y divide-neutral-300 dark:divide-neutral-700 py-4 px-8 border-2 rounded-md border-neutral-300 dark:border-neutral-700`}
    >
      <p className="font-medium">
        {series} ({postsInSeries.length} Part Series)
      </p>
      <ol className="divide-y divide-neutral-300 dark:divide-neutral-700 mt-2 md:mt-3">
        {postsInSeries.map((post, i) => (
          <li key={i} className="relative py-1 last:pb-0">
            {post.frontmatter.title === currentPost.frontmatter.title ? (
              <span className="before:content-['*'] before:absolute before:-left-5 before:font-mono before:text-primary-400">
                {post.frontmatter.title}
              </span>
            ) : post.date === 'DRAFT' ? (
              <span>
                {post.frontmatter.title}{' '}
                <span className="italic" style={{ fontSize: '0.8em' }}>
                  (coming soon)
                </span>
              </span>
            ) : (
              <Link
                href={`/posts/${post.slug}`}
                className="hover:text-primary-400"
              >
                {post.frontmatter.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
