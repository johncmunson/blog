import { useEffect, useState } from 'react'

// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}
