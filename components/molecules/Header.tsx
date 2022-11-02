import { BlogTitle } from '../atoms/BlogTitle'
import { useState, MouseEvent } from 'react'
import { NavDrawer } from '../molecules/NavDrawer'
import { DarkModeSwitch } from './DarkModeSwitch'
import { HamburgerMenu } from '../atoms/HamburgerMenu'

export const Header = () => {
  const [isNavOpen, setNavIsOpen] = useState(false)

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setNavIsOpen((_) => !_)
  }

  return (
    <header className="mb-16">
      <div className="flex justify-between items-center">
        <BlogTitle />
        <div className="flex items-center gap-3 md:gap-4">
          <DarkModeSwitch />
          <HamburgerMenu isOpen={isNavOpen} handleClick={handleMenuClick} />
        </div>
      </div>
      <NavDrawer isNavOpen={isNavOpen} />
    </header>
  )
}
