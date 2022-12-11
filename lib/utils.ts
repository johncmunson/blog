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

// https://leancrew.com/all-this/2020/06/ordinal-numerals-and-javascript/
export function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export function dedupeArray<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

export function isPositiveInteger(str: string) {
  const num = Number(str)

  if (Number.isInteger(num) && num > 0) {
    return true
  }

  return false
}
