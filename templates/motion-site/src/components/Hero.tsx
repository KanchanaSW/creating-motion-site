import { motion } from 'motion/react'
import { siteConfig } from '../config/site'
import { ImageCredit } from './ImageCredit'

export function Hero() {
  const { hero } = siteConfig
  const words = hero.headline.split(' ')

  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden">
      <img
        src={hero.image.src}
        alt={hero.image.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-20 pt-32">
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-4 text-sm uppercase tracking-[0.2em] text-primary"
        >
          {hero.eyebrow}
        </motion.p>
        <h1 className="font-display max-w-4xl text-5xl leading-[1.05] sm:text-7xl">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
              className="mr-[0.28em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 max-w-xl text-lg text-foreground/80"
        >
          {hero.subheadline}
        </motion.p>
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <motion.a
            href={hero.primaryCta.href}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-background"
          >
            {hero.primaryCta.label}
          </motion.a>
          {hero.secondaryCta ? (
            <motion.a
              href={hero.secondaryCta.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-foreground/30 px-6 py-3 text-sm"
            >
              {hero.secondaryCta.label}
            </motion.a>
          ) : null}
        </motion.div>
        <ImageCredit
          image={hero.image}
          className="mt-10 text-xs text-foreground/60"
        />
      </div>
    </section>
  )
}
