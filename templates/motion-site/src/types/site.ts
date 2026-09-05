export type HexColor = `#${string}`

export interface PexelsImage {
  src: string
  alt: string
  photographer: string
  photographerUrl: string
  pageUrl: string
}

export interface SiteColors {
  background: HexColor
  foreground: HexColor
  primary: HexColor
  secondary: HexColor
  accent: HexColor
  muted: HexColor
}

export interface NavItem {
  label: string
  href: string
}

export interface HeroContent {
  eyebrow: string
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  image: PexelsImage
}

export interface AboutContent {
  id: string
  eyebrow: string
  title: string
  body: string
  stats: Array<{ value: string; label: string }>
  image: PexelsImage
}

export interface FeatureItem {
  title: string
  description: string
  image?: PexelsImage
}

export interface GalleryItem {
  image: PexelsImage
  caption: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface CtaContent {
  id: string
  title: string
  body: string
  button: { label: string; href: string }
}

export interface FooterContent {
  blurb: string
  links: NavItem[]
}

export interface SiteConfig {
  title: string
  tagline: string
  colors: SiteColors
  nav: NavItem[]
  hero: HeroContent
  about: AboutContent
  features: {
    id: string
    eyebrow: string
    title: string
    items: FeatureItem[]
  }
  gallery: {
    id: string
    eyebrow: string
    title: string
    items: GalleryItem[]
  }
  testimonials: {
    id: string
    title: string
    items: Testimonial[]
  }
  cta: CtaContent
  footer: FooterContent
}
