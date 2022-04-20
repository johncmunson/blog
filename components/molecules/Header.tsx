import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.css'
import { useState, MouseEvent, useRef, useLayoutEffect } from 'react'
import { UseLayoutEffectParent } from '../atoms/UseLayoutEffectParent'

const UnsafeHeader = () => {
  const router = useRouter()
  const [isNavOpen, setNavIsOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)

  // Animate the height of the nav drawer. Unfortunately, we can't simply use CSS transitions
  // because the height of the drawer isn't known ahead of time. The height is variable, and
  // transitions don't work with height: auto. So we need to set the height explicitly, but
  // still make it dynamic by measuring the height of the content within.
  useLayoutEffect(() => {
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

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setNavIsOpen((_) => !_)
  }

  return (
    <header>
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-semibold tracking-wide`}>
          {router.pathname === '/' ? (
            'Ternary Town'
          ) : (
            <Link href="/">
              <a>Ternary Town</a>
            </Link>
          )}
        </h1>
        <button
          role="button"
          title="Menu"
          value="Menu"
          className={styles.hamburgerMenuButton}
          onClick={handleMenuClick}
        >
          <i
            className={
              isNavOpen
                ? styles.hamburgerMenuLine1Open
                : styles.hamburgerMenuLine1Closed
            }
          ></i>
          <i
            className={
              isNavOpen
                ? styles.hamburgerMenuLine2Open
                : styles.hamburgerMenuLine2Closed
            }
          ></i>
        </button>
      </div>
      <nav
        className="overflow-hidden mt-9 transition-[height] duration-700 ease-in-out"
        style={{
          height: isNavOpen ? `${height}px` : 0,
        }}
      >
        <div
          ref={navRef}
          className={`grid grid-cols-2 sm:grid-cols-3 gap-y-9 gap-x-5 md:text-lg lg:text-xl`}
        >
          <section>
            <h3 className="font-semibold">Most Popular</h3>
            <ul>
              <li>First</li>
              <li>Second</li>
              <li>Third</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold">Trending</h3>
            <ul>
              <li>First</li>
              <li>Second</li>
              <li>Third</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold">Subscribe</h3>
            <ul>
              <li>Twitter</li>
              <li>Newsletter</li>
              <li>RSS</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold">Address</h3>
            <address className="not-italic whitespace-nowrap">
              3750 Washington Ave
              <br />
              St. Louis, MO 63108
              <br />
              United States
            </address>
          </section>
          <section>
            <h3 className="font-semibold">Downloads</h3>
            <ul>
              <li>Fonts</li>
              <li>Templates</li>
              <li>Apps</li>
            </ul>
          </section>
          <section>
            <h3 className="font-semibold">About</h3>
            <ul>
              <li>Mission</li>
              <li>Core Values</li>
              <li>Privacy Policy</li>
            </ul>
          </section>
        </div>
      </nav>
    </header>
  )
}

export const Header = () => (
  <UseLayoutEffectParent>
    <UnsafeHeader />
  </UseLayoutEffectParent>
)
