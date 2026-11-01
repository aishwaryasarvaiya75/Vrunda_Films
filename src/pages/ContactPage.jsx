import { contactConfig } from '../data/contactConfig'
import { Icon } from '../components/Icons'
import '../styles/contact.css'

export default function ContactPage({ onNavigate }) {
  const handleBookingClick = (e) => {
    if (e) e.preventDefault()
    if (typeof onNavigate === 'function') {
      onNavigate('booking')
    } else {
      window.location.hash = '#/booking'
    }
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <header className="page-hero-header">
          <span className="page-eyebrow">Connect</span>
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Every celebration starts with a conversation. Reach Himanshu Sarvaiya at Vrunda Films
            directly via phone, WhatsApp, email, or Instagram for your wedding and event photography in Rajkot, Gujarat.
          </p>
        </header>

        <div className="contact-layout-grid">
          {/* Direct Functional Channels */}
          <div className="contact-channels-list">

            {/* Phone */}
            <a
              href={`tel:${contactConfig.phoneCallable}`}
              className="contact-channel-row"
              title="Call directly"
            >
              <div>
                <div className="contact-channel-type">Direct Phone</div>
                <div className="contact-channel-detail">{contactConfig.phoneDisplay}</div>
              </div>
              <div className="contact-channel-arrow">
                <Icon name="chevron-right" size={20} />
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={contactConfig.getWhatsAppEnquiryUrl('Hello Himanshu, I would like to inquire about Vrunda Films photography services.', contactConfig.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-row"
              title="Chat on WhatsApp"
            >
              <div>
                <div className="contact-channel-type">WhatsApp</div>
                <div className="contact-channel-detail">+{contactConfig.whatsappNumber}</div>
              </div>
              <div className="contact-channel-arrow">
                <Icon name="chevron-right" size={20} />
              </div>
            </a>

            {/* Instagram */}
            <a
              href={contactConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-row"
              title="Visit Instagram Profile"
            >
              <div>
                <div className="contact-channel-type">Instagram</div>
                <div className="contact-channel-detail">@{contactConfig.instagramHandle}</div>
              </div>
              <div className="contact-channel-arrow">
                <Icon name="chevron-right" size={20} />
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${contactConfig.email}?subject=Wedding%20Inquiry%20-%20Vrunda%20Films`}
              className="contact-channel-row"
              title="Send an Email"
            >
              <div>
                <div className="contact-channel-type">Email</div>
                <div className="contact-channel-detail">{contactConfig.email}</div>
              </div>
              <div className="contact-channel-arrow">
                <Icon name="chevron-right" size={20} />
              </div>
            </a>

            {/* Facebook */}
            <a
              href={contactConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-row"
              title="Visit Facebook Profile"
            >
              <div>
                <div className="contact-channel-type">Facebook</div>
                <div className="contact-channel-detail">{contactConfig.facebookName}</div>
              </div>
              <div className="contact-channel-arrow">
                <Icon name="chevron-right" size={20} />
              </div>
            </a>
          </div>

          {/* Studio Details */}
          <div className="contact-studio-box">
            <h2 className="studio-box-heading">Studio &amp; Inquiries</h2>

            <div className="studio-info-group">
              <div className="studio-info-label">Base Location</div>
              <div className="studio-info-value">{contactConfig.location}</div>
            </div>

            <div className="studio-info-group">
              <div className="studio-info-label">Consultation Hours</div>
              <div className="studio-info-value">{contactConfig.workingHours}</div>
            </div>

            <div className="studio-info-group">
              <div className="studio-info-label">Lead Artist</div>
              <div className="studio-info-value">{contactConfig.photographerName}</div>
            </div>

            <p className="studio-quote">
              "We take on a limited number of weddings each season to guarantee
              uncompromising attention, creative direction, and prompt delivery."
            </p>

            {/* Direct Booking CTA Block */}
            <div className="studio-booking-card">
              <div className="studio-info-label">Direct Reservation</div>
              <h3 className="studio-booking-title">Reserve Your Event Dates</h3>
              <p className="studio-booking-text">
                Ready to secure your dates? Fill out our dedicated booking form for an immediate tailored quote and schedule confirmation.
              </p>
              <a
                href="#/booking"
                onClick={handleBookingClick}
                className="btn btn-solid studio-booking-btn"
              >
                <Icon name="calendar" size={15} />
                <span>Book Now Form</span>
                <Icon name="arrow-right" size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
