import { contactConfig } from '../data/contactConfig'

/**
 * Production domain for Vrunda Films live on Vercel.
 */
export const DEFAULT_PRODUCTION_DOMAIN = 'https://vrunda-films.vercel.app'

export const getSiteUrl = () => {
  if (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')) {
    return window.location.origin
  }
  return DEFAULT_PRODUCTION_DOMAIN
}

export const pageSeoData = {
  home: {
    title: 'Vrunda Films | Himanshu Sarvaiya - Wedding Photographer in Rajkot',
    description:
      'Vrunda Films by Himanshu Sarvaiya, leading wedding photographer and cinematographer in Rajkot, Gujarat. Specializing in royal weddings, pre-weddings, candid photography, and 4K cinematic films.',
    path: '',
    h1: 'VRUNDA FILMS',
    keywords: [
      'Vrunda Films',
      'Himanshu Sarvaiya',
      'Himanshu Sarvaiya Photographer',
      'Photographer in Rajkot',
      'Wedding Photographer in Rajkot',
      'Cinematographer in Rajkot',
      'Wedding Photography in Rajkot'
    ]
  },
  services: {
    title: 'Wedding Photography & Cinematography in Rajkot | Vrunda Films',
    description:
      'Explore premier photography and cinematography services in Rajkot by Himanshu Sarvaiya. Offering royal wedding coverage, pre-wedding shoots, candid captures, 4K teaser films, and custom albums across Gujarat.',
    path: '#/services',
    h1: 'Photography & Cinematography Services',
    keywords: [
      'Wedding Photography in Rajkot',
      'Cinematographer in Rajkot',
      'Wedding Photographer in Rajkot',
      'Pre-Wedding Photography Rajkot',
      'Candid Photography Rajkot',
      'Vrunda Films'
    ]
  },
  portfolio: {
    title: 'Wedding & Pre-Wedding Photography Portfolio | Vrunda Films Rajkot',
    description:
      'Explore wedding and pre-wedding photography by Himanshu Sarvaiya in Rajkot and across Gujarat. View real candid moments, royal bridal portraits, and romantic stories.',
    path: '#/portfolio',
    h1: 'Visual Stories & Portfolio',
    keywords: [
      'Photographer in Rajkot',
      'Wedding Photographer in Rajkot',
      'Pre-Wedding Photography Rajkot',
      'Vrunda Films Portfolio',
      'Candid Wedding Photography Gujarat'
    ]
  },
  contact: {
    title: 'Contact Himanshu Sarvaiya | Wedding Photographer in Rajkot',
    description:
      'Get in touch with Himanshu Sarvaiya at Vrunda Films for wedding photography and cinematography inquiries in Rajkot, Gujarat. Available via phone, WhatsApp, and email.',
    path: '#/contact',
    h1: 'Get in Touch',
    keywords: [
      'Contact Photographer in Rajkot',
      'Himanshu Sarvaiya',
      'Himanshu Sarvaiya Photographer',
      'Vrunda Films Rajkot',
      'Wedding Photographer Rajkot Contact'
    ]
  },
  booking: {
    title: 'Book Wedding Photographer in Rajkot | Vrunda Films',
    description:
      'Book your wedding photography, pre-wedding shoot, or cinematography session with Himanshu Sarvaiya in Rajkot, Gujarat. Check date availability and request a custom quote.',
    path: '#/booking',
    h1: 'Book Your Event Photography',
    keywords: [
      'Book Wedding Photographer in Rajkot',
      'Wedding Photography Booking Rajkot',
      'Vrunda Films Booking',
      'Himanshu Sarvaiya Photographer'
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

  // 6. Canonical Link (in hash-routed SPAs, canonical points to base indexable URL)
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', `${siteUrl}/`)

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
      areaServed: [
        {
          '@type': 'City',
          name: 'Rajkot'
        },
        {
          '@type': 'State',
          name: 'Gujarat'
        }
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rajkot',
        addressRegion: 'Gujarat',
        addressCountry: 'IN'
      }
    }
  }

  webpageScript.textContent = JSON.stringify(webpageSchema)
}
