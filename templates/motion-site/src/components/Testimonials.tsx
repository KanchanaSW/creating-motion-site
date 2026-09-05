import { useRef } from 'react'
import { siteConfig } from '../config/site'
import { useGsapReveal } from '../lib/useGsapReveal'

export function Testimonials() {
  const { testimonials } = siteConfig
  const ref = useRef<HTMLElement>(null)
  useGsapReveal(ref)

  return (
    <section id={testimonials.id} ref={ref} className="bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 data-reveal className="font-display max-w-2xl text-4xl sm:text-5xl">
          {testimonials.title}
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.items.map((item) => (
            <blockquote key={item.name} data-reveal className="rounded-3xl bg-background p-6">
              <p className="text-lg leading-relaxed text-foreground/85">“{item.quote}”</p>
              <footer className="mt-6">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-foreground/60">{item.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
