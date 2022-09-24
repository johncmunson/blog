import { NavContent } from '../atoms/NavContent'
import { NAV_MT } from '../../lib/constants'

export const Nav = () => (
  <nav className={`${NAV_MT}`}>
    <NavContent />
  </nav>
)
