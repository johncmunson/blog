import { chunk } from 'lodash'
import { UrlObject } from 'url'
import { SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { PAGE_SIZE } from '../utils/constants'

export function useQueryStringPagination<T>(arr: T[]) {
  const router = useRouter()
  const { page } = router.query
  // TODO: Protect against garbage like baseUrl/?page=abc
  const pageNumber = page ? Number(page) : 1
  const itemsByPage = chunk(arr, PAGE_SIZE)
  const isFirstPage = pageNumber === 1
  const isLastPage = pageNumber === itemsByPage.length
  const currentItems = itemsByPage[pageNumber - 1]

  const next = (e?: SyntheticEvent) => {
    e?.preventDefault()
    if (!isLastPage) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber + 1 },
      })
    }
  }

  const previous = (e?: SyntheticEvent) => {
    e?.preventDefault()
    if (!isFirstPage) {
      const query: UrlObject['query'] = {
        ...router.query,
        page: pageNumber - 1,
      }
      if (pageNumber === 2) {
        delete query.page
      }
      router.push({
        pathname: router.pathname,
        query,
      })
    }
  }

  return {
    pageNumber,
    itemsByPage,
    isFirstPage,
    isLastPage,
    currentItems,
    next,
    previous,
  }
}
