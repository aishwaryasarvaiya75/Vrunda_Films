import { contactConfig } from '../data/contactConfig'
import { Icon } from './Icons'
import '../styles/footer.css'

export default function Footer({ onNavigate, onReplayIntro }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNav = (page) => {
    onNavigate(page)
    scrollToTop()
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Info */}
          <div>
            <h3 className="footer-brand-title">VRUNDA FILMS</h3>
            <div className="footer-brand-tagline">"{contactConfig.tagline}"</div>
            <p className="footer-brand-desc">
              Cinematic wedding films and fine-art photography directed by Himanshu Sarvaiya.
              Preserving sacred moments with honesty and grace.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNav('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNav('services')}
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNav('portfolio')}
                >
                  Portfolio Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNav('contact')}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => handleNav('booking')}
                >
                  Book Your Event
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <div className="footer-col-title">Direct Inquiries</div>
            <div className="footer-contact-text">
              <div>Phone: <a href={`tel:${contactConfig.phoneCallable}`}>{contactConfig.phoneDisplay}</a></div>
              <div>WhatsApp: <a href={contactConfig.getWhatsAppEnquiryUrl()} target="_blank" rel="noopener noreferrer">+{contactConfig.whatsappNumber}</a></div>
              <div>Instagram: <a href={contactConfig.instagramUrl} target="_blank" rel="noopener noreferrer">@{contactConfig.instagramHandle}</a></div>
              <div>Facebook: <a href={contactConfig.facebookUrl} target="_blank" rel="noopener noreferrer">{contactConfig.facebookName}</a></div>
              <div>Email: <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a></div>
              <div style={{ marginTop: '8px', color: 'var(--text-muted)' }}>{contactConfig.location}</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {new Date().getFullYear()} Vrunda Films &bull; Himanshu Sarvaiya. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {onReplayIntro && (
              <button
                type="button"
                className="footer-back-top-btn"
                onClick={onReplayIntro}
                title="Preview full-screen camera shutter opening intro"
              >
                <span>⟳ Replay Shutter Intro</span>
              </button>
            )}

            <button
              type="button"
              className="footer-back-top-btn"
              onClick={scrollToTop}
            >
              <span>Back to top</span>
              <Icon name="arrow-up" size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
