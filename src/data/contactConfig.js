/**
 * Contact and Studio Configuration for Vrunda Films
 * Real verified contact details for Himanshu Sarvaiya.
 */

export const contactConfig = {
  brandName: 'Vrunda Films',
  photographerName: 'Himanshu Sarvaiya',
  tagline: 'Capturing Moments, Creating Memories.',

  // Primary Phone Number
  phoneDisplay: '+91 99254 56118',
  phoneCallable: '+919925456118',

  // WhatsApp Number (International format without '+' or spaces)
  whatsappNumber: '919925456118',

  // Official Email Address
  email: 'himanshusarvaiya75@gmail.com',

  // Instagram Profile
  instagramHandle: 'himanshu_sarvaiya_vrunda_films',
  get instagramUrl() {
    return `https://instagram.com/${this.instagramHandle}`
  },

  // Facebook Profile
  facebookName: 'Himanshu Sarvaiya',
  facebookHandle: 'himanshu.sarvaiya.7',
  get facebookUrl() {
    return `https://www.facebook.com/${this.facebookHandle}`
  },

  // Studio Location & Coverage (Rajkot, Gujarat)
  city: 'Rajkot',
  state: 'Gujarat',
  location: 'Rajkot, Gujarat, India (Available across Gujarat, India & Worldwide)',
  workingHours: 'Mon - Sun: 9:00 AM – 9:00 PM',

  /**
   * Helper to generate a prefilled WhatsApp enquiry URL
   * @param {string} message 
   * @param {string} targetNumber 
   * @returns {string} wa.me URL
   */
  getWhatsAppEnquiryUrl(
    message = 'Hello Himanshu, I would like to inquire about Vrunda Films photography and cinematography services.',
    targetNumber = this.whatsappNumber
  ) {
    const encoded = encodeURIComponent(message)
    return `https://wa.me/${targetNumber}?text=${encoded}`
  },
}
