import { drop, take } from 'lodash'

export async function asyncForEach<T>(
  array: T[],
  callback: (item: T, index: number, allItems: T[]) => Promise<void>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const isAsyncFn = <T>(fn: any): fn is (...args: any[]) => Promise<T> =>
  fn.constructor.name === 'AsyncFunction'

type ArrayReturningFn<T> = () => T[]
export const paginateFn = <T>(
  fn: ArrayReturningFn<T>
): ((pagination: { limit?: number; offset?: number }) => T[]) => {
  return ({ limit, offset }: { limit?: number; offset?: number }) => {
    const arr = fn()

    const offsetArr = offset ? drop(arr, offset) : arr
    const takeArr = limit ? take(arr, limit) : offsetArr

    return takeArr
  }
}

type ArrayReturningAsyncFn<T> = () => Promise<T[]>
export const paginateAsyncFn = <T>(
  fn: ArrayReturningAsyncFn<T>
): ((pagination: { limit?: number; offset?: number }) => Promise<T[]>) => {
  return async ({ limit, offset }: { limit?: number; offset?: number }) => {
    const arr = await fn()

    const offsetArr = offset ? drop(arr, offset) : arr
    const takeArr = limit ? take(arr, limit) : offsetArr

    return takeArr
  }
}

// // pagination higher order function
// const getPosts = paginateAsyncFn<Post>(getAllPosts)

// const homePagePosts = getPosts({ limit: 8 })
// const restOfPosts = getPosts({ offset: 8 })
