import { EffectCallback, useEffect } from 'react'

// This hook originally taken from: https://github.com/juliencrn/usehooks-ts

// The inverse of `useUpdateEffect`
export function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}
