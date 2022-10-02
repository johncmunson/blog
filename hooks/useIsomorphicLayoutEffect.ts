import { useEffect, useLayoutEffect } from 'react'

// This hook originally taken from: https://github.com/juliencrn/usehooks-ts

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
