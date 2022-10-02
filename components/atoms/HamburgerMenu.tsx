import styles from './HamburgerMenu.module.css'
import { MouseEvent } from 'react'

type HamburgerMenuProps = {
  isOpen: boolean
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const HamburgerMenu = ({ isOpen, handleClick }: HamburgerMenuProps) => {
  return (
    <button
      role="button"
      title="Menu"
      value="Menu"
      className={styles.hamburgerMenuButton}
      onClick={handleClick}
    >
      <i
        className={`
          ${
            isOpen
              ? styles.hamburgerMenuLine1Open
              : styles.hamburgerMenuLine1Closed
          } dark:bg-white
        `}
      ></i>
      <i
        className={`
          ${
            isOpen
              ? styles.hamburgerMenuLine2Open
              : styles.hamburgerMenuLine2Closed
          } dark:bg-white
        `}
      ></i>
    </button>
  )
}
