import { useState } from 'react'
import { photographyServices, albumServices, filmServices } from '../data/servicesData'
import { contactConfig } from '../data/contactConfig'
import { Icon } from '../components/Icons'
import '../styles/booking.css'

const eventTypeOptions = [
  'Wedding Ceremony & Reception',
  'Engagement Ceremony (Sagai / Ring Ceremony)',
  'Pre-Wedding Photoshoot',
  'Sangeet, Mehendi & Haldi Ceremonies',
  'Mandap Muhurat & Ganesh Sthapana',
  'Maternity Photoshoot',
  'Newborn & Baby Photoshoot',
  'Birthday Celebration (Milestone / Kids)',
  'Family Gathering & Anniversary',
  'Portrait & Fashion Portfolio Session',
  'Candid Moments & Intimate Gatherings',
  'All Event / Social & Cultural Function',
  'Commercial & Product Photography Shoot',
  'Traditional Videography & Archival',
  'Cinematography & Teaser Film Project',
  'Custom Photo Album Design & Print',
  'Other Special Celebration'
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzeejdrl'

const getTodayDateString = () => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default function BookingPage({ initialService, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    services: initialService ? [initialService] : [],
    requirements: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submittedSummary, setSubmittedSummary] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (submitError) {
      setSubmitError(null)
    }
  }

  const toggleService = (title) => {
    setFormData((prev) => {
      const exists = prev.services.includes(title)
      const updated = exists
        ? prev.services.filter((s) => s !== title)
        : [...prev.services, title]
      return { ...prev, services: updated }
    })
  }

  const validate = () => {
    const errs = {}
    const todayStr = getTodayDateString()

    if (!formData.name.trim()) errs.name = 'Full name is required'
    if (!formData.phone.trim()) {
      errs.phone = 'Contact number is required'
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number'
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Invalid email format'
    }
    if (!formData.eventType) errs.eventType = 'Please select your event type'
    if (!formData.eventDate) {
      errs.eventDate = 'Event date is required'
    } else if (formData.eventDate < todayStr) {
      errs.eventDate = 'Event date cannot be in the past'
    }
    if (!formData.eventLocation.trim()) errs.eventLocation = 'City or venue location is required'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    setSubmitError(null)

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime.trim() || 'Flexible / TBD',
        eventLocation: formData.eventLocation.trim(),
        selectedServices: formData.services.length > 0 ? formData.services.join(', ') : 'None specified',
        additionalMessage: formData.requirements.trim() || 'None',
        message: formData.requirements.trim() || 'No additional notes provided.',
        _subject: `New Booking Inquiry from ${formData.name.trim()} (${formData.eventType})`
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setSubmittedSummary({ ...formData })
        setSubmitted(true)
        window.scrollTo({ top: 100, behavior: 'smooth' })
      } else {
        let errorMsg = 'Failed to submit booking inquiry. Please check your details and try again.'
        try {
          const data = await response.json()
          if (data && data.errors && data.errors.length > 0) {
            errorMsg = data.errors.map((err) => err.message).join(', ')
          } else if (data && data.error) {
            errorMsg = data.error
          }
        } catch {
          // Non-JSON response
        }
        setSubmitError(errorMsg)
      }
    } catch {
      setSubmitError('Network error: Unable to reach the booking server. Please check your internet connection or reach out via WhatsApp/Phone.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      services: [],
      requirements: ''
    })
    setSubmitted(false)
    setSubmittedSummary(null)
    setErrors({})
    setSubmitError(null)
  }

  const constructWhatsAppForward = () => {
    if (!submittedSummary) return ''
    const servicesText = submittedSummary.services.length > 0
      ? submittedSummary.services.join(', ')
      : 'General Inquiry'

    const message = `*Vrunda Films - Booking Inquiry*\n\n` +
      `*Name:* ${submittedSummary.name}\n` +
      `*Phone:* ${submittedSummary.phone}\n` +
      `*Email:* ${submittedSummary.email}\n` +
      `*Event:* ${submittedSummary.eventType}\n` +
      `*Date:* ${submittedSummary.eventDate}\n` +
      `*Time:* ${submittedSummary.eventTime || 'Flexible / TBD'}\n` +
      `*Location:* ${submittedSummary.eventLocation}\n` +
      `*Services:* ${servicesText}\n` +
      `*Notes:* ${submittedSummary.requirements || 'None'}`

    return contactConfig.getWhatsAppEnquiryUrl(message)
  }

  return (
    <div className="booking-page">
      <div className="container">
        {/* Page Header */}
        <header className="page-hero-header">
          <span className="page-eyebrow">Reservations</span>
          <h1 className="page-title">Book Your Event Photography</h1>
          <p className="page-subtitle">
            Dates for prime wedding seasons in Rajkot and across Gujarat fill months in advance. Share your celebration
            details to check Himanshu Sarvaiya's availability and receive a customized photography quote.
          </p>
        </header>

        <div className="booking-form-wrap">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="editorial-booking-form" noValidate>
              {/* Row 1: Name, Phone, Email */}
              <div className="form-row-grid-3">
                <div className="form-field-group">
                  <label htmlFor="nameInput" className="form-field-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    id="nameInput"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Anand Sharma"
                    className={`form-field-input ${errors.name ? 'has-err' : ''}`}
                  />
                  {errors.name && <span className="form-field-err">{errors.name}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="phoneInput" className="form-field-label">
                    Phone Number <span className="req">*</span>
                  </label>
                  <input
                    id="phoneInput"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98250 12345"
                    className={`form-field-input ${errors.phone ? 'has-err' : ''}`}
                  />
                  {errors.phone && <span className="form-field-err">{errors.phone}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="emailInput" className="form-field-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="emailInput"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. anand@example.com"
                    className={`form-field-input ${errors.email ? 'has-err' : ''}`}
                  />
                  {errors.email && <span className="form-field-err">{errors.email}</span>}
                </div>
              </div>

              {/* Row 2: Event Type, Event Date, Event Time */}
              <div className="form-row-grid-3">
                <div className="form-field-group">
                  <label htmlFor="eventTypeSelect" className="form-field-label">
                    Event Type <span className="req">*</span>
                  </label>
                  <select
                    id="eventTypeSelect"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className={`form-field-select ${errors.eventType ? 'has-err' : ''}`}
                  >
                    <option value="">Select Event Type</option>
                    {eventTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && <span className="form-field-err">{errors.eventType}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="dateInput" className="form-field-label">
                    Event Date <span className="req">*</span>
                  </label>
                  <input
                    id="dateInput"
                    type="date"
                    name="eventDate"
                    min={getTodayDateString()}
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className={`form-field-input ${errors.eventDate ? 'has-err' : ''}`}
                  />
                  {errors.eventDate && <span className="form-field-err">{errors.eventDate}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="timeInput" className="form-field-label">
                    Event Time / Muhurat
                  </label>
                  <input
                    id="timeInput"
                    type="text"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    placeholder="e.g. Evening Reception (7 PM)"
                    className="form-field-input"
                  />
                </div>
              </div>

              {/* Row 3: Event Location */}
              <div className="form-field-group">
                <label htmlFor="locationInput" className="form-field-label">
                  Event Location &amp; Venue <span className="req">*</span>
                </label>
                <input
                  id="locationInput"
                  type="text"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleInputChange}
                  placeholder="e.g. Radhe Upavan Resort, Ahmedabad, Gujarat"
                  className={`form-field-input ${errors.eventLocation ? 'has-err' : ''}`}
                />
                {errors.eventLocation && (
                  <span className="form-field-err">{errors.eventLocation}</span>
                )}
              </div>

              {/* Row 4: Required Services Multi-Select */}
              <div className="form-field-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <label className="form-field-label" style={{ marginBottom: 0 }}>
                    Required Services (Tap to Select)
                  </label>
                  {formData.services.length > 0 && (
                    <span style={{ fontSize: '11px', color: 'var(--accent-bronze)', letterSpacing: '1px' }}>
                      {formData.services.length} selected
                    </span>
                  )}
                </div>

                <div className="services-category-group">
                  <div className="services-group-sublabel">Photography</div>
                  <div className="services-pills-wrap">
                    {photographyServices.map((svc) => {
                      const isSelected = formData.services.includes(svc.title)
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          className={`service-pill-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleService(svc.title)}
                        >
                          {isSelected ? `✓ ${svc.title}` : `+ ${svc.title}`}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="services-category-group">
                  <div className="services-group-sublabel">Albums</div>
                  <div className="services-pills-wrap">
                    {albumServices.map((svc) => {
                      const isSelected = formData.services.includes(svc.title)
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          className={`service-pill-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleService(svc.title)}
                        >
                          {isSelected ? `✓ ${svc.title}` : `+ ${svc.title}`}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="services-category-group">
                  <div className="services-group-sublabel">Films &amp; Videography</div>
                  <div className="services-pills-wrap">
                    {filmServices.map((svc) => {
                      const isSelected = formData.services.includes(svc.title)
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          className={`service-pill-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleService(svc.title)}
                        >
                          {isSelected ? `✓ ${svc.title}` : `+ ${svc.title}`}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Row 5: Additional Requirements */}
              <div className="form-field-group">
                <label htmlFor="reqTextarea" className="form-field-label">
                  Additional Requirements &amp; Notes
                </label>
                <textarea
                  id="reqTextarea"
                  name="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Tell us about expected guest count, specific family rituals, or destination wishes..."
                  className="form-field-textarea"
                />
              </div>

              {/* Submission Error Alert */}
              {submitError && (
                <div className="form-submit-error" role="alert">
                  <span className="submit-error-icon">⚠️</span>
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit Action */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-solid btn-form-submit"
                >
                  {isSubmitting ? 'Sending Booking Request...' : 'Submit Booking Request'}
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation View */
            <div className="booking-mock-success">
              <h2 className="success-heading">Request Submitted Successfully</h2>
              <p className="success-lead-text">
                Thank you, <strong>{submittedSummary.name}</strong>. Your reservation inquiry has been
                received. To confirm date availability immediately with Himanshu Sarvaiya, you can also
                forward your request directly on WhatsApp below.
              </p>

              <div className="success-summary-grid">
                <div>
                  <div className="summary-item-label">Client Name</div>
                  <div className="summary-item-val">{submittedSummary.name}</div>
                </div>
                <div>
                  <div className="summary-item-label">Contact</div>
                  <div className="summary-item-val">{submittedSummary.phone} &bull; {submittedSummary.email}</div>
                </div>
                <div>
                  <div className="summary-item-label">Event Details</div>
                  <div className="summary-item-val">
                    {submittedSummary.eventType} on {submittedSummary.eventDate}
                  </div>
                </div>
                <div>
                  <div className="summary-item-label">Location</div>
                  <div className="summary-item-val">{submittedSummary.eventLocation}</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div className="summary-item-label">Services Selected</div>
                  <div className="summary-item-val">
                    {submittedSummary.services.length > 0
                      ? submittedSummary.services.join(', ')
                      : 'None specified'}
                  </div>
                </div>
              </div>

              <div className="success-actions-wrap">
                <a
                  href={constructWhatsAppForward()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                >
                  <Icon name="whatsapp" size={16} /> Send via WhatsApp to Himanshu
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-outline"
                >
                  Submit Another Inquiry
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="btn btn-bronze"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
