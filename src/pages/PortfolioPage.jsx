import { useState } from 'react'
import { portfolioData } from '../data/portfolioData'
import '../styles/portfolio.css'

export default function PortfolioPage({ onOpenLightbox }) {
  const [activeCategory, setActiveCategory] = useState('captured-moments')

  // In 'CAPTURED MOMENTS', display all existing portfolio media together
  const displayedItems = portfolioData

  return (
    <div className="portfolio-page">
      <div className="container">
        {/* Page Header */}
        <header className="page-hero-header">
          <span className="page-eyebrow">Visual Stories</span>
          <h1 className="page-title">Portfolio</h1>
          <p className="page-subtitle">
            A curated archive of sacred wedding rituals, romantic pre-weddings, and grand
            celebrations captured in Rajkot and across Gujarat by Himanshu Sarvaiya.
          </p>
        </header>

        {/* Filter Navigation: Single 'CAPTURED MOMENTS' Filter */}
        <div className="portfolio-nav-bar">
          <button
            type="button"
            className="portfolio-cat-btn active"
            onClick={() => setActiveCategory('captured-moments')}
          >
            <span>Captured Moments</span>
          </button>
        </div>

        {/* Natural Aspect-Ratio-Preserving Gallery */}
        <div className="portfolio-gallery-masonry">
          {displayedItems.map((item) => {
            const itemAltText = `${item.title} - ${item.categoryLabel} Photography in ${item.location} by Himanshu Sarvaiya, Vrunda Films Rajkot`
            return (
              <div
                key={item.id}
                className={`portfolio-card orientation-${item.orientation}`}
                onClick={() => onOpenLightbox && onOpenLightbox(item, displayedItems)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onOpenLightbox && onOpenLightbox(item, displayedItems)
                  }
                }}
              >
                <div className="portfolio-card-media">
                  <img
                    src={item.imageUrl}
                    alt={itemAltText}
                    className="portfolio-card-img"
                    loading="lazy"
                    decoding="async"
                    width={item.width}
                    height={item.height}
                  />

                <div className="portfolio-card-overlay">
                  <span className="portfolio-card-tag">{item.categoryLabel}</span>
                  <h3 className="portfolio-card-title">{item.title}</h3>
                  <span className="portfolio-card-loc">{item.location}</span>
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}
