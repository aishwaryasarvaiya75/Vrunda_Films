import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LightboxModal from './components/LightboxModal'
import CameraShutterIntro from './components/CameraShutterIntro'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import BookingPage from './pages/BookingPage'
import { updatePageMetadata } from './utils/seoConfig'

const getPageFromHash = () => {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase()
  if (['services', 'portfolio', 'contact', 'booking'].includes(hash)) {
    return hash
  }
  return 'home'
}

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash)
  const [preselectedService, setPreselectedService] = useState('')
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    activeItem: null,
    itemsList: [],
    currentIndex: 0
  })

  // Full-screen cinematic camera viewfinder & mechanical shutter intro
  const [introActive, setIntroActive] = useState(() => {
    if (typeof window === 'undefined') return false
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('intro') === '1' || urlParams.get('shutter') === '1') return true
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return false
    return sessionStorage.getItem('vrunda_shutter_intro_done') !== 'true'
  })

  const [heroFocusStage, setHeroFocusStage] = useState(() => (introActive ? 'blur' : 'sharp'))
  const [heroTextStage, setHeroTextStage] = useState(() => (introActive ? 'hidden' : 'visible'))

  const handleShutterOpen = () => {
    setHeroFocusStage('sharp')
  }

  const handleHeroReveal = () => {
    setHeroTextStage('visible')
  }

  const handleIntroComplete = () => {
    setIntroActive(false)
    sessionStorage.setItem('vrunda_shutter_intro_done', 'true')
  }

  const handleReplayIntro = () => {
    sessionStorage.removeItem('vrunda_shutter_intro_done')
    setHeroFocusStage('blur')
    setHeroTextStage('hidden')
    setIntroActive(true)
    navigateTo('home')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Synchronize with URL hash for seamless browser navigation (back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash()
      setActivePage(page)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Synchronize document title, meta descriptions, Open Graph & schema on page changes
  useEffect(() => {
    updatePageMetadata(activePage)
  }, [activePage])

  const navigateTo = (page, serviceToPreselect = '') => {
    setActivePage(page)
    if (serviceToPreselect) {
      setPreselectedService(serviceToPreselect)
    }
    const targetHash = page === 'home' ? '' : `#/${page}`
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash || window.location.pathname)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectServiceFromList = (serviceTitle) => {
    navigateTo('booking', serviceTitle)
  }

  // Lightbox handlers
  const handleOpenLightbox = (item, itemsList = []) => {
    const list = itemsList.length > 0 ? itemsList : [item]
    const idx = list.findIndex((x) => x.id === item.id)
    setLightboxState({
      isOpen: true,
      activeItem: item,
      itemsList: list,
      currentIndex: idx >= 0 ? idx : 0
    })
  }

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false, activeItem: null }))
  }

  const handlePrevLightbox = () => {
    setLightboxState((prev) => {
      const newIdx = prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.itemsList.length - 1
      return {
        ...prev,
        currentIndex: newIdx,
        activeItem: prev.itemsList[newIdx]
      }
    })
  }

  const handleNextLightbox = () => {
    setLightboxState((prev) => {
      const newIdx = prev.currentIndex < prev.itemsList.length - 1 ? prev.currentIndex + 1 : 0
      return {
        ...prev,
        currentIndex: newIdx,
        activeItem: prev.itemsList[newIdx]
      }
    })
  }

  return (
    <div className="vrunda-site-wrapper">
      {/* 0. Full-Screen Cinematic Camera Viewfinder & Mechanical Shutter Intro */}
      {introActive && (
        <CameraShutterIntro
          onShutterOpen={handleShutterOpen}
          onHeroReveal={handleHeroReveal}
          onComplete={handleIntroComplete}
        />
      )}

      {/* 1. Minimal Refined Navbar */}
      <Navbar activePage={activePage} onNavigate={navigateTo} />

      {/* 2. Main Page Views */}
      <main className="vrunda-main-content">
        {activePage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenLightbox={handleOpenLightbox}
            heroFocusStage={heroFocusStage}
            heroTextStage={heroTextStage}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onSelectService={handleSelectServiceFromList}
          />
        )}

        {activePage === 'portfolio' && (
          <PortfolioPage
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}

        {activePage === 'booking' && (
          <BookingPage
            initialService={preselectedService}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* 3. Minimal Refined Footer */}
      <Footer onNavigate={navigateTo} onReplayIntro={handleReplayIntro} />

      {/* 4. Full-Screen Accessible Lightbox Modal */}
      {lightboxState.isOpen && lightboxState.activeItem && (
        <LightboxModal
          item={lightboxState.activeItem}
          currentIndex={lightboxState.currentIndex}
          totalCount={lightboxState.itemsList.length}
          onClose={handleCloseLightbox}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
        />
      )}
    </div>
  )
}
