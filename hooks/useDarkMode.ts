import { useLocalStorage } from './useLocalStorage'
import { useMediaQuery } from './useMediaQuery'
import { useUpdateEffect } from './useUpdateEffect'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

interface UseDarkModeOutput {
  isDarkMode: boolean
  toggle: () => void
  enable: () => void
  disable: () => void
}

export function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    'dark-mode',
    defaultValue ?? isDarkOS ?? false
  )

  // If OS changes preference, then update the darkMode setting to match
  useUpdateEffect(() => {
    setDarkMode(isDarkOS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS])

  const toggle = () => setDarkMode((prev) => !prev)
  const enable = () => setDarkMode(true)
  const disable = () => setDarkMode(false)

  return {
    isDarkMode,
    toggle,
    enable,
    disable,
  }
}
