import { useRef } from 'react'
import { siteConfig } from '../config/site'
import { useGsapReveal } from '../lib/useGsapReveal'
import { ImageCredit } from './ImageCredit'

export function About() {
  const { about } = siteConfig
  const ref = useRef<HTMLElement>(null)
  useGsapReveal(ref)

  return (
    <section id={about.id} ref={ref} className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p data-reveal className="mb-3 text-sm uppercase tracking-[0.2em] text-primary">
            {about.eyebrow}
          </p>
          <h2 data-reveal className="font-display text-4xl sm:text-5xl">
            {about.title}
          </h2>
          {about.body.split('\n\n').map((paragraph) => (
            <p key={paragraph} data-reveal className="mt-5 text-lg leading-relaxed text-foreground/80">
              {paragraph}
            </p>
          ))}
          <div className="mt-10 grid grid-cols-3 gap-6">
            {about.stats.map((stat) => (
              <div key={stat.label} data-reveal>
                <p className="font-display text-3xl text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <figure data-reveal className="overflow-hidden rounded-3xl">
          <img
            src={about.image.src}
            alt={about.image.alt}
            className="h-[520px] w-full object-cover"
          />
          <ImageCredit
            image={about.image}
            className="mt-3 text-xs text-foreground/60"
          />
        </figure>
      </div>
    </section>
  )
}
