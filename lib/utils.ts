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

export function isDefined<T>(val: T | undefined | null): val is T {
  return val !== undefined && val !== null
}
