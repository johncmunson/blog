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

// Note that this component will show upcoming drafts that are in the blog post series. However, if you have multiple
// upcoming drafts you may be wondering how they are supposed to sort in the correct order since drafts do not have
// a publishDate.
//   2020-06-25-lorem-ipsum.md
//   DRAFT-dolor-sit-amet.md
//   DRAFT-enim-ad-minum.md
// The answer... you can simply add a number! This won't mess anything up, since the actual blog post title is coming
// from the frontmatter, and it will allow draft posts in a series to get sorted correctly.
//   2020-06-25-lorem-ipsum.md
//   DRAFT-1-dolor-sit-amet.md
//   DRAFT-2-enim-ad-minum.md

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
            ) : post.publishDate === 'DRAFT' ? (
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
