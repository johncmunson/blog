import Link from 'next/link'
import { Post } from '../../types'
import FutureImage from 'next/future/image'
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
        <FutureImage
          src={`/${frontmatter.coverPhoto}`}
          alt={frontmatter.coverPhoto}
          fill
          // the Image component is *really* quirky to work with. By default, it is given
          // absolute positioning. Weird. So we use !static as a hack to make it behave normally.
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
            <a className="bg-gray-100 rounded-full mr-3 px-3 py-1 outline outline-gray-300 outline-offset-1 hover:outline-sky-400">
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
    // If user tries to access an invalid post, i.e. localhost:3000/posts/not-valid,
    // then display a 404 page. True is used for very large sites that have a ton
    // of pages.
    fallback: false,
  }
}

export default Post
