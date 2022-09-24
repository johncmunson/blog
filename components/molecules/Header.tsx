import { Logo } from '../atoms/Logo'
import styles from './Header.module.css'
import { useState, MouseEvent } from 'react'
import { NavDrawer } from '../molecules/NavDrawer'

export const Header = () => {
  const [isNavOpen, setNavIsOpen] = useState(false)

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setNavIsOpen((_) => !_)
  }

  return (
    <header className="mb-16">
      <div className="flex justify-between items-center">
        <Logo />
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
      <NavDrawer isNavOpen={isNavOpen} />
    </header>
  )
}
