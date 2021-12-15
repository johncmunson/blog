import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next"
import { Frontmatter, getAllSlugs, getSinglePost } from "../../utils/mdx"
import { ParsedUrlQuery } from "querystring"

type Params = ParsedUrlQuery & {
  slug: string
}

type Props = {
  code: string
  frontmatter: Frontmatter
}

const Post: NextPage<Props> = ({
  code,
  frontmatter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
  const params = context.params!
  const post = await getSinglePost(params.slug)

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
    fallback: false,
  }
}

export default Post
