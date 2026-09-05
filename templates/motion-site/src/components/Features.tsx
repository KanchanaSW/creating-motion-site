import { useRef } from 'react'
import { siteConfig } from '../config/site'
import { useGsapReveal } from '../lib/useGsapReveal'
import { ImageCredit } from './ImageCredit'

export function Features() {
  const { features } = siteConfig
  const ref = useRef<HTMLElement>(null)
  useGsapReveal(ref)

  return (
    <section id={features.id} ref={ref} className="bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p data-reveal className="mb-3 text-sm uppercase tracking-[0.2em] text-primary">
          {features.eyebrow}
        </p>
        <h2 data-reveal className="font-display max-w-2xl text-4xl sm:text-5xl">
          {features.title}
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {features.items.map((item) => (
            <article key={item.title} data-reveal className="rounded-3xl bg-background p-6">
              {item.image ? (
                <figure className="mb-5 overflow-hidden rounded-2xl">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="h-48 w-full object-cover"
                  />
                  <ImageCredit
                    image={item.image}
                    className="mt-2 text-[11px] text-foreground/55"
                  />
                </figure>
              ) : null}
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-foreground/75">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
