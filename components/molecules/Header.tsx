import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.css'
import { useState, MouseEvent } from 'react'
import { NavDrawer } from '../molecules/NavDrawer'

export const Header = () => {
  const router = useRouter()
  const [isNavOpen, setNavIsOpen] = useState(false)

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
      <NavDrawer isNavOpen={isNavOpen} />
    </header>
  )
}
