import { useState, MouseEvent } from 'react'
import styles from './Header.module.css'

export const Header = () => {
  const [isMenuOpen, setMenuIsOpen] = useState(false)

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setMenuIsOpen((_) => !_)
  }

  return (
    <header>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-wide">Ternary Town</h1>
        <button
          role="button"
          title="Menu"
          value="Menu"
          className={styles.hamburgerMenuButton}
          onClick={handleMenuClick}
        >
          <i
            className={
              isMenuOpen
                ? styles.hamburgerMenuLine1Open
                : styles.hamburgerMenuLine1Closed
            }
          ></i>
          <i
            className={
              isMenuOpen
                ? styles.hamburgerMenuLine2Open
                : styles.hamburgerMenuLine2Closed
            }
          ></i>
        </button>
      </div>
      <nav
        // If you want to animate the drawer sliding open, you'll need to explicitly set the
        // height when it's open by measuring the dimensions of the inner content. You can
        // then use CSS transitions to animate the drawer.
        //   - https://github.com/streamich/react-use/blob/master/docs/useMeasure.md
        //   - https://github.com/streamich/react-use/blob/master/docs/useSize.md
        //   - https://css-tricks.com/using-css-transitions-auto-dimensions/#aa-technique-3-javascript
        className={`grid grid-cols-2 sm:grid-cols-3 mt-9 gap-y-9 gap-x-5 overflow-hidden md:text-lg lg:text-xl ${
          isMenuOpen ? 'h-auto' : 'h-0'
        }`}
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
      </nav>
    </header>
  )
}
