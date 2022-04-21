import { NavContent } from '../atoms/NavContent'
import { navMarginTop } from '../../utils/constants'

export const Nav = () => (
  <nav className={`mt-${navMarginTop}`}>
    <NavContent />
  </nav>
)
