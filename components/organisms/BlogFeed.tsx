import Link from 'next/link'
import { Fragment } from 'react'
import { Post } from '../../types'

type BlogFeedProps = {
  posts: Post[]
  className?: string
}

export const BlogFeed = ({ posts, className }: BlogFeedProps) => (
  <div
    data-cy="blog-feed"
    className={`sm:grid sm:grid-cols-3 sm:gap-y-9 sm:gap-x-4 items-start ${
      className ? className : ''
    }`}
  >
    {posts.map((post, i) => (
      <Fragment key={i}>
        <div
          className={`flex flex-col sm:flex-col-reverse ${
            i === 0 ? '' : '-sm:mt-9'
          }`}
        >
          <div
            data-cy={`publish-date-${i}`}
            className="font-mono text-sm md:text-base lg:text-lg"
          >
            {post.publishDate.replace(/-/g, '.')}
          </div>
          <Link
            data-cy={`title-${i}`}
            href={`/posts/${post.slug}`}
            className="font-medium md:text-lg lg:text-xl hover:text-primary-400"
          >
            {post.frontmatter.title}
          </Link>
        </div>

        <div className="col-span-2 md:text-lg lg:text-xl">
          <Link data-cy={`description-${i}`} href={`/posts/${post.slug}`}>
            <span>
              <span className="hover:text-primary-400">
                {post.frontmatter.description}
              </span>{' '}
              <span className="text-primary-400">→</span>
            </span>
          </Link>
        </div>
      </Fragment>
    ))}
  </div>
)
