import { useEffect } from 'react'
import { Icon } from './Icons'
import '../styles/lightbox.css'

export default function LightboxModal({ item, onClose, onPrev, onNext, currentIndex, totalCount }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onPrev, onNext])

  if (!item) return null

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="lightbox-btn-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="close" size={20} />
        </button>

        {totalCount > 1 && (
          <>
            <button
              type="button"
              className="lightbox-nav-btn lightbox-nav-prev"
              onClick={onPrev}
              aria-label="Previous photograph"
            >
              <Icon name="chevron-left" size={22} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn lightbox-nav-next"
              onClick={onNext}
              aria-label="Next photograph"
            >
              <Icon name="chevron-right" size={22} />
            </button>
          </>
        )}

        <div className="lightbox-media-container">
          <img
            src={item.imageUrl}
            alt={`${item.title} - ${item.categoryLabel || item.category || 'Photography'} in ${item.location || 'Gujarat'} by Himanshu Sarvaiya, Vrunda Films`}
            className="lightbox-img"
          />
        </div>

        <div className="lightbox-caption-bar">
          <div>
            <div className="lightbox-tag">
              {item.categoryLabel || item.category} {item.location ? `• ${item.location}` : ''}
            </div>
            <h3 className="lightbox-title">{item.title}</h3>
          </div>
          {totalCount > 1 && (
            <div className="lightbox-counter">
              {currentIndex + 1} / {totalCount}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
