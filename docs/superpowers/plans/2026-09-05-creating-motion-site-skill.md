# Creating Motion Site Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a reusable Cursor + Claude skill that scaffolds a single-page motion website from a required title (optional colors), with all copy and Pexels image URLs isolated in one editable config file.

**Architecture:** The skill is a workflow package (`SKILL.md` + references + a Vite starter template). When invoked, the agent validates inputs, generates site copy and a matching palette, copies the template into the user's workspace, and writes only `src/config/site.ts`. React sections read that config; they never hardcode marketing copy or image URLs. Images stay as `https://images.pexels.com/...` URLs — never downloaded.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS v4, Motion (`motion/react`, Framer Motion), GSAP + ScrollTrigger, Lenis. Skill format: Agent Skills (`SKILL.md` with YAML frontmatter).

## Global Constraints

- Skill folder name and frontmatter `name` must be `creating-motion-site` (letters, numbers, hyphens only).
- Title is required. If missing, stop and ask — do not invent a title or scaffold.
- Colors are optional. If omitted, pick a matching palette from the mood table; never leave placeholders or default to generic blue without a mood reason.
- All user-facing copy, colors, nav, CTAs, and image metadata live in `src/config/site.ts` only.
- Images must be Pexels CDN URLs. Never `curl`, `wget`, or save image bytes to disk.
- Generated site is a single page (no React Router pages). Hash/anchor links only.
- Every generated site must include: Lenis smooth scroll, Framer Motion enter/hover, GSAP ScrollTrigger section reveals.
- Pexels photographer credit (name + page URL) is required on every image in config.
- Do not put generated sites inside the skill folder. Scaffold into the user-chosen project directory.
- `SKILL.md` body must stay under 500 lines; heavy recipes go in `references/`.

---

## File Map

Canonical skill lives in the repo so it can be copied or symlinked into Cursor and Claude discovery paths.

```
.cursor/skills/creating-motion-site/
  SKILL.md                          # discovery + workflow (loaded first)
  references/
    content-schema.md               # SiteConfig types and field rules
    color-system.md                 # input parsing + mood palettes
    pexels.md                       # URL-only image rules
    animations.md                   # Motion / GSAP / Lenis patterns
    section-recipes.md              # which sections to generate
  templates/motion-site/
    package.json
    vite.config.ts
    tsconfig.json
    tsconfig.app.json
    tsconfig.node.json
    index.html
    src/main.tsx
    src/App.tsx
    src/index.css
    src/vite-env.d.ts
    src/config/site.ts              # example config; overwritten per run
    src/types/site.ts               # SiteConfig types
    src/lib/smooth-scroll.ts        # Lenis + GSAP ticker
    src/lib/useGsapReveal.ts        # ScrollTrigger helper
    src/components/SmoothScroll.tsx
    src/components/Nav.tsx
    src/components/Hero.tsx
    src/components/About.tsx
    src/components/Features.tsx
    src/components/Gallery.tsx
    src/components/Testimonials.tsx
    src/components/Cta.tsx
    src/components/Footer.tsx
    src/components/ImageCredit.tsx
```

Install copies (same folder contents, not a second implementation):

- Cursor project: `.cursor/skills/creating-motion-site/` (canonical)
- Claude Code project: `.claude/skills/creating-motion-site/` (copy or symlink)
- Optional global: `~/.cursor/skills/creating-motion-site/` and `~/.claude/skills/creating-motion-site/`

---

### Task 1: SiteConfig types and example config

**Files:**
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/src/types/site.ts`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/src/config/site.ts`
- Create: `.cursor/skills/creating-motion-site/references/content-schema.md`

**Interfaces:**
- Consumes: nothing
- Produces: `PexelsImage`, `SiteColors`, `NavItem`, `HeroContent`, `AboutContent`, `FeatureItem`, `GalleryItem`, `Testimonial`, `CtaContent`, `FooterContent`, `SiteConfig`, and `siteConfig: SiteConfig`

- [ ] **Step 1: Write the TypeScript contracts**

```ts
// .cursor/skills/creating-motion-site/templates/motion-site/src/types/site.ts
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
```

- [ ] **Step 2: Write a complete example `site.ts` that satisfies the types**

Use a fictional brand (for example `Lumen Atelier`) so the template builds before any user run. Every `PexelsImage.src` must start with `https://images.pexels.com/photos/` and include `photographer`, `photographerUrl`, and `pageUrl`. Use real public Pexels photo IDs (example pattern):

`https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1600`

- [ ] **Step 3: Write `references/content-schema.md`**

Document:

- `site.ts` is the only file a user should edit to change copy, colors, or images.
- Required vs optional fields (match the types above).
- Section `id` values must match nav `href` hashes (`#about`, `#features`, `#gallery`, `#stories`, `#contact`).
- Agents generate all copy from the title; they do not leave lorem ipsum.
- Agents never move copy into JSX.

- [ ] **Step 4: Commit**

```bash
git add .cursor/skills/creating-motion-site/templates/motion-site/src/types/site.ts \
        .cursor/skills/creating-motion-site/templates/motion-site/src/config/site.ts \
        .cursor/skills/creating-motion-site/references/content-schema.md
git commit -m "feat: add SiteConfig types and example content file"
```

---

### Task 2: Color system

**Files:**
- Create: `.cursor/skills/creating-motion-site/references/color-system.md`

**Interfaces:**
- Consumes: user color string(s) or none; site title for mood
- Produces: a complete `SiteColors` object written into `siteConfig.colors`

- [ ] **Step 1: Write the color rules**

`references/color-system.md` must contain this workflow:

1. If the user gave one hex, treat it as `primary`. Derive `secondary` (hue +40), `accent` (complement or warmer analog), `background` (near-black or near-cream from luminance), `foreground` (contrast-safe opposite), `muted` (background mixed toward foreground at ~30%).
2. If the user gave two hexes, map to `primary` and `secondary`. Derive the rest.
3. If the user gave three or more, map in order: `primary`, `secondary`, `accent`, then derive the remainder.
4. If the user gave named colors (`sage`, `gold`), resolve to hex first.
5. If no colors: classify the title into one mood and copy that palette exactly.

Mood table (use these exact palettes):

| Mood | Title cues | background | foreground | primary | secondary | accent | muted |
|---|---|---|---|---|---|---|---|
| nocturnal | night, dark, space, noir, moon | `#0B0C10` | `#F4F1EA` | `#7AA2F7` | `#C3A6FF` | `#F6C177` | `#2A2E37` |
| solar | sun, citrus, energy, sport | `#FFF7ED` | `#1C1917` | `#EA580C` | `#F59E0B` | `#0F766E` | `#FED7AA` |
| botanic | garden, green, earth, organic | `#F4F1EA` | `#1F2A1F` | `#3F6B4D` | `#A3B18A` | `#C4A484` | `#D9D2C5` |
| coastal | sea, wave, ocean, harbor | `#F3F7F8` | `#10232A` | `#0E7490` | `#67E8F9` | `#F4A261` | `#D0E3E7` |
| luxe | gold, atelier, maison, jewelry | `#14110F` | `#F6EDE0` | `#C6A15B` | `#8C6A3B` | `#E8D5B5` | `#2C241C` |
| studio | lab, digital, product, app | `#0F1115` | `#EEF1F6` | `#5B8DEF` | `#22D3EE` | `#F472B6` | `#1C2230` |
| editorial | magazine, journal, press, type | `#FAF7F2` | `#1A1A1A` | `#111111` | `#B42318` | `#C4C0B8` | `#E8E2D9` |

Fallback mood when cues do not match: `studio`.

- [ ] **Step 2: Add a contrast check rule**

Foreground on background and primary-on-background text must stay readable. If a derived pair is low-contrast, flip `foreground` to `#FFFFFF` or `#111111` as needed. Do not ship a pastel-on-pastel hero.

- [ ] **Step 3: Commit**

```bash
git add .cursor/skills/creating-motion-site/references/color-system.md
git commit -m "feat: add mood palettes and color derivation rules"
```

---

### Task 3: Pexels URL-only image rules

**Files:**
- Create: `.cursor/skills/creating-motion-site/references/pexels.md`

**Interfaces:**
- Consumes: section subject keywords derived from the title
- Produces: `PexelsImage` objects stored in `site.ts`

- [ ] **Step 1: Write the image rules**

Required rules in `pexels.md`:

- Search Pexels (web search or browse) for photos that match the title's subject.
- Copy the CDN URL into config. Preferred form:

```
https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w={width}
```

- Widths: hero `1600`, about `1200`, gallery `1000`, feature `800`.
- Never download. Forbidden: `curl -O`, `wget`, `fetch` + `writeFile`, saving into `public/`.
- Every image needs `alt`, `photographer`, `photographerUrl`, `pageUrl`.
- Footer or `ImageCredit` must render `Photo by {name} on Pexels`.
- Prefer landscape for hero/about, mixed orientations for gallery.
- Do not reuse the same photo ID twice on one site.
- If Pexels search is unavailable, use known public IDs from a short fallback list in this file (at least 12 IDs spanning nature, interior, people, architecture, food, abstract). Still write full credit fields.

- [ ] **Step 2: Commit**

```bash
git add .cursor/skills/creating-motion-site/references/pexels.md
git commit -m "feat: add Pexels URL-only image rules"
```

---

### Task 4: Vite + React + Tailwind template shell

**Files:**
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/package.json`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/vite.config.ts`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/tsconfig.json`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/tsconfig.app.json`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/tsconfig.node.json`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/index.html`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/src/main.tsx`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/src/index.css`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/src/vite-env.d.ts`

**Interfaces:**
- Consumes: `SiteConfig.title` for `index.html` and document title
- Produces: a project that installs and starts with `npm install && npm run dev`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "motion-site",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.13.0",
    "lenis": "^1.3.8",
    "motion": "^12.23.12",
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.12",
    "@types/react": "^19.1.12",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.2",
    "tailwindcss": "^4.1.12",
    "typescript": "^5.9.2",
    "vite": "^7.1.3"
  }
}
```

- [ ] **Step 2: Write Vite + Tailwind config**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-background: var(--site-background);
  --color-foreground: var(--site-foreground);
  --color-primary: var(--site-primary);
  --color-secondary: var(--site-secondary);
  --color-accent: var(--site-accent);
  --color-muted: var(--site-muted);
  --font-display: "Fraunces", serif;
  --font-sans: "Geist", "Helvetica Neue", sans-serif;
}

html,
body,
#root {
  background: var(--site-background);
  color: var(--site-foreground);
}

html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
```

CSS variables `--site-*` are set on `:root` from `siteConfig.colors` in `App.tsx` (Task 6).

- [ ] **Step 3: Write `index.html` and `main.tsx`**

`index.html` title is a placeholder (`Motion Site`) that the agent replaces with `siteConfig.title` during generation. Load Fraunces from a public font CDN in `index.html` (Google Fonts is fine). Geist can fall back to system sans if a CDN is unavailable.

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 4: Verify the shell typechecks after later tasks land**

Do not `npm install` inside the skill template folder as a published artifact. Verification happens in Task 8 by copying the template to a temp project.

- [ ] **Step 5: Commit**

```bash
git add .cursor/skills/creating-motion-site/templates/motion-site
git commit -m "feat: add Vite React Tailwind template shell"
```

---

### Task 5: Smooth scroll + animation helpers

**Files:**
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/src/lib/smooth-scroll.ts`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/src/lib/useGsapReveal.ts`
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/src/components/SmoothScroll.tsx`
- Create: `.cursor/skills/creating-motion-site/references/animations.md`

**Interfaces:**
- Consumes: section root `RefObject<HTMLElement>`
- Produces: `initSmoothScroll()`, `SmoothScroll` provider, `useGsapReveal(ref, selector?)`

- [ ] **Step 1: Write Lenis + GSAP ticker bridge**

```ts
// src/lib/smooth-scroll.ts
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenis
}
```

```tsx
// src/components/SmoothScroll.tsx
import { useEffect, type ReactNode } from 'react'
import { initSmoothScroll } from '../lib/smooth-scroll'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = initSmoothScroll()
    return () => lenis.destroy()
  }, [])

  return children
}
```

- [ ] **Step 2: Write the ScrollTrigger reveal hook**

```ts
// src/lib/useGsapReveal.ts
import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapReveal(
  ref: RefObject<HTMLElement | null>,
  selector = '[data-reveal]',
) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [ref, selector])
}
```

- [ ] **Step 3: Write `references/animations.md`**

Specify the split of labor:

| Library | Use for | Do not use for |
|---|---|---|
| Lenis | page-level smooth scrolling | element tweens |
| Motion (`motion/react`) | hero headline, nav, buttons, hover, page load | long scroll timelines |
| GSAP ScrollTrigger | section reveals, parallax image shift, pin-free scrub on gallery | button hover |

Required motion on every generated site:

- Hero headline: Motion `initial={{ y: 40, opacity: 0 }}` staggered words or lines
- Nav: Motion fade/slide on load; active link underline
- Sections: `useGsapReveal` on heading + children with `data-reveal`
- Gallery images: GSAP `yPercent` parallax from `-10` to `10`
- Buttons: Motion `whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.98 }}`

Reduced motion: if `window.matchMedia('(prefers-reduced-motion: reduce)')` matches, skip Lenis and GSAP tweens; keep a static layout.

- [ ] **Step 4: Commit**

```bash
git add .cursor/skills/creating-motion-site/templates/motion-site/src/lib \
        .cursor/skills/creating-motion-site/templates/motion-site/src/components/SmoothScroll.tsx \
        .cursor/skills/creating-motion-site/references/animations.md
git commit -m "feat: add Lenis GSAP and Motion animation helpers"
```

---

### Task 6: Config-driven section components

**Files:**
- Create: `.cursor/skills/creating-motion-site/templates/motion-site/src/App.tsx`
- Create: each file under `templates/motion-site/src/components/` listed in the file map
- Create: `.cursor/skills/creating-motion-site/references/section-recipes.md`

**Interfaces:**
- Consumes: `siteConfig` from `src/config/site.ts`
- Produces: a single-page layout with `#hero`, `#about`, `#features`, `#gallery`, `#stories`, `#contact`

- [ ] **Step 1: Write `App.tsx` to bind CSS variables from config**

```tsx
import { siteConfig } from './config/site'
import { SmoothScroll } from './components/SmoothScroll'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Features } from './components/Features'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'

export default function App() {
  const { colors } = siteConfig

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
        className="min-h-screen bg-background text-foreground"
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
```

- [ ] **Step 2: Write each section so it imports `siteConfig` only**

Hard rule in every component file: no string literals for headlines, body copy, button labels, or image URLs. Read from `siteConfig`.

Component responsibilities:

- `Nav` — `siteConfig.title`, `siteConfig.nav`, Motion entrance
- `Hero` — `siteConfig.hero`, full-viewport, Motion headline, Pexels background or split image
- `About` — `siteConfig.about`, GSAP reveal, stats row
- `Features` — 3 items from `siteConfig.features.items`
- `Gallery` — masonry or 3-column grid; parallax images; captions from config
- `Testimonials` — 3 quotes
- `Cta` — `id="contact"`
- `Footer` — blurb, links, aggregated unique photographer credits
- `ImageCredit` — small overlay or figcaption from `PexelsImage`

- [ ] **Step 3: Write `references/section-recipes.md`**

Tell the agent how to invent content from a title:

- `tagline`: 6–12 words
- `hero.headline`: 4–8 words, no trailing period
- `hero.subheadline`: 18–30 words
- `about.body`: 2 short paragraphs
- `features.items`: exactly 3
- `gallery.items`: exactly 4
- `testimonials.items`: exactly 3 fictional but plausible
- `nav`: Home (`#hero`), Story (`#about`), Work (`#gallery`), Contact (`#contact`) plus Features if it fits
- Tone follows the title (restaurant ≠ fintech ≠ studio)

- [ ] **Step 4: Commit**

```bash
git add .cursor/skills/creating-motion-site/templates/motion-site/src \
        .cursor/skills/creating-motion-site/references/section-recipes.md
git commit -m "feat: add config-driven single-page sections"
```

---

### Task 7: SKILL.md workflow

**Files:**
- Create: `.cursor/skills/creating-motion-site/SKILL.md`

**Interfaces:**
- Consumes: user request (title required, colors optional, optional output path)
- Produces: a generated project directory the user can `npm install && npm run dev`

- [ ] **Step 1: Write frontmatter for discovery**

```yaml
---
name: creating-motion-site
description: Use when the user wants a new single-page motion website, scroll-animated landing page, Framer Motion or GSAP marketing site, or asks to generate a Vite React Tailwind site from a title and optional colors.
---
```

Do not summarize the workflow in `description`. Triggers only.

- [ ] **Step 2: Write the body as a linear workflow**

`SKILL.md` sections, in this order:

1. **Overview** — one paragraph: scaffold the bundled template, then write `src/config/site.ts`.
2. **Inputs**
   - Required: `title`
   - Optional: colors, output directory (default: kebab-case title in the workspace root)
   - If title is missing: ask once and stop. Do not scaffold.
3. **Workflow** (numbered, must not skip)
   1. Confirm title. Parse colors or choose a mood palette (`references/color-system.md`).
   2. Copy `templates/motion-site/` to the output directory.
   3. Generate all copy (`references/section-recipes.md`).
   4. Select Pexels URLs (`references/pexels.md`). Never download.
   5. Write `src/config/site.ts` to match `SiteConfig` (`references/content-schema.md`).
   6. Set `index.html` `<title>` to the site title.
   7. Apply animation patterns already in the template (`references/animations.md`). Do not invent a second stack.
   8. `npm install && npm run dev` in the output directory.
   9. Tell the user: title, colors used, config path, and that they should edit `src/config/site.ts` for copy/images.
4. **Hard rules** — title required; config-only content; Pexels URLs only; no downloads; single page; Motion + GSAP + Lenis must remain.
5. **Common mistakes**
   - Hardcoding a headline in `Hero.tsx`
   - Saving images under `public/`
   - Skipping colors when the user omitted them (must pick a mood palette)
   - Adding React Router
   - Replacing Motion/GSAP with CSS-only fades

Link out to each `references/*.md` file. Keep the body short.

- [ ] **Step 3: Add a rationalization table for the hard rules**

| Excuse | Reality |
|---|---|
| "I'll add copy in the component and move it later" | Copy in JSX is a failed run. Put it in `site.ts` first. |
| "Downloading is more reliable than a hotlink" | The skill forbids downloads. Use the Pexels CDN URL. |
| "No title, I'll name it Untitled" | Stop and ask. Title is required. |
| "User skipped colors so I'll use Tailwind defaults" | Pick a mood palette from `color-system.md`. |
| "Router will make it more complete" | Single page only. Anchor links. |

- [ ] **Step 4: Commit**

```bash
git add .cursor/skills/creating-motion-site/SKILL.md
git commit -m "feat: add creating-motion-site skill workflow"
```

---

### Task 8: Claude install path + README

**Files:**
- Create: `.claude/skills/creating-motion-site` as a symlink to `../../.cursor/skills/creating-motion-site` (or a full copy if the OS/git setup cannot store the symlink)
- Create: `.cursor/skills/creating-motion-site/README.md` (install + usage, not loaded by the agent unless asked)

**Interfaces:**
- Consumes: the finished skill folder
- Produces: discovery in both Cursor and Claude Code

- [ ] **Step 1: Dual-install**

```bash
mkdir -p .claude/skills
ln -s ../../.cursor/skills/creating-motion-site .claude/skills/creating-motion-site
```

If symlink is rejected, copy the folder instead and add a one-line note in the README that the Cursor copy is canonical.

- [ ] **Step 2: Write user-facing README**

Include:

```
Create a motion site titled Harbor & Pine
Create a motion site titled Nova Lab, colors #0B0B0F and #7CFF6B
```

Explain: title required, colors optional, edit `src/config/site.ts`, images are Pexels URLs.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/creating-motion-site .cursor/skills/creating-motion-site/README.md
git commit -m "docs: add Claude skill path and usage readme"
```

---

### Task 9: Verify the template builds

**Files:**
- Test: a temporary copy of `templates/motion-site` outside the skill (do not commit the temp copy)

**Interfaces:**
- Consumes: template from Task 4–6 and example `site.ts` from Task 1
- Produces: successful `npm install`, `npm run build`, and `npm run dev`

- [ ] **Step 1: Copy and install**

```bash
rm -rf /tmp/motion-site-verify
cp -R .cursor/skills/creating-motion-site/templates/motion-site /tmp/motion-site-verify
cd /tmp/motion-site-verify
npm install
```

Expected: install exits 0.

- [ ] **Step 2: Typecheck and build**

```bash
cd /tmp/motion-site-verify
npm run build
```

Expected: `tsc -b && vite build` exits 0. No missing exports. No hardcoded broken imports.

- [ ] **Step 3: Grep the template for leaked copy and downloaded images**

```bash
# components must not contain marketing sentences; only config imports
rg -n "Lorem ipsum" .cursor/skills/creating-motion-site/templates/motion-site/src/components
# no local image assets
find .cursor/skills/creating-motion-site/templates/motion-site -type f \( -name '*.jpg' -o -name '*.png' -o -name '*.webp' \)
```

Expected: no lorem in components; no image files in the template.

- [ ] **Step 4: Start dev server and confirm it serves HTML**

```bash
cd /tmp/motion-site-verify
npm run dev -- --host 127.0.0.1 --port 5173
curl -s http://127.0.0.1:5173 | head
```

Expected: HTML includes the root mount and the example title from `site.ts` / `index.html`.

- [ ] **Step 5: Commit only if template files needed fixes**

```bash
git add .cursor/skills/creating-motion-site/templates/motion-site
git commit -m "fix: make motion-site template build cleanly"
```

---

### Task 10: Skill pressure tests (RED then GREEN)

This skill is a technique skill. Test that an agent follows the workflow, not just that the template builds.

**Files:**
- Create: `.cursor/skills/creating-motion-site/evals/scenarios.md`

**Interfaces:**
- Consumes: `SKILL.md` + references
- Produces: documented pass/fail notes for three scenarios

- [ ] **Step 1: Write three application scenarios**

1. **Happy path** — User: `Create a motion site titled Harbor & Pine, color #2F4F3E`. Expect: project scaffolded, palette uses `#2F4F3E` as primary, `site.ts` filled, Pexels URLs only, no image files written.
2. **Missing title** — User: `Make me a fancy scrolling website in teal`. Expect: agent asks for a title and does not scaffold.
3. **No colors** — User: `Create a motion site titled Night Market Ramen`. Expect: nocturnal or a food-adjacent palette from the mood table, not Tailwind default blue, and a complete `site.ts`.

- [ ] **Step 2: Run scenario 2 and 3 mentally against SKILL.md (author check)**

Confirm the hard rules and rationalization table name these exact failure modes. If a rule is only implied, add an explicit sentence to `SKILL.md`.

- [ ] **Step 3: Optional live check**

If a subagent is available, give it only the user prompt (no skill) once, then the same prompt with the skill attached. Document gaps. Close loopholes in `SKILL.md` (do not add new features).

- [ ] **Step 4: Commit**

```bash
git add .cursor/skills/creating-motion-site/evals/scenarios.md \
        .cursor/skills/creating-motion-site/SKILL.md
git commit -m "test: add skill evaluation scenarios"
```

---

## Spec coverage (self-review)

| Requirement | Task |
|---|---|
| Claude + Cursor skill | 7, 8 |
| Single-page motion site | 6, 7 |
| Scroll / motion / smooth animations | 5, 6 |
| Framer Motion, GSAP, React, Vite, Tailwind | 4, 5 |
| Title required | 7, 10 |
| Generate content from title | 6 (`section-recipes.md`), 7 |
| Random matching colors when omitted | 2, 7, 10 |
| Content + images in one config | 1, 6 |
| Pexels free images, URL only, no download | 3, 7, 9 |
| User can edit config anytime | 1, 7, 8 |

## Approach choice (locked)

Three ways to build this skill were considered:

1. **Instruction-only** — agent scaffolds Vite from scratch each time. Flexible, but Tailwind/GSAP setup quality varies.
2. **Template + config (chosen)** — agent copies a known-good starter and only writes `site.ts`. Reliable animations, easy user edits.
3. **Generator script** — a Node CLI writes files. Faster, but harder for the user to tweak structure and worse for Cursor/Claude progressive disclosure.

Implement approach 2.

## Out of scope

- Multi-page routing, CMS, auth, forms backend
- Pexels API key requirement (URL copy is enough)
- Downloading or optimizing images locally
- Multiple design themes beyond color + generated copy
- Publishing/deploy automation
