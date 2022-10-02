import Link from 'next/link'
import { Post } from '../../types'
import Image from 'next/future/image'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps, GetStaticPaths } from 'next'
import markdownToHtml from '../../lib/markdownToHtml'
import { getPostBySlug, getPostSlugs } from '../../lib/md'
import { PageHeading } from '../../components/atoms/PageHeading'
import { CLEARANCE_FROM_PAGE_LEVEL_HEADER } from '../../lib/constants'

type PostPathParams = ParsedUrlQuery & {
  slug: string
}

type PostProps = Post & { html: string }

const Post = ({ html, frontmatter, date }: PostProps) => {
  return (
    <>
      <div>
        <PageHeading>{frontmatter.title}</PageHeading>
        <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 font-mono mt-2 sm:mt-3 md:mt-5 lg:mt-6 text-sm md:text-base">
          <p>By: {frontmatter.author}</p>
          <p>&bull;</p>
          <p>Published: {date}</p>
        </div>
        <p className="sm:mt-1 text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {frontmatter.description}
        </p>
      </div>
      {frontmatter.coverPhoto && (
        <Image
          src={`/${frontmatter.coverPhoto}`}
          alt={frontmatter.coverPhoto}
          fill
          // the Image component is *really* quirky to work with. By default, it is given
          // absolute positioning when using the fill property. Weird. So we use !static
          // as a hack to make it behave normally.
          // https://nextjs.org/docs/api-reference/next/future/image#fill
          className={`!static rounded-md ${CLEARANCE_FROM_PAGE_LEVEL_HEADER}`}
        />
      )}
      <main className={`${CLEARANCE_FROM_PAGE_LEVEL_HEADER}`}>
        <article
          // The tailwind typography plugin is a good way to style Markdown HTML,
          // but we're using remark, rehype, and unified instead.
          // https://tailwindcss.com/docs/typography-plugin
          // className="prose prose-lg md:prose-xl lg:prose-2xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <div className="italic mt-9 sm:mt-10 md:mt-11 lg:mt-12 text-base sm:text-lg md:text-xl lg:text-2xl">
        <Link href="/posts/tags">
          <a className="mr-4 hover:underline">Tags:</a>
        </Link>
        {frontmatter.tags.map((tag, i) => (
          <Link key={i} href={`/posts/tags/${tag}`}>
            <a className="bg-neutral-200 dark:bg-neutral-700 rounded-full mr-3 px-3 py-1 hover:py-2 outline outline-neutral-300 dark:outline-neutral-600 outline-offset-1 hover:outline-primary-400 dark:hover:outline-primary-400">
              {tag}
            </a>
          </Link>
        ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
  const { slug } = context.params as PostPathParams
  const post = await getPostBySlug(slug)
  const html = await markdownToHtml(post)

  return {
    props: { ...post, html },
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
