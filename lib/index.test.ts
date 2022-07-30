import { asyncForEach, sleep } from './index'

it('applies the async callback to each item in the array', async () => {
  const numbers = [1, 2, 3]
  const doubled: number[] = []

  await asyncForEach(numbers, async (n) => {
    await sleep(1)
    doubled.push(n * 2)
  })

  expect(doubled).toEqual([2, 4, 6])
})
