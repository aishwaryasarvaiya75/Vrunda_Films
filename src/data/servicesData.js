/**
 * Complete directory of all 15 Photography, Albums, and Films & Videography services
 * for Vrunda Films by Himanshu Sarvaiya.
 */

export const photographyServices = [
  {
    id: 'wedding-photography',
    title: 'Wedding Photography',
    tag: 'Ceremonial & Ritual',
    summary: 'Comprehensive multi-day wedding coverage honoring sacred traditions, emotional vows, and family bonds.'
  },
  {
    id: 'engagement-photography',
    title: 'Engagement Photography',
    tag: 'Rings & Promises',
    summary: 'Capturing the intimacy, ring exchange, and joyous celebrations of your official union.'
  },
  {
    id: 'pre-wedding-photography',
    title: 'Pre-Wedding Photography',
    tag: 'Couples & Destination',
    summary: 'Artistic couple portraiture set against picturesque landscapes, heritage architecture, and scenic vistas.'
  },
  {
    id: 'maternity-photography',
    title: 'Maternity Photography',
    tag: 'Grace & Motherhood',
    summary: 'Artistic silhouettes and serene compositions celebrating the divine journey and beauty of new motherhood.'
  },
  {
    id: 'newborn-photography',
    title: 'Newborn Photography',
    tag: 'Gentle & Delicate',
    summary: 'Comfort-focused, baby-safe sessions capturing the purest smiles and delicate early days of your little one.'
  },
  {
    id: 'birthday-photography',
    title: 'Birthday Photography',
    tag: 'Milestones & Joy',
    summary: 'Vibrant and festive documentation of milestone birthdays, joyful cake cuttings, and laughter with loved ones.'
  },
  {
    id: 'family-photography',
    title: 'Family Photography',
    tag: 'Generational Heirlooms',
    summary: 'Warm, timeless portraiture preserving generational togetherness, heritage, and genuine family connection.'
  },
  {
    id: 'portrait-photography',
    title: 'Portrait Photography',
    tag: 'Fine Art Studio',
    summary: 'Sculpted lighting and poise capturing distinctive character, elegance, depth, and individuality.'
  },
  {
    id: 'candid-photography',
    title: 'Candid Photography',
    tag: 'Unscripted Emotions',
    summary: 'Raw, unposed emotions, heartfelt tears, spontaneous smiles, and authentic fleeting glances.'
  },
  {
    id: 'all-event-photography',
    title: 'All Event Photography',
    tag: 'Grand Celebrations',
    summary: 'Comprehensive dynamic coverage of cultural festivities, private galas, anniversaries, and community gatherings.'
  },
  {
    id: 'commercial-product-photography',
    title: 'Commercial & Product Photography',
    tag: 'Brands & Architecture',
    summary: 'High-precision, color-calibrated imagery showcasing brand products, commercial interiors, and corporate identities.'
  }
]

export const albumServices = [
  {
    id: 'custom-photo-albums',
    title: 'Custom Photo Albums',
    tag: 'Handcrafted Heirlooms',
    summary: 'Luxurious lay-flat flush-mount photo albums bound in Italian leather, premium silks, and personalized typography.'
  }
]

export const filmServices = [
  {
    id: 'wedding-cinematography',
    title: 'Wedding Cinematography',
    tag: 'Cinema Primes & 4K',
    summary: 'Immersive narrative 4K cinema films with poetic color grading, atmospheric audio, and documentary flow.'
  },
  {
    id: 'traditional-videography',
    title: 'Traditional Videography',
    tag: 'Full Archival Coverage',
    summary: 'Continuous, chronological high-definition recording ensuring every sacred ritual and guest greeting is preserved.'
  },
  {
    id: 'wedding-teasers',
    title: 'Wedding Teasers',
    tag: 'Trailers & Social Reels',
    summary: 'High-energy 60 to 90-second cinematic highlight trailers crafted for social sharing and unforgettable impressions.'
  }
]

// Backward-compatibility alias
export const filmAndAdditionalServices = [
  ...albumServices,
  ...filmServices
]

// All 15 services combined for booking form selection
export const allServicesList = [
  ...photographyServices,
  ...albumServices,
  ...filmServices
]
