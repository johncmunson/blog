import { NavContent } from '../atoms/NavContent'
import { NAV_MARGIN_TOP } from '../../lib/constants'

export const Nav = () => (
  <nav className={`mt-${NAV_MARGIN_TOP}`}>
    <NavContent />
  </nav>
)
