import { useRef } from 'react'

// This hook originally taken from: https://github.com/juliencrn/usehooks-ts

export function useIsFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}
