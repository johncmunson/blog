import Link from 'next/link'
import { Post, Posts } from '../../types'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps, GetStaticPaths } from 'next'
import markdownToHtml from '../../lib/markdownToHtml'
import { NextPrev } from '../../components/molecules/NextPrev'
import { PageHeading } from '../../components/atoms/PageHeading'
import { BlogPostImage } from '../../components/atoms/BlogPostImage'
import { CLEARANCE_FROM_PAGE_LEVEL_HEADER } from '../../lib/constants'
import { BlogPostSeries } from '../../components/molecules/BlogPostSeries'
import {
  getNextSlug,
  getPrevSlug,
  getPostSlugs,
  getPostBySlug,
  getPostsBySeries,
} from '../../lib/md'

type PostPathParams = ParsedUrlQuery & {
  slug: string
}

type PostProps = Post & {
  html: string
  nextSlug?: string
  prevSlug?: string
  otherPostsInSeries?: Posts
}

const Post = ({
  html,
  nextSlug,
  prevSlug,
  otherPostsInSeries,
  ...post
}: PostProps) => {
  return (
    <>
      <div>
        <PageHeading>{post.frontmatter.title}</PageHeading>
        <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 font-mono mt-2 sm:mt-3 md:mt-5 lg:mt-6 text-sm md:text-base">
          <p data-cy="author">By: {post.frontmatter.author}</p>
          <p>&bull;</p>
          <p data-cy="publish-date">Published: {post.date}</p>
        </div>
        <p
          data-cy="description"
          className="mt-0.5 sm:mt-1 text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          {post.frontmatter.description}
        </p>
      </div>
      {post.frontmatter.coverPhoto ? (
        <BlogPostImage
          dataCy="cover-photo"
          src={post.frontmatter.coverPhoto}
          alt={post.frontmatter.coverPhoto}
          className={CLEARANCE_FROM_PAGE_LEVEL_HEADER}
        />
      ) : (
        <hr
          data-cy="no-cover-photo-spacer"
          className={`${CLEARANCE_FROM_PAGE_LEVEL_HEADER} border-neutral-300`}
        />
      )}
      {otherPostsInSeries && post.frontmatter.series && (
        <BlogPostSeries
          series={post.frontmatter.series}
          currentPost={post}
          postsInSeries={otherPostsInSeries}
        />
      )}
      <main className={`${CLEARANCE_FROM_PAGE_LEVEL_HEADER}`}>
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </main>
      <div
        data-cy="tags-bar"
        className="italic mt-9 sm:mt-10 md:mt-11 lg:mt-12 text-base sm:text-lg md:text-xl lg:text-2xl"
      >
        <Link
          data-cy="tags-link"
          href="/posts/tags"
          className="mr-4 hover:underline"
        >
          Tags:
        </Link>
        {post.frontmatter.tags.map((tag, i) => (
          <Link
            data-cy={`tag-${i}-link`}
            key={i}
            href={`/posts/tags/${tag}`}
            className="bg-neutral-200 dark:bg-neutral-700 rounded-full mr-3 px-3 py-1 hover:py-2 outline outline-neutral-300 dark:outline-neutral-600 outline-offset-1 hover:outline-primary-400 dark:hover:outline-primary-400"
          >
            {tag}
          </Link>
        ))}
      </div>
      <NextPrev prevHref={prevSlug} nextHref={nextSlug} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const { slug } = context.params as PostPathParams
  const nextSlug = getNextSlug(slug)
  const prevSlug = getPrevSlug(slug)
  const post = await getPostBySlug(slug)
  const html = await markdownToHtml(post)

  const props: PostProps = { ...post, html }
  if (nextSlug) props.nextSlug = nextSlug
  if (prevSlug) props.prevSlug = prevSlug
  if (post.frontmatter.series) {
    const otherPostsInSeries = await getPostsBySeries(post.frontmatter.series)
    if (otherPostsInSeries) props.otherPostsInSeries = otherPostsInSeries
  }

  return {
    props,
  }
}

export const getStaticPaths: GetStaticPaths<PostPathParams> = async () => {
  const slugs = getPostSlugs()

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    /**
     * fallback: true     - All dynamic pages are generated at build time. If a user tries
     *                      to access an invalid route, then they are served a 404 page.
     * fallback: false    - Use this option for large sites that need to optimize for quicker
     *                      build times. Only return a subset of default pages that will get
     *                      built during the build. At runtime, if a user tries to access a
     *                      route that hasn't been built yet, they will get a loading screen
     *                      while Next builds that page on the fly. Next will cache this page
     *                      for all subsequent visits. You can always manually return a 404
     *                      page if the route is truly invalid.
     * fallback: blocking - Same as fallback: ture except the browser blocks until the page
     *                      has fully loaded instead of showing a loading screen.
     *
     * https://thetombomb.com/posts/nextjs-optimizing-getstaticpaths-with-fallback
     */
    fallback: false,
  }
}

export default Post
