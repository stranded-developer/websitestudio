import { Link } from 'react-router-dom'
import { useLang } from './LangContext.jsx'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer>
      <div className="footer-logo">website<span>studio</span>.id</div>
      <div className="footer-copy">
  {t.footer.line1}<br />{t.footer.line2}
</div>
      
    </footer>
  )
}
