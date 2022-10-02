import { DependencyList, EffectCallback, useEffect } from 'react'
import { useIsFirstRender } from './useIsFirstRender'

// This hook originally taken from: https://github.com/juliencrn/usehooks-ts

// The inverse of `useEffectOnce`
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
