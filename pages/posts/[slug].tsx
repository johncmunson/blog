import { useMemo } from "react"
import { Frontmatter } from "../../types"
import { ParsedUrlQuery } from "querystring"
import { getMDXComponent } from "mdx-bundler/client"
import { getAllSlugs, getSinglePost } from "../../utils/mdx"
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next"

type Props = {
  code: string
  frontmatter: Frontmatter
}

type Params = ParsedUrlQuery & {
  slug: string
}

const Post = ({
  code,
  frontmatter,
}: // Could also just use Props, instead of infering them
InferGetStaticPropsType<typeof getStaticProps>) => {
  // It's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <header className="mb-4">
        <h1>Title: {frontmatter.title}</h1>
        <p>Description: {frontmatter.description}</p>
        <p className="text-xs">
          (This is the header. It&apos;s part of the layout that is applied to
          every post.)
        </p>
        <hr />
      </header>
      <main>
        <Component />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params
  if (!params) throw new Error("Weird, you forgot to send params...")

  const slug = params.slug

  const post = await getSinglePost(slug)

  return {
    props: { ...post },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllSlugs()

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    // If user tries to access an invalid post, i.e. localhost:3000/posts/not-valid,
    // then display a 404 page. true is used for very large sites that have a ton
    // of pages.
    fallback: false,
  }
}

export default Post
