import { useState, MouseEvent } from 'react'
import styles from './Header.module.css'

export const Header = () => {
  const [isMenuOpen, setMenuIsOpen] = useState(false)

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setMenuIsOpen((_) => !_)
  }

  return (
    <div className="mt-9 mx-3">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Ternary Town</h1>
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
      <nav className={isMenuOpen ? styles.drawerOpen : styles.drawerClosed}>
        <section className={styles.drawerItem}>
          <h3 className="font-semibold">Most Popular</h3>
          <ul>
            <li>On Apps and Coffee</li>
            <li>End Procrastination</li>
            <li>Do Presentations Make You Anxious?</li>
            <li>How To Think Different</li>
            <li>On Monopolies, Apple, and Epic</li>
          </ul>
        </section>
        <section className={styles.drawerItem}>
          <h3 className="font-semibold">Trending</h3>
          <ul>
            <li>Useful macOS Tricks</li>
            <li>UX Lessons In Game Design</li>
            <li>“Ethics” and Ethics</li>
            <li>Take the Power Back</li>
            <li>Why we like distractions</li>
          </ul>
        </section>
        <section className={styles.drawerItem}>
          <h3 className="font-semibold">Subscribe</h3>
          <ul>
            <li>Twitter</li>
            <li>Newsletter</li>
            <li>RSS</li>
          </ul>
        </section>
        <section className={styles.drawerItem}>
          <h3 className="font-semibold">Address</h3>
          <address className="not-italic">
            3750 Washington Ave
            <br />
            St. Louis, MO 63108
          </address>
        </section>
        <section className={styles.drawerItem}>
          <h3 className="font-semibold">Downloads</h3>
          <ul>
            <li>Fonts</li>
            <li>Templates</li>
            <li>Apps</li>
          </ul>
        </section>
        <section className={styles.drawerItem}>
          <h3 className="font-semibold">About</h3>
          <ul>
            <li>Mission</li>
            <li>Core Values</li>
            <li>Privacy Policy</li>
          </ul>
        </section>
      </nav>
    </div>
  )
}
