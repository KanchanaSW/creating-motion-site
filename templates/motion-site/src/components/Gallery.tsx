import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '../config/site'
import { useGsapReveal } from '../lib/useGsapReveal'
import { ImageCredit } from './ImageCredit'

gsap.registerPlugin(ScrollTrigger)

export function Gallery() {
  const { gallery } = siteConfig
  const ref = useRef<HTMLElement>(null)
  useGsapReveal(ref)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: image.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id={gallery.id} ref={ref} className="mx-auto max-w-6xl px-6 py-28">
      <p data-reveal className="mb-3 text-sm uppercase tracking-[0.2em] text-primary">
        {gallery.eyebrow}
      </p>
      <h2 data-reveal className="font-display max-w-2xl text-4xl sm:text-5xl">
        {gallery.title}
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {gallery.items.map((item) => (
          <figure key={item.image.src} data-reveal className="overflow-hidden rounded-3xl">
            <div className="h-80 overflow-hidden">
              <img
                data-parallax
                src={item.image.src}
                alt={item.image.alt}
                className="h-[120%] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-foreground/80">{item.caption}</figcaption>
            <ImageCredit
              image={item.image}
              className="mt-1 text-[11px] text-foreground/55"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
