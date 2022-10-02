import { useLocalStorage } from './useLocalStorage'
import { useMediaQuery } from './useMediaQuery'
import { useUpdateEffect } from './useUpdateEffect'

// This hook originally taken from: https://github.com/juliencrn/usehooks-ts

// This hook suffers from a slight bit of FOUC. If the site is set to dark
// mode and then you refresh the page, here's what happens...
//  - The browser is initially blank and white (I think this is unavoidable)
//  - Then the page renders and for a split second all of the content is in
//    light mode. The blog post is loaded, but the background is white. The
//    toggle switch is showing the sun.
//  - Then, it switches to dark mode
// Read this article for an idea of maybe how to fix this.
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions

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

  // Tailwind watches for the presence of this
  useUpdateEffect(() => {
    isDarkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }, [isDarkMode])

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
