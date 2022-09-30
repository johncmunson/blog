import { createContext, useContext, ReactNode } from 'react'
import { useDarkMode } from '../hooks/useDarkMode'

type DarkModeState = {
  isDarkMode: boolean
  toggle: () => void
  enable: () => void
  disable: () => void
}

const defaultDarkModeState: DarkModeState = {
  isDarkMode: false,
  toggle: () => {
    // noop
  },
  enable: () => {
    // noop
  },
  disable: () => {
    // noop
  },
}

const DarkModeContext = createContext<DarkModeState>(defaultDarkModeState)

function DarkModeProvider({ children }: { children: ReactNode }) {
  const { isDarkMode, toggle, enable, disable } = useDarkMode(false)

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggle, enable, disable }}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkModeCtx() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export { DarkModeProvider, useDarkModeCtx }
