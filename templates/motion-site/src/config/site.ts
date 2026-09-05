import type { SiteConfig } from '../types/site'

export const siteConfig: SiteConfig = {
  title: 'Lumen Atelier',
  tagline: 'Quiet luxury interiors shaped by light',
  colors: {
    background: '#14110F',
    foreground: '#F6EDE0',
    primary: '#C6A15B',
    secondary: '#8C6A3B',
    accent: '#E8D5B5',
    muted: '#2C241C',
  },
  nav: [
    { label: 'Home', href: '#hero' },
    { label: 'Story', href: '#about' },
    { label: 'Craft', href: '#features' },
    { label: 'Work', href: '#gallery' },
    { label: 'Stories', href: '#stories' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Interior atelier',
    headline: 'Rooms that hold the evening light',
    subheadline:
      'We compose residences and hospitality spaces where material, shadow, and proportion feel inevitable.',
    primaryCta: { label: 'View the work', href: '#gallery' },
    secondaryCta: { label: 'Begin a project', href: '#contact' },
    image: {
      src: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Desert boulders in golden hour light',
      photographer: 'Joey Farina',
      photographerUrl: 'https://www.pexels.com/@joey',
      pageUrl: 'https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/',
    },
  },
  about: {
    id: 'about',
    eyebrow: 'The studio',
    title: 'An atelier for rooms with memory',
    body: 'Lumen Atelier began as a small practice obsessed with how late light moves across stone and linen. We still design that way: slowly, on site, with a short list of materials that age well.\n\nEvery commission is a conversation about ritual — morning coffee, a long table, the first lamp switched on at dusk.',
    stats: [
      { value: '12', label: 'Years of practice' },
      { value: '40', label: 'Residences completed' },
      { value: '8', label: 'Cities' },
    ],
    image: {
      src: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Bright living room with wood floors and a long sofa',
      photographer: 'Vecislavas Popa',
      photographerUrl: 'https://www.pexels.com/@vecislavas-popa-59051',
      pageUrl: 'https://www.pexels.com/photo/living-room-interior-1643383/',
    },
  },
  features: {
    id: 'features',
    eyebrow: 'The craft',
    title: 'How a room comes together',
    items: [
      {
        title: 'Light first',
        description:
          'We start with openings, lamps, and the path of the sun before we choose a single chair.',
        image: {
          src: 'https://images.pexels.com/photos/2749928/pexels-photo-2749928.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'Ocean horizon at sunset',
          photographer: 'David Frampton',
          photographerUrl: 'https://www.pexels.com/@david-frampton-1235333',
          pageUrl: 'https://www.pexels.com/photo/photo-of-ocean-during-sunset-2749928/',
        },
      },
      {
        title: 'Honest materials',
        description:
          'Oak, plaster, linen, and bronze — finishes that take a patina instead of a refresh cycle.',
        image: {
          src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'Minimal interior with a wooden cabinet and chair',
          photographer: 'Vecislavas Popa',
          photographerUrl: 'https://www.pexels.com/@vecislavas-popa-59051',
          pageUrl: 'https://www.pexels.com/photo/white-wooden-cabinet-beside-white-wooden-chair-1571460/',
        },
      },
      {
        title: 'Quiet luxury',
        description:
          'Restraint over display. The room should feel complete when empty and generous when full.',
        image: {
          src: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'Modern building facade with repeating windows',
          photographer: 'Pixabay',
          photographerUrl: 'https://www.pexels.com/@pixabay',
          pageUrl: 'https://www.pexels.com/photo/architecture-buildings-business-city-380769/',
        },
      },
    ],
  },
  gallery: {
    id: 'gallery',
    eyebrow: 'Selected work',
    title: 'Spaces we have shaped',
    items: [
      {
        caption: 'A coastal dining room held in warm plaster',
        image: {
          src: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1000',
          alt: 'Fog around a modern city skyline at dawn',
          photographer: 'Aleksandar Pasaric',
          photographerUrl: 'https://www.pexels.com/@apasaric',
          pageUrl: 'https://www.pexels.com/photo/view-of-cityscape-325185/',
        },
      },
      {
        caption: 'Gallery lighting for a private collection',
        image: {
          src: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1000',
          alt: 'Abstract blue light trails',
          photographer: 'Pixabay',
          photographerUrl: 'https://www.pexels.com/@pixabay',
          pageUrl: 'https://www.pexels.com/photo/blue-and-purple-lights-373543/',
        },
      },
      {
        caption: 'A mountain house that opens to the weather',
        image: {
          src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1000',
          alt: 'Lake and mountain landscape at dusk',
          photographer: 'James Wheeler',
          photographerUrl: 'https://www.pexels.com/@souvenirpixels',
          pageUrl: 'https://www.pexels.com/photo/lake-and-mountain-417074/',
        },
      },
      {
        caption: 'Textile studies for a townhouse stair',
        image: {
          src: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1000',
          alt: 'Soft green textured surface',
          photographer: 'Scott Webb',
          photographerUrl: 'https://www.pexels.com/@scottwebb',
          pageUrl: 'https://www.pexels.com/photo/green-leafed-plants-1029604/',
        },
      },
    ],
  },
  testimonials: {
    id: 'stories',
    title: 'From the people who live in them',
    items: [
      {
        quote:
          'They treated the house like a score — every doorway a measure, every lamp a note. We still notice new details at dusk.',
        name: 'Amelia Hart',
        role: 'Collector, Lisbon',
      },
      {
        quote:
          'The restaurant feels older than it is. Guests ask who restored it. Nobody built it that way until Lumen did.',
        name: 'Kenji Mori',
        role: 'Host, Kyoto',
      },
      {
        quote:
          'I asked for less, and they delivered more silence. The rooms hold a whole afternoon without asking anything of you.',
        name: 'Nadia Voss',
        role: 'Publisher, Antwerp',
      },
    ],
  },
  cta: {
    id: 'contact',
    title: 'Tell us about the room you cannot stop thinking about',
    body: 'Share a site, a ritual, or a photograph. We take a small number of commissions each year.',
    button: { label: 'Write to the atelier', href: 'mailto:hello@lumenatelier.example' },
  },
  footer: {
    blurb: 'Lumen Atelier designs interiors for people who notice how a room changes at four in the afternoon.',
    links: [
      { label: 'Work', href: '#gallery' },
      { label: 'Story', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
}
