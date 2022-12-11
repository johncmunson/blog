import Link from 'next/link'
import Image from 'next/image'
import { Author } from '../../types'
import { BODY_TEXT_FONT_SIZE } from '../../lib/constants'

type AuthorCardProps = {
  author: Author
}

export const AuthorCard = ({ author }: AuthorCardProps) => (
  <div className="flex gap-x-3 sm:gap-x-4 md:gap-x-5">
    <div className="relative h-24 w-24 md:h-28 md:w-28 flex-none">
      <Image
        alt={`${author.first} ${author.last}`}
        fill
        src={author.avatar}
        className="rounded-3xl"
      />
    </div>
    <div className={`${BODY_TEXT_FONT_SIZE} min-w-0`}>
      <Link
        href={`/posts/authors/${author.first} ${author.last}`}
        className="font-medium whitespace-nowrap overflow-hidden text-ellipsis"
      >{`${author.first} ${author.last}`}</Link>
      {author.twitter && (
        <Link
          href={`https://twitter.com/${author.twitter}`}
          className="block overflow-hidden text-ellipsis"
        >
          @{author.twitter}
        </Link>
      )}
      <div>
        {author.numberOfPosts} {author.numberOfPosts === 1 ? 'post' : 'posts'}
      </div>
    </div>
  </div>
)
