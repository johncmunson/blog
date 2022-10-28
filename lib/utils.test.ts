import { asyncForEach, isDefined, sleep } from './utils'

beforeEach(() => {
  jest.useFakeTimers()
})
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

describe('asyncForEach', () => {
  it('applies the async callback to each item in the array', async () => {
    const numbers = [1, 2, 3]
    const doubled: number[] = []

    await asyncForEach(numbers, async (n) => {
      const sleepPromise = sleep(5000)
      jest.runAllTimers()
      await sleepPromise
      doubled.push(n * 2)
    })

    expect(doubled).toEqual([2, 4, 6])
  })
})

describe('sleep', () => {
  it('sleeps for the given number of ms', async () => {
    const timestamp1 = Date.now()

    const sleepPromise = sleep(10_000)
    jest.runAllTimers()
    await sleepPromise

    const timestamp2 = Date.now()

    expect(timestamp2 - timestamp1).toEqual(10_000)
  })
})

describe('isDefined', () => {
  it('returns true if a value is defined', () => {
    expect(isDefined('hi')).toBe(true)
  })

  it('returns false if a value is not defined', () => {
    expect(isDefined(undefined)).toBe(false)
    expect(isDefined(null)).toBe(false)
  })
})
