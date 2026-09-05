# Design: visual system for creating-motion-site

Date: 2026-09-05
Status: proposed

## Problem

A generated site (title: a travel brand, `luxe` palette) came out structurally correct and
visually generic. Every hard rule in `SKILL.md` was followed. The failure is not
non-compliance — it is that the skill has no opinion about composition, and the template
has no capacity for one.

Concretely, five of six sections render the identical shape:

```
<section class="mx-auto max-w-6xl px-6 py-28">
  <p class="text-sm uppercase tracking-[0.2em] text-primary">   <!-- eyebrow -->
  <h2 class="font-display text-4xl sm:text-5xl">                <!-- heading -->
  <div class="grid gap-8 md:grid-cols-N">                       <!-- even card grid -->
```

`About`, `Features`, `Gallery`, `Testimonials`, and `Cta` all use `max-w-6xl px-6 py-28`
with a left-aligned eyebrow/heading stack over an evenly divided grid of `rounded-3xl`
cards. Six near-identical bands stack vertically with no rhythm change.

Contributing defects:

1. **Section tones do not separate.** `Features` and `Testimonials` use `bg-muted/40`.
   On the `luxe` palette that composites to roughly `#1c1714` over a `#14110f` page —
   a few percent of lightness. There is no light band, no full-bleed break, no color block.
2. **The hero flattens its own photograph.** `bg-background/70` is a uniform scrim across
   the whole image, so the photo reads as flat brown. `justify-end` plus `pb-20` leaves
   dead space above a headline capped at `text-5xl sm:text-7xl` (4.5rem).
3. **The type scale is compressed.** h1 7xl / h2 5xl / h3 2xl / body lg. No editorial jump,
   so nothing on the page claims attention.
4. **Color is decorative only.** `primary` appears on eyebrows, stat values, and buttons.
   `accent` is read by no component at all.
5. **Evals encode the bias.** All three scenarios in `evals/scenarios.md` check config
   completeness, Pexels URL prefixes, and absence of hardcoded copy. None check composition,
   which is why this was invisible.

**Root cause:** the agent's only levers are copy, colors, and image URLs. `SiteConfig` has
no slot for layout. Adding design *advice* to `SKILL.md` cannot change the output, because
the template can only render one page. The fix must add capacity to the template and schema,
then give the agent a contract for using it.

## Guidance form

Per `superpowers:writing-skills` → "Match the Form to the Failure", this baseline failure is
*"complies, but output has the wrong shape"*. The prescribed form is a **positive recipe or
contract** — state what the output IS, its parts in order. The wrong form is a prohibition
list, which measurably backfires on shaping problems.

The current `SKILL.md` is entirely prohibitions ("Common mistakes", the Excuse/Reality table).
Those stay — they work, and they govern a genuine discipline failure (plumbing). The new
design guidance is written as a contract instead, and is kept separate from them.

## Design

### 1. Surface tokens derived in CSS, not by the agent

The agent already derives six hex values. Do not grow that job. Derive surfaces in
`index.css` with `color-mix`, so a visible step is guaranteed for every palette,
light or dark:

```css
@theme {
  --color-surface:  color-mix(in oklab, var(--site-background) 88%, var(--site-foreground) 12%);
  --color-raised:   color-mix(in oklab, var(--site-background) 78%, var(--site-foreground) 22%);
  --color-hairline: color-mix(in oklab, var(--site-background) 82%, var(--site-foreground) 18%);
}
```

`inverse` bands swap the two site variables outright (`background: foreground`,
`color: background`), producing a true light band on a dark page and vice versa. This is
the single largest visual win and requires no new agent input.

### 2. Section tone contract

Add `tone` to each section's config:

```ts
type SectionTone = 'base' | 'surface' | 'inverse' | 'accent' | 'image'
```

A `<Band>` wrapper component maps tone to classes so no component hand-rolls its background.

Composition rules — structural and checkable, stated as a contract:

- No two adjacent sections share a tone.
- Exactly one `inverse` band per page.
- At least one `image` band after the hero.
- `accent` is used at most once, normally the CTA.

### 3. Layout variants

Each section component gains a `variant` read from config. Three per section, no more —
enough for rhythm, few enough to implement and reason about.

| Section | Variants |
|---|---|
| Hero | `full-bleed`, `split`, `stacked` |
| About | `split`, `editorial`, `stat-led` |
| Features | `cards`, `numbered-rows`, `sticky-list` |
| Gallery | `even-grid`, `featured`, `offset` |
| Testimonials | `cards`, `spotlight`, `marquee` |
| Cta | `panel`, `full-bleed`, `oversized` |

Variants change layout only. They never change copy, and every variant reads the same
config fields, so switching one never invalidates `site.ts`.

### 4. Composition presets

Free variant choice produces incoherent pages. The agent picks one named preset by brand
mood, then may swap at most one variant. Presets live in `references/layout-system.md`.

| Preset | Hero | About | Features | Gallery | Testimonials | Cta |
|---|---|---|---|---|---|---|
| `editorial` | `split` | `editorial` | `numbered-rows` | `featured` | `spotlight` | `oversized` |
| `immersive` | `full-bleed` | `stat-led` | `sticky-list` | `offset` | `marquee` | `full-bleed` |
| `showcase` | `stacked` | `split` | `cards` | `even-grid` | `cards` | `panel` |

`showcase` is deliberately the current template's shape, kept as a valid restrained option
rather than the only one. Default when no mood cue matches: `editorial`.

Each preset ships a tone sequence satisfying the §2 contract, so the agent copies a known-good
arrangement instead of solving the constraint problem itself.

### 5. Type scale with real jumps

Replace ad-hoc `text-4xl sm:text-5xl` with a fluid scale in `@theme`:

| Token | Size | Use |
|---|---|---|
| `display` | `clamp(3rem, 10vw, 9rem)`, leading `0.92`, tracking `-0.03em` | hero headline only |
| `statement` | `clamp(2.25rem, 5.5vw, 4.5rem)` | the one statement moment |
| `heading` | `clamp(1.75rem, 3.2vw, 3rem)` | section headings |
| `sub` | `clamp(1.125rem, 1.6vw, 1.5rem)` | card titles, lead paragraphs |

Hero display roughly doubles at desktop (4.5rem → 9rem). Exactly one section per page uses
`statement` and each preset names which one — `About` for `editorial` and `showcase`, `Cta`
for `immersive`. Every other section heading uses `heading`.

### 6. Hero repair

- Replace the flat `bg-background/70` with a directional gradient
  (`from-background via-background/55 to-background/10`) so the photograph survives.
- Remove the `justify-end` + `pb-20` dead space; anchor the headline on a baseline grid.
- Add a slow GSAP scale/parallax on the hero image, guarded by `prefers-reduced-motion`.

### 7. Accent gets a job

`accent` currently renders nowhere. Give it defined structural roles: the `accent` band,
rule lines between `numbered-rows` items, the gallery featured-tile frame, and marquee
separators. Recorded in `layout-system.md` so it is not decorative drift.

## Files

**New**
- `references/layout-system.md` — the composition contract, variant table, presets, type scale
- `templates/motion-site/src/components/Band.tsx` — tone wrapper

**Changed**
- `SKILL.md` — new workflow step "choose a composition preset"; contract link; design-shaped
  additions to the mistakes table
- `references/content-schema.md` — `tone` and `variant` fields
- `references/color-system.md` — note that surfaces are CSS-derived, agent still supplies six
- `templates/motion-site/src/types/site.ts` — `SectionTone`, per-section `variant` unions
- `templates/motion-site/src/config/site.ts` — preset applied to the shipped example
- `templates/motion-site/src/index.css` — surface tokens, type scale
- All six section components — variant rendering via `Band`
- `evals/scenarios.md` — new composition scenario

## Testing

Per `superpowers:writing-skills`, add the failing check before the fix. A fourth eval
scenario asserting the composition contract (adjacent tones differ, one `inverse`, one
post-hero `image` band, one `statement`) fails against today's template and passes after.

Type-level enforcement carries the rest: `variant` and `tone` are string-literal unions, so
an invalid choice is a `tsc` error rather than a silent visual regression.

## Out of scope

- New motion techniques (pinned sections, scroll-driven type). The stack stays Lenis +
  Motion + GSAP ScrollTrigger.
- Multi-page routing, CMS, dark/light toggle.
- Any change to the Pexels URL-only rule or the "copy lives in site.ts" rule.
