import { motion } from 'motion/react'
import { useRef } from 'react'
import { siteConfig } from '../config/site'
import { useGsapReveal } from '../lib/useGsapReveal'

export function Cta() {
  const { cta } = siteConfig
  const ref = useRef<HTMLElement>(null)
  useGsapReveal(ref)

  return (
    <section id={cta.id} ref={ref} className="mx-auto max-w-6xl px-6 py-28">
      <div className="rounded-[2rem] bg-primary px-8 py-16 text-background sm:px-14">
        <h2 data-reveal className="font-display max-w-3xl text-4xl sm:text-5xl">
          {cta.title}
        </h2>
        <p data-reveal className="mt-5 max-w-2xl text-lg text-background/80">
          {cta.body}
        </p>
        <motion.a
          data-reveal
          href={cta.button.href}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-flex rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground"
        >
          {cta.button.label}
        </motion.a>
      </div>
    </section>
  )
}
