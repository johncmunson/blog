import { useDarkModeCtx } from '../../context/darkMode'
import Image from 'next/image'
import styles from './DarkModeSwitch.module.css'

export const DarkModeSwitch = () => {
  const { isDarkMode, toggle } = useDarkModeCtx()

  const classes =
    styles['react-toggle'] +
    (isDarkMode ? ` ${styles['react-toggle--checked']}` : '')

  return (
    <div className={classes} onClick={toggle}>
      <div className={`${styles['react-toggle-track']} dark:bg-neutral-700`}>
        <div className={styles['react-toggle-track-check']}>
          <Image
            src="/moon.png"
            alt="moon icon"
            width="16"
            height="16"
            role="presentation"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        <div className={styles['react-toggle-track-x']}>
          <Image
            src="/sun.png"
            alt="sun icon"
            width="16"
            height="16"
            role="presentation"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>
      <div className={styles['react-toggle-thumb']} />
      <input
        className={styles['react-toggle-screenreader-only']}
        type="checkbox"
        aria-label="Switch between Dark and Light mode"
      />
    </div>
  )
}
