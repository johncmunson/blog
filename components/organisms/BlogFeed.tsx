import Link from 'next/link'
import { Fragment } from 'react'
import { Post } from '../../types'

type BlogFeedProps = {
  posts: Post[]
}

export const BlogFeed = ({ posts }: BlogFeedProps) => (
  <div className="mt-20 sm:grid sm:grid-cols-3 sm:gap-y-9 sm:gap-x-4 items-start">
    {posts.map((post, i) => (
      <Fragment key={i}>
        <div
          className={`flex flex-col sm:flex-col-reverse ${
            i === 0 ? '' : '-sm:mt-9'
          }`}
        >
          <div className="font-mono text-sm md:text-base lg:text-lg">
            {post.date.replace(/-/g, '.')}
          </div>
          <Link href={`/posts/${post.slug}`}>
            <a className="font-medium md:text-lg lg:text-xl hover:text-primary-400">
              {post.frontmatter.title}
            </a>
          </Link>
        </div>

        <div className="col-span-2 md:text-lg lg:text-xl">
          <Link href={`/posts/${post.slug}`}>
            <a>
              <span className="hover:text-primary-400">
                {post.frontmatter.description}
              </span>{' '}
              <span className="text-primary-400">→</span>
            </a>
          </Link>
        </div>
      </Fragment>
    ))}
  </div>
)
