import { contactConfig } from '../data/contactConfig'

/**
 * Default production domain placeholder.
 * If the user deploys to a custom domain (e.g. https://vrundafilms.com or a vercel.app domain),
 * it can be updated here or will automatically adapt to window.location.origin in the browser.
 */
export const DEFAULT_PRODUCTION_DOMAIN = 'https://vrundafilms.com'

export const getSiteUrl = () => {
  if (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')) {
    return window.location.origin
  }
  return DEFAULT_PRODUCTION_DOMAIN
}

export const pageSeoData = {
  home: {
    title: 'Vrunda Films | Himanshu Sarvaiya Photography & Cinematography',
    description:
      'Discover Vrunda Films by Himanshu Sarvaiya, offering wedding, pre-wedding, engagement, maternity, newborn, event photography, and cinematography services in Gujarat.',
    path: '',
    h1: 'VRUNDA FILMS',
    keywords: [
      'Vrunda Films',
      'Himanshu Sarvaiya Photographer',
      'Vrunda Films Photography',
      'Wedding Photographer in Gujarat',
      'Pre-Wedding Photographer in Gujarat',
      'Wedding Cinematography in Gujarat'
    ]
  },
  services: {
    title: 'Photography & Cinematography Services in Gujarat | Vrunda Films',
    description:
      'Explore specialized wedding photography, pre-wedding shoots, 4K wedding cinematography, candid captures, and heirloom custom photo albums by Himanshu Sarvaiya across Gujarat.',
    path: '#/services',
    h1: 'Photography & Cinematography Services',
    keywords: [
      'Photography and Cinematography Services',
      'Wedding Photography',
      'Pre-Wedding Photography',
      'Wedding Cinematography in Gujarat',
      'Candid Wedding Photography',
      'Professional Photo Albums'
    ]
  },
  portfolio: {
    title: 'Wedding & Pre-Wedding Photography Portfolio | Vrunda Films',
    description:
      'Browse the curated photography portfolio of Himanshu Sarvaiya. Featuring real wedding moments, romantic pre-weddings, and candid celebrations across Gujarat.',
    path: '#/portfolio',
    h1: 'Visual Stories & Portfolio',
    keywords: [
      'Vrunda Films Photography',
      'Wedding Photographer in Gujarat',
      'Pre-Wedding Photographer in Gujarat',
      'Candid Wedding Photography',
      'Gujarat Wedding Moments'
    ]
  },
  contact: {
    title: 'Contact Himanshu Sarvaiya | Vrunda Films Photography Gujarat',
    description:
      'Connect directly with Himanshu Sarvaiya for wedding photography and cinematography inquiries across Gujarat. Reach us via phone, WhatsApp, email, or studio consultation.',
    path: '#/contact',
    h1: 'Get in Touch',
    keywords: [
      'Himanshu Sarvaiya Photographer',
      'Vrunda Films',
      'Contact Wedding Photographer Gujarat',
      'Gujarat Photography Studio'
    ]
  },
  booking: {
    title: 'Book Wedding & Event Photography | Vrunda Films Gujarat',
    description:
      'Reserve your wedding, pre-wedding, or event dates with Himanshu Sarvaiya. Check date availability and request a customized photography and cinematography proposal.',
    path: '#/booking',
    h1: 'Book Your Event Photography',
    keywords: [
      'Book Wedding Photographer Gujarat',
      'Event Photography Booking',
      'Wedding Cinematography Booking',
      'Vrunda Films Booking'
    ]
  }
}

/**
 * Dynamically updates document.title, standard meta description, Open Graph tags,
 * Twitter card tags, canonical link, and JSON-LD WebPage schema upon route change.
 * @param {string} pageKey ('home', 'services', 'portfolio', 'contact', 'booking')
 */
export function updatePageMetadata(pageKey) {
  if (typeof document === 'undefined') return

  const page = pageSeoData[pageKey] || pageSeoData.home
  const siteUrl = getSiteUrl()
  const pageUrl = page.path ? `${siteUrl}/${page.path}` : `${siteUrl}/`
  const ogImageUrl = `${siteUrl}/himanshu-sarvaiya.png`

  // 1. Browser Tab Title
  document.title = page.title

  // 2. Helper to set/update meta tag
  const setMetaTag = (selectorAttr, selectorVal, content) => {
    let tag = document.querySelector(`meta[${selectorAttr}="${selectorVal}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute(selectorAttr, selectorVal)
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
  }

  // 3. Meta Description
  setMetaTag('name', 'description', page.description)

  // 4. Open Graph Tags
  setMetaTag('property', 'og:title', page.title)
  setMetaTag('property', 'og:description', page.description)
  setMetaTag('property', 'og:url', pageUrl)
  setMetaTag('property', 'og:site_name', contactConfig.brandName)
  setMetaTag('property', 'og:type', 'website')
  setMetaTag('property', 'og:image', ogImageUrl)
  setMetaTag('property', 'og:locale', 'en_IN')

  // 5. Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:title', page.title)
  setMetaTag('name', 'twitter:description', page.description)
  setMetaTag('name', 'twitter:image', ogImageUrl)

  // 6. Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', pageUrl)

  // 7. Dynamic WebPage JSON-LD
  let webpageScript = document.getElementById('seo-dynamic-webpage-jsonld')
  if (!webpageScript) {
    webpageScript = document.createElement('script')
    webpageScript.id = 'seo-dynamic-webpage-jsonld'
    webpageScript.type = 'application/ld+json'
    document.head.appendChild(webpageScript)
  }

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: pageUrl,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: contactConfig.brandName,
      url: `${siteUrl}/`
    },
    about: {
      '@type': 'ProfessionalService',
      name: contactConfig.brandName,
      founder: {
        '@type': 'Person',
        name: contactConfig.photographerName
      },
      areaServed: {
        '@type': 'State',
        name: 'Gujarat'
      }
    }
  }

  webpageScript.textContent = JSON.stringify(webpageSchema)
}
