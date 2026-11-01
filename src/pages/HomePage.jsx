import himanshuPortrait from '../assets/himanshu-sarvaiya.png'
import { selectedWorksData } from '../data/portfolioData'
import { contactConfig } from '../data/contactConfig'
import { Icon } from '../components/Icons'
import '../styles/home.css'

export default function HomePage({
  onNavigate,
  onOpenLightbox,
  heroFocusStage = 'sharp',
  heroTextStage = 'visible'
}) {

  return (
    <div className="home-page-container">
      {/* 1. Two-Column Editorial Hero Section with Camera Rack Focus & Staggered Reveal */}
      <section className="home-hero-editorial">
        <div className="container">
          <div className="hero-two-column-grid">
            {/* Left Column: Brand, Tagline, Introduction, Buttons */}
            <div className={`hero-left-col hero-reveal-element ${heroTextStage === 'hidden' ? 'hero-content-hidden' : 'hero-content-revealed'}`}>
              <h1 className="hero-main-title">
                VRUNDA FILMS
              </h1>

              <div className="hero-tagline">
                "{contactConfig.tagline}"
              </div>

              <p className="hero-intro-text">
                Some moments fade with time, but the emotions behind them deserve to live forever. Led by Himanshu Sarvaiya, Vrunda Films crafts timeless wedding photography, romantic pre-weddings, and cinematic films across Gujarat and beyond.
              </p>

              <div className="hero-actions-group">
                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  className="btn btn-solid"
                >
                  Explore Portfolio
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('booking')}
                  className="btn btn-outline"
                >
                  Book an Event
                </button>
              </div>
            </div>

            {/* Right Column: Himanshu Sarvaiya Portrait with rack focus */}
            <div className="hero-right-col">
              <div className="hero-portrait-frame">
                <img
                  src={himanshuPortrait}
                  alt="Himanshu Sarvaiya - Professional Wedding Photographer and Cinematographer at Vrunda Films Gujarat"
                  className={`hero-portrait-img ${heroFocusStage === 'blur' ? 'rack-focus-blur' : 'rack-focus-sharp'}`}
                />
              </div>

              <div className="hero-portrait-caption">
                <span className="hero-portrait-name">
                  {contactConfig.photographerName}
                </span>
                <span className="hero-portrait-role">
                  Wedding Photographer &amp; Cinematographer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Selected Portfolio Images */}
      <section className="home-portfolio-preview">
        <div className="container">
          <div className="preview-header-bar">
            <div>
              <span className="page-eyebrow">Curated Moments</span>
              <h2 className="preview-header-title">Selected Works</h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="preview-view-link"
            >
              <span>View Full Portfolio</span>
              <Icon name="chevron-right" size={14} />
            </button>
          </div>

          <div className="home-preview-grid">
            {selectedWorksData.map((work) => {
              const spanClass = work.orientation === 'landscape' ? 'span-landscape' : 'span-portrait'
              const workAltText = `${work.title} - ${work.categoryLabel || work.category} Photography in ${work.location} by Himanshu Sarvaiya, Vrunda Films`
              return (
                <div
                  key={work.id}
                  className={`home-preview-item ${spanClass}`}
                  onClick={() => onOpenLightbox(work, selectedWorksData)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onOpenLightbox(work, selectedWorksData)
                    }
                  }}
                >
                  <div className="preview-media-holder">
                    <img
                      src={work.imageUrl}
                      alt={workAltText}
                      className="preview-img"
                      loading="lazy"
                      decoding="async"
                      width={work.width}
                      height={work.height}
                    />
                    <div className="preview-overlay-info">
                      <span className="preview-work-category">{work.categoryLabel || work.category}</span>
                      <h3 className="preview-work-title">{work.title}</h3>
                      <span className="preview-work-loc">{work.location}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="preview-footer-action">
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="btn btn-solid preview-all-btn"
            >
              <span>View All Photographs</span>
              <Icon name="chevron-right" size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Visual Storytelling / Expertise Section (Exactly 4 Services) */}
      <section className="home-services-minimal">
        <div className="container">
          <div className="home-services-intro-grid">
            <div className="home-services-left">
              <span className="page-eyebrow">Expertise</span>
              <h2>Visual Storytelling</h2>
              <p>
                From sacred Indian wedding traditions and 4K cinema films to fine-art
                portraits and generational keepsakes, explore our specialized offerings.
              </p>
              <div style={{ marginTop: '28px' }}>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="btn btn-bronze"
                >
                  View All Main Services
                </button>
              </div>
            </div>

            <div className="home-services-right-list">
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="home-service-row"
              >
                <span className="home-service-name">Wedding Photography</span>
                <span className="home-service-meta">Sacred Rituals &bull; Candid &bull; Stage</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="home-service-row"
              >
                <span className="home-service-name">Pre-Wedding Photography</span>
                <span className="home-service-meta">Location &bull; Concept &bull; Romance</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="home-service-row"
              >
                <span className="home-service-name">Cinematography</span>
                <span className="home-service-meta">Cinema Primes &bull; 4K Ultra HD &bull; Grading</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="home-service-row"
              >
                <span className="home-service-name">Candid Photography</span>
                <span className="home-service-meta">Unscripted Emotions &bull; Fleeting Moments</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
