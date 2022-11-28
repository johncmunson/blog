import Link from 'next/link'
import { PaginationHref } from '../../hooks/useQueryStringPagination'

type NextPrevProps = {
  prevHref: PaginationHref
  nextHref: PaginationHref
}

export const NextPrev = ({ prevHref, nextHref }: NextPrevProps) => (
  <div className="flex items-center italic gap-4 sm:gap-5 md:gap-6 lg:gap-7 mt-14 sm:mt-16 md:mt-20 lg:mt-24 md:text-lg lg:text-xl">
    <Link
      data-cy="previous"
      href={prevHref ?? ''}
      className={`${prevHref ? '' : 'hidden'}`}
    >
      Previous
    </Link>
    <div className={`grow h-px bg-gray-300`}></div>
    <Link
      data-cy="next"
      href={nextHref ?? ''}
      className={`${nextHref ? '' : 'hidden'}`}
    >
      Next
    </Link>
  </div>
)
