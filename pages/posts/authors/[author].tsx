import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps, GetStaticPaths } from 'next'
import { AuthorCard } from '../../../components/molecules/AuthorCard'
import { Author as AuthorType, Posts as PostsType } from '../../../types'
import {
  getPostsByAuthor,
  getAllPostAuthors,
  getAuthorByName,
} from '../../../lib/md'
import {
  BODY_TEXT_FONT_SIZE,
  CLEARANCE_FROM_PAGE_LEVEL_HEADER,
} from '../../../lib/constants'
import { BlogFeed } from '../../../components/organisms/BlogFeed'

type AuthorPathParams = ParsedUrlQuery & {
  author: string
}

type AuthorProps = {
  author: AuthorType
  posts: PostsType
}

const Author = ({ author, posts }: AuthorProps) => {
  return (
    <>
      <AuthorCard author={author} />
      <p className={`${BODY_TEXT_FONT_SIZE} mt-2 sm:mt-3 md:mt-4`}>
        {author.bio}
      </p>
      <hr
        data-cy="content-divider"
        className={`${CLEARANCE_FROM_PAGE_LEVEL_HEADER} border-neutral-300 dark:border-neutral-700`}
      />
      <BlogFeed posts={posts} className="mt-10 sm:mt-12 md:mt-14 lg:mt-16" />
    </>
  )
}

export const getStaticProps: GetStaticProps<AuthorProps> = async (context) => {
  const { author: authorName } = context.params as AuthorPathParams
  const author = await getAuthorByName(authorName)
  const posts = (await getPostsByAuthor(authorName)) ?? []

  return {
    props: { author, posts },
  }
}

export const getStaticPaths: GetStaticPaths<AuthorPathParams> = async () => {
  const allAuthors = await getAllPostAuthors()

  return {
    paths: allAuthors.map((author) => ({
      params: {
        author: `${author.first} ${author.last}`,
      },
    })),
    fallback: false,
  }
}

export default Author
