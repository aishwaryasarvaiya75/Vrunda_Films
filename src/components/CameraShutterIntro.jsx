import { useState, useEffect } from 'react'
import '../styles/cameraIntro.css'

export default function CameraShutterIntro({
  onShutterOpen,
  onHeroReveal,
  onComplete
}) {
  const [isLocked, setIsLocked] = useState(false)
  const [shutterOpen, setShutterOpen] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Respect user's accessibility reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onShutterOpen) onShutterOpen()
      if (onHeroReveal) onHeroReveal()
      if (onComplete) onComplete()
      return
    }

    // Sequence Choreography - Smooth, slightly faster Photographic Pacing:
    // 1. Autofocus hunts contrast, then locks sharp at 650ms
    const tLock = setTimeout(() => {
      setIsLocked(true)
    }, 650)

    // 2. 8-Blade Aperture Diaphragm dilates and Shutter Curtains open at 1050ms
    const tShutter = setTimeout(() => {
      setShutterOpen(true)
      if (onShutterOpen) onShutterOpen()
    }, 1050)

    // 3. Hero section text and CTAs smoothly glide in at 1650ms
    const tReveal = setTimeout(() => {
      if (onHeroReveal) onHeroReveal()
    }, 1650)

    // 4. Intro overlay begins gentle dissolve at 2100ms
    const tFade = setTimeout(() => {
      setFadeOut(true)
    }, 2100)

    // 5. Complete and unmount cleanly at 2450ms
    const tComplete = setTimeout(() => {
      if (onComplete) onComplete()
    }, 2450)

    return () => {
      clearTimeout(tLock)
      clearTimeout(tShutter)
      clearTimeout(tReveal)
      clearTimeout(tFade)
      clearTimeout(tComplete)
    }
  }, [onShutterOpen, onHeroReveal, onComplete])

  return (
    <div
      className={`camera-intro-overlay ${shutterOpen ? 'shutter-open' : ''} ${fadeOut ? 'fade-out' : ''}`}
      aria-hidden="true"
    >
      {/* 1. Full-Screen Mechanical Shutter Curtains (Top & Bottom) */}
      <div className="shutter-curtain-top" />
      <div className="shutter-seam-glow" />
      <div className="shutter-curtain-bottom" />

      {/* 2. Viewfinder Rule-of-Thirds Grid Lines */}
      <div className="viewfinder-grid-lines">
        <div className="grid-line-h1" />
        <div className="grid-line-h2" />
        <div className="grid-line-v1" />
        <div className="grid-line-v2" />
      </div>

      {/* 3. Full-Screen Camera Viewfinder HUD Elements */}
      <div className="viewfinder-hud-layer">
        {/* Top Status Bar */}
        <div className="hud-top-bar">
          <div className="hud-rec-indicator">
            <span className="hud-rec-dot" />
            <span>● REC</span>
            <span style={{ opacity: 0.7, fontFeatureSettings: '"tnum"' }}>00:00:01:14</span>
          </div>

          <div className="hud-format-pill">
            <span className="hud-format-cine">VRUNDA CINE 4K</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>24.00 FPS</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>PRORES 422 HQ</span>
          </div>

          <div className="hud-battery-box">
            <span>RAW 12-BIT</span>
            <div className="hud-battery-icon">
              <span className="hud-bat-pip" />
              <span className="hud-bat-pip" />
              <span className="hud-bat-pip" />
              <span className="hud-bat-pip" />
            </div>
            <span>98%</span>
          </div>
        </div>

        {/* Framing Corner Brackets */}
        <span className="hud-corner-bracket bracket-tl" />
        <span className="hud-corner-bracket bracket-tr" />
        <span className="hud-corner-bracket bracket-bl" />
        <span className="hud-corner-bracket bracket-br" />

        {/* Bottom Status Bar */}
        <div className="hud-bottom-bar">
          <div className="hud-camera-params">
            <div className="hud-param-item">
              <span className="hud-param-label">ISO</span>
              <span className="hud-param-value">100</span>
            </div>
            <div className="hud-param-item">
              <span className="hud-param-label">SHUTTER</span>
              <span className="hud-param-value">1/250s</span>
            </div>
            <div className="hud-param-item">
              <span className="hud-param-label">IRIS</span>
              <span className="hud-param-value">f/1.2</span>
            </div>
            <div className="hud-param-item">
              <span className="hud-param-label">WB</span>
              <span className="hud-param-value">5600K</span>
            </div>
          </div>

          {/* Exposure Meter Scale */}
          <div className="hud-exposure-meter">
            <span>◀ -2</span>
            <div className="hud-meter-scale">
              <span className="hud-meter-pip" />
              <span className="hud-meter-pip" />
              <span className="hud-meter-pip" />
              <span className="hud-meter-pip center" />
              <span className="hud-meter-pip" />
              <span className="hud-meter-pip" />
              <span className="hud-meter-pip" />
            </div>
            <span>+2 ▶</span>
          </div>

          {/* Autofocus Telemetry */}
          <div className={`hud-focus-status-pill ${isLocked ? 'locked' : ''}`}>
            {isLocked ? '● AF-S [LOCKED] 50mm f/1.2' : 'AF-C [SEARCHING TARGET]'}
          </div>
        </div>
      </div>

      {/* 4. Center Optical Lens Assembly & 8-Blade Aperture Diaphragm */}
      <div className="hud-center-focus-rig">
        <div className="camera-aperture-assembly">
          {/* Engraved Outer Lens Barrel Rings */}
          <div className="camera-lens-barrel-ring" />
          <div className="camera-lens-inner-ring" />

          {/* 8-Blade Mechanical Camera Aperture Diaphragm */}
          <svg className="aperture-blades-svg" viewBox="0 0 200 200" fill="none">
            {/* 8 overlapping mechanical aperture blades */}
            <g stroke="rgba(182, 154, 104, 0.45)" strokeWidth="1.5" fill="rgba(15, 16, 22, 0.95)">
              <path d="M100 20 C140 20 180 60 180 100 L115 110 Z" />
              <path d="M180 100 C180 140 140 180 100 180 L110 115 Z" />
              <path d="M100 180 C60 180 20 140 20 100 L85 90 Z" />
              <path d="M20 100 C20 60 60 20 100 20 L90 85 Z" />
              <path d="M156 44 L90 90 L120 40 Z" />
              <path d="M156 156 L90 110 L160 120 Z" />
              <path d="M44 156 L110 110 L80 160 Z" />
              <path d="M44 44 L110 90 L40 80 Z" />
            </g>
          </svg>

          {/* Electronic Horizon Level Line */}
          <div className={`hud-level-horizon ${isLocked ? 'locked' : ''}`}>
            <span className="hud-level-tick-l" />
            <span className="hud-level-tick-r" />
          </div>

          {/* Center Autofocus Reticle Box */}
          <div className={`hud-focus-box ${isLocked ? 'locked' : ''}`}>
            <div className="hud-crosshair-center" />
          </div>
        </div>

        <div className="hud-focus-caption">
          VRUNDA FILMS
        </div>
        <div className="hud-focus-caption-sub">
          HIMANSHU SARVAIYA &bull; GUJARAT, INDIA
        </div>
      </div>
    </div>
  )
}
