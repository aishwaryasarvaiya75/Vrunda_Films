import { photographyServices, albumServices, filmServices } from '../data/servicesData'
import { Icon } from '../components/Icons'
import '../styles/services.css'

export default function ServicesPage({ onSelectService }) {
  return (
    <div className="services-page">
      {/* Page Header */}
      <div className="container">
        <header className="page-hero-header">
          <span className="page-eyebrow">Disciplines &amp; Craft</span>
          <h1 className="page-title">Photography &amp; Cinematography Services</h1>
          <p className="page-subtitle">
            From multi-day royal wedding ceremonies to cinema-grade teaser films
            and handcrafted custom photo albums, explore our complete visual offerings by Himanshu Sarvaiya in Rajkot and across Gujarat.
          </p>
        </header>

        {/* 1. PHOTOGRAPHY SERVICES */}
        <section className="services-group-wrapper">
          <div className="services-group-header">
            <h2 className="services-group-title">Photography</h2>
            <span className="services-group-count">Specialized Disciplines</span>
          </div>

          <div className="services-editorial-list">
            {photographyServices.map((svc, i) => {
              const idxStr = i < 9 ? `0${i + 1}` : `${i + 1}`
              return (
                <div key={svc.id} className="service-editorial-row">
                  <span className="service-row-idx">{idxStr}</span>

                  <div className="service-row-main">
                    <span className="service-row-name">{svc.title}</span>
                    <span className="service-row-tag">{svc.tag}</span>
                  </div>

                  <p className="service-row-summary">{svc.summary}</p>

                  <div className="service-row-action">
                    <button
                      type="button"
                      onClick={() => onSelectService(svc.title)}
                      className="btn-inquire-link"
                    >
                      <span>Inquire</span>
                      <Icon name="chevron-right" size={12} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 2. ALBUMS */}
        <section className="services-group-wrapper">
          <div className="services-group-header">
            <h2 className="services-group-title">Albums</h2>
            <span className="services-group-count">Custom Heirloom Editions</span>
          </div>

          <div className="services-editorial-list">
            {albumServices.map((svc, i) => {
              const idxStr = i < 9 ? `0${i + 1}` : `${i + 1}`
              return (
                <div key={svc.id} className="service-editorial-row">
                  <span className="service-row-idx">{idxStr}</span>

                  <div className="service-row-main">
                    <span className="service-row-name">{svc.title}</span>
                    <span className="service-row-tag">{svc.tag}</span>
                  </div>

                  <p className="service-row-summary">{svc.summary}</p>

                  <div className="service-row-action">
                    <button
                      type="button"
                      onClick={() => onSelectService(svc.title)}
                      className="btn-inquire-link"
                    >
                      <span>Inquire</span>
                      <Icon name="chevron-right" size={12} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 3. FILMS & VIDEOGRAPHY */}
        <section className="services-group-wrapper">
          <div className="services-group-header">
            <h2 className="services-group-title">Films &amp; Videography</h2>
            <span className="services-group-count">Cinematic Formats</span>
          </div>

          <div className="services-editorial-list">
            {filmServices.map((svc, i) => {
              const idxStr = i < 9 ? `0${i + 1}` : `${i + 1}`
              return (
                <div key={svc.id} className="service-editorial-row">
                  <span className="service-row-idx">{idxStr}</span>

                  <div className="service-row-main">
                    <span className="service-row-name">{svc.title}</span>
                    <span className="service-row-tag">{svc.tag}</span>
                  </div>

                  <p className="service-row-summary">{svc.summary}</p>

                  <div className="service-row-action">
                    <button
                      type="button"
                      onClick={() => onSelectService(svc.title)}
                      className="btn-inquire-link"
                    >
                      <span>Inquire</span>
                      <Icon name="chevron-right" size={12} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
