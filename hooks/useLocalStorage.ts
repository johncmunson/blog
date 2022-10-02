import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useEffectOnce } from './useEffectOnce'
import { useEventCallback } from './useEventCallback'
import { useEventListener } from './useEventListener'
import { useIsFirstRender } from './useIsFirstRender'

// This hook originally taken from: https://github.com/juliencrn/usehooks-ts
// Several modifications have been made, mainly due to the fact that this hook
// may not have been originally created with SSR in mind. When I tried to use
// it as-is to power dark mode, I was getting hydration errors when React tried
// to hydrate on the frontend. You could technically suppress this warning if
// you wanted to with `<div suppressHydrationWarning>Dark Mode Enabled: {isDarkMode}</div>`.
// But that's a hack I was wanting to avoid.

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Added this to prevent the hydration error -John
  const isFirstRender = useIsFirstRender()

  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }, [initialValue, key])

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(
    // This used to just be readValue, which was no good because it was returning the
    // value stored in localStorage (which might be "true"). The backend always SSRs
    // using 'false' though, and we need the initial hydration to match the SSR value -John
    isFirstRender ? initialValue : readValue
  )

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = useEventCallback((value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key "${key}" even though environment is not a client`
      )
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue))

      // Save state
      setStoredValue(newValue)

      // We dispatch a custom event so every useLocalStorage hook is notified
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  })

  // This used to be... setStoredValue(readValue())
  // Changed it b/c on the first render or page load, if localStorage wasn't already set
  // it wasn't getting populated until, for example, someone toggle the dark mode slider. -John
  useEffectOnce(() => {
    setValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return
      }
      setStoredValue(readValue())
    },
    [key, readValue]
  )

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange)

  // this is a custom event, triggered in `setValue`
  useEventListener('local-storage', handleStorageChange)

  return [storedValue, setValue]
}

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    console.error('parsing error on', { value })
    return undefined
  }
}
