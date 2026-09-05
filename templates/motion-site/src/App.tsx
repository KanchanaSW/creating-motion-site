import { useEffect } from 'react'
import { siteConfig } from './config/site'
import { About } from './components/About'
import { Cta } from './components/Cta'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { SmoothScroll } from './components/SmoothScroll'
import { Testimonials } from './components/Testimonials'

export default function App() {
  const { colors, title } = siteConfig

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <SmoothScroll>
      <div
        style={{
          ['--site-background' as string]: colors.background,
          ['--site-foreground' as string]: colors.foreground,
          ['--site-primary' as string]: colors.primary,
          ['--site-secondary' as string]: colors.secondary,
          ['--site-accent' as string]: colors.accent,
          ['--site-muted' as string]: colors.muted,
        }}
        className="min-h-screen bg-background font-sans text-foreground"
      >
        <Nav />
        <main>
          <Hero />
          <About />
          <Features />
          <Gallery />
          <Testimonials />
          <Cta />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
