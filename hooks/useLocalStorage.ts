import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useEffectOnce } from './useEffectOnce'
import { useEventCallback } from './useEventCallback'
import { useEventListener } from './useEventListener'
import { useIsFirstRender } from './useIsFirstRender'

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>

// Made changes b/c trying to avoid using hydration errors and/or needing to use suppressHydrationWarning={true}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // added this to prevent the hydration error
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

  // this used to just be readValue, which was no good because it was returning the
  // value stored in localStorage (which might be "true"). The backend always SSRs
  // using 'false' though, and we need the initial hydration to match the SSR value
  const [storedValue, setStoredValue] = useState<T>(
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

  // this used to be... setStoredValue(readValue())
  // changed it b/c on the first render or page load, if localStorage wasn't already set,
  // it wasn't getting populated someone toggled the dark mode state and triggered another
  // render. Also, change to using 'useEffectOnce' b/c why not.
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

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
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
