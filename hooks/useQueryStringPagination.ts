import { chunk } from 'lodash'
import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import { PAGE_SIZE } from '../lib/constants'
import { ParsedUrlQueryInput } from 'querystring'

export type PaginationHref =
  | {
      pathname: string
      query: ParsedUrlQueryInput
    }
  | string
  | undefined

export function useQueryStringPagination<T>(arr: T[]) {
  const router = useRouter()
  const { page } = router.query
  // TODO: Protect against garbage like baseUrl/?page=abc
  const pageNumber = page ? Number(page) : 1
  const itemsByPage = chunk(arr, PAGE_SIZE)
  const isFirstPage = pageNumber === 1
  const isLastPage = pageNumber === itemsByPage.length
  const currentItems = itemsByPage[pageNumber - 1]

  const nextQuery: UrlObject['query'] = {
    ...router.query,
    page: pageNumber + 1,
  }
  const nextHref: PaginationHref = !isLastPage
    ? {
        pathname: router.pathname,
        query: nextQuery,
      }
    : undefined

  const prevQuery: UrlObject['query'] = {
    ...router.query,
    page: pageNumber - 1,
  }
  if (pageNumber === 2) {
    delete prevQuery.page
  }
  const prevHref: PaginationHref = !isFirstPage
    ? {
        pathname: router.pathname,
        query: prevQuery,
      }
    : undefined

  return {
    pageNumber,
    itemsByPage,
    currentItems,
    nextHref,
    prevHref,
  }
}
