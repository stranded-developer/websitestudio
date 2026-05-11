import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">website<span>studio</span>.id</div>
      <div className="footer-copy">© 2025 websitestudio.id · All rights reserved · Jakarta, Indonesia</div>
      <nav className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/work">Work</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </footer>
  )
}
