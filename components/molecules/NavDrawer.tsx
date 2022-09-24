import { useRef, useState } from 'react'
import { NavContent } from '../atoms/NavContent'
import { NAV_MT } from '../../lib/constants'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'

type NavDrawerProps = {
  isNavOpen: boolean
}

export const NavDrawer = ({ isNavOpen }: NavDrawerProps) => {
  const [height, setHeight] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)

  /**
   * Animate the height of the nav drawer. Unfortunately, we can't simply use CSS transitions
   * because the height of the drawer isn't known ahead of time. The height is variable, and
   * transitions don't work with height: auto. So we need to set the height explicitly, but
   * still make it dynamic by measuring the height of the content within.
   *
   * Also, we use useIsomorphicLayoutEffect because the regular useLayoutEffect hook will
   * throw a console warning when used in an SSR environment. For more details, see...
   *  - https://reactjs.org/link/uselayouteffect-ssr
   *  - https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
   */
  useIsomorphicLayoutEffect(() => {
    if (navRef.current) {
      // Because tailwind preflight applies box-sizing: border-box to all elements, clientHeight
      // does not include padding and border-width. So we need to add it back in.
      const height = navRef.current.clientHeight
      const computedStyle = window.getComputedStyle(navRef.current)
      const paddingAndMargin = (
        ['paddingTop', 'paddingBottom', 'marginTop', 'marginBottom'] as const
      ).reduce((prev, current) => {
        const pixels = Number(computedStyle[current].replace('px', ''))
        return prev + pixels
      }, 0)
      const fullHeight = height + paddingAndMargin

      setHeight(fullHeight)
    }
  }, [navRef.current?.clientHeight])

  return (
    <nav
      className={`overflow-hidden transition-[height] duration-700 ease-in-out ${NAV_MT}`}
      style={{
        height: isNavOpen ? `${height}px` : 0,
      }}
    >
      <NavContent rootProps={{ ref: navRef }} />
    </nav>
  )
}
