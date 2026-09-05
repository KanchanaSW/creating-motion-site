import { siteConfig } from '../config/site'
import type { PexelsImage } from '../types/site'

function collectImages(): PexelsImage[] {
  const { hero, about, features, gallery } = siteConfig
  const images = [
    hero.image,
    about.image,
    ...features.items.flatMap((item) => (item.image ? [item.image] : [])),
    ...gallery.items.map((item) => item.image),
  ]

  const seen = new Set<string>()
  return images.filter((image) => {
    if (seen.has(image.photographer)) return false
    seen.add(image.photographer)
    return true
  })
}

export function Footer() {
  const credits = collectImages()

  return (
    <footer className="border-t border-foreground/10 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-2xl">{siteConfig.title}</p>
          <p className="mt-3 text-foreground/70">{siteConfig.footer.blurb}</p>
        </div>
        <nav className="flex flex-col gap-2">
          {siteConfig.footer.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-12 max-w-6xl text-xs text-foreground/55">
        {credits.map((image) => (
          <p key={image.photographer}>
            Photo by{' '}
            <a href={image.photographerUrl} className="underline" target="_blank" rel="noreferrer">
              {image.photographer}
            </a>{' '}
            on{' '}
            <a href={image.pageUrl} className="underline" target="_blank" rel="noreferrer">
              Pexels
            </a>
          </p>
        ))}
      </div>
    </footer>
  )
}
