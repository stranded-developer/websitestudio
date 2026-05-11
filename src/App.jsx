import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './components/LangContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WaFloat from './components/WaFloat.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Pricing from './pages/Pricing.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{
          position: 'fixed',
          top: 'calc(96px + env(safe-area-inset-top))',
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'scroll',
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorY: 'none',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
        <WaFloat />
      </BrowserRouter>
    </LangProvider>
  )
}