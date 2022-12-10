import { GetStaticProps } from 'next'
import { Authors, PostsByAuthors } from '../../types'
import { PageHeading } from '../../components/atoms/PageHeading'
import { getAllPostAuthors, getPostsByAuthor } from '../../lib/md'
import { AuthorCard } from '../../components/molecules/AuthorCard'
import { CLEARANCE_FROM_PAGE_LEVEL_HEADER } from '../../lib/constants'

type AuthorsProps = {
  allAuthors: Authors
}

const Authors = ({ allAuthors }: AuthorsProps) => {
  return (
    <>
      <PageHeading>Contributors</PageHeading>
      <div
        className={`${CLEARANCE_FROM_PAGE_LEVEL_HEADER} grid grid-cols-1 lg:grid-cols-2 gap-y-6 md:gap-y-10 gap-x-10`}
      >
        {allAuthors.map((author, i) => (
          <AuthorCard key={i} author={author} />
        ))}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<AuthorsProps> = async () => {
  const allAuthors = await getAllPostAuthors()

  return {
    props: { allAuthors },
  }
}

export default Authors
