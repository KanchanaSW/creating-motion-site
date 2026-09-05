# Content schema

`src/config/site.ts` is the only file a user should edit to change copy, colors, or images. Components read `siteConfig`. They never contain marketing headlines, body copy, button labels, or image URLs.

## Types

Import `SiteConfig` from `src/types/site.ts`. The generated `siteConfig` object must satisfy that type.

### Required

| Field | Notes |
|---|---|
| `title` | Site name. Also used for `index.html` and `document.title`. |
| `tagline` | Short supporting line (6–12 words). |
| `colors` | All six hex keys: `background`, `foreground`, `primary`, `secondary`, `accent`, `muted`. |
| `nav` | Hash links only. Hrefs must match section ids. |
| `hero` | Eyebrow, headline, subheadline, primary CTA, Pexels image. `secondaryCta` is optional. |
| `about` | `id` must be `about`. Include body, stats, image. |
| `features` | `id` must be `features`. Exactly 3 items. |
| `gallery` | `id` must be `gallery`. Exactly 4 items. |
| `testimonials` | `id` must be `stories`. Exactly 3 items. |
| `cta` | `id` must be `contact`. |
| `footer` | Blurb plus links. |

### Optional

- `hero.secondaryCta`
- `FeatureItem.image`

### `PexelsImage` (required on every image)

- `src` — must start with `https://images.pexels.com/photos/`
- `alt`
- `photographer`
- `photographerUrl`
- `pageUrl`

## Nav hashes

Use these ids and matching `href` values:

| Section | `id` | `href` |
|---|---|---|
| Hero | `hero` | `#hero` |
| About | `about` | `#about` |
| Features | `features` | `#features` |
| Gallery | `gallery` | `#gallery` |
| Testimonials | `stories` | `#stories` |
| CTA | `contact` | `#contact` |

## Generation rules

- Invent all copy from the user's title. No lorem ipsum. No `TODO` copy.
- Do not move copy into JSX after generating it.
- Do not add fields the components do not read.
- Keep hex colors as `#RRGGBB`.
