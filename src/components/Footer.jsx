import { Link } from 'react-router-dom'
import { useLang } from './LangContext.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer>
      <div className="footer-logo">website<span>studio</span>.id</div>
      <div className="footer-copy">{t.footer.copy}</div>
      <nav className="footer-links">
        <Link to="/">{t.nav.home}</Link>
        <Link to="/work">{t.nav.work}</Link>
        <Link to="/pricing">{t.nav.pricing}</Link>
        <Link to="/contact">{t.nav.contact}</Link>
      </nav>
    </footer>
  )
}
