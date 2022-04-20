import { ReactNode, useEffect, useState } from 'react'

/**
 * useLayoutEffect can cause the following warning when used in an SSR environment...
 *
 * Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server
 * renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI.
 * To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See
 * https://reactjs.org/link/uselayouteffect-ssr for common fixes.
 *
 * This component can be used to lazily show the component that's using useLayoutEffect, which will avoid running
 * into the warning above.
 *
 * There may be other, simpler ways of solving this issue...
 *  - https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 *  - https://nextjs.org/docs/advanced-features/dynamic-import
 */
export function UseLayoutEffectParent(props: {
  children: ReactNode
  placeholder?: ReactNode
}) {
  const [showChild, setShowChild] = useState(false)

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return props.placeholder ? <>{props.placeholder}</> : null
  }

  return <>{props.children}</>
}
