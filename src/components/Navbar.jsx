import { useState, useEffect } from 'react'
import { Icon } from './Icons'
import '../styles/navbar.css'

export default function Navbar({ activePage, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (page) => {
    onNavigate(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className={`site-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Logo - VF Monogram */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="nav-brand-btn"
            aria-label="Vrunda Films Home"
            title="Vrunda Films"
          >
            <div className="vf-logo-badge">
              <svg width="40" height="40" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="40" height="40" rx="4" fill="#141519" stroke="rgba(182, 154, 104, 0.45)" strokeWidth="1.5" />
                <path d="M11 13.5L16.5 28.5L22 13.5" stroke="#F5F1E8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23.5 13.5H31M23.5 20H29.5M23.5 13.5V28.5" stroke="#B69A68" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {/* Navigation Links: Home | Services | Portfolio | Contact */}
          <nav>
            <ul className="nav-menu">
              <li>
                <button
                  type="button"
                  className={`nav-link-btn ${activePage === 'home' ? 'active' : ''}`}
                  onClick={() => handleNav('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-link-btn ${activePage === 'services' ? 'active' : ''}`}
                  onClick={() => handleNav('services')}
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-link-btn ${activePage === 'portfolio' ? 'active' : ''}`}
                  onClick={() => handleNav('portfolio')}
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`nav-link-btn ${activePage === 'contact' ? 'active' : ''}`}
                  onClick={() => handleNav('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Right Action: BOOK NOW */}
          <div className="nav-actions">
            <button
              type="button"
              onClick={() => handleNav('booking')}
              className="btn btn-book-nav"
            >
              Book Now
            </button>

            {/* Mobile Toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-overlay-header">
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="nav-brand-btn"
            aria-label="Vrunda Films Home"
          >
            <div className="vf-logo-badge">
              <svg width="40" height="40" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="40" height="40" rx="4" fill="#141519" stroke="rgba(182, 154, 104, 0.45)" strokeWidth="1.5" />
                <path d="M11 13.5L16.5 28.5L22 13.5" stroke="#F5F1E8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23.5 13.5H31M23.5 20H29.5M23.5 13.5V28.5" stroke="#B69A68" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <Icon name="close" size={24} />
          </button>
        </div>

        <ul className="mobile-nav-list">
          <li>
            <button
              type="button"
              className={`mobile-nav-btn ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => handleNav('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`mobile-nav-btn ${activePage === 'services' ? 'active' : ''}`}
              onClick={() => handleNav('services')}
            >
              Services
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`mobile-nav-btn ${activePage === 'portfolio' ? 'active' : ''}`}
              onClick={() => handleNav('portfolio')}
            >
              Portfolio
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`mobile-nav-btn ${activePage === 'contact' ? 'active' : ''}`}
              onClick={() => handleNav('contact')}
            >
              Contact
            </button>
          </li>
        </ul>

        <div className="mobile-cta-wrap">
          <button
            type="button"
            onClick={() => handleNav('booking')}
            className="btn btn-solid"
            style={{ width: '100%' }}
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  )
}
