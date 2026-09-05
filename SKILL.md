---
name: creating-motion-site
description: Use when the user wants a new single-page motion website, scroll-animated landing page, Framer Motion or GSAP marketing site, or asks to generate a Vite React Tailwind site from a title and optional colors.
---

# Creating a motion site

Scaffold the bundled Vite template, then write all copy, colors, and Pexels image URLs into `src/config/site.ts`. Components already read that file.

## Inputs

- **Required:** `title`
- **Optional:** colors (hex or names), output directory (default: kebab-case title at the workspace root)

If the title is missing, ask once and stop. Do not invent a title. Do not scaffold.

## Workflow

Follow these steps in order. Do not skip.

1. Confirm the title. Parse colors or choose a mood palette from [references/color-system.md](references/color-system.md).
2. Copy `templates/motion-site/` to the output directory. Do not scaffold inside this skill folder.
3. Generate all copy from the title using [references/section-recipes.md](references/section-recipes.md).
4. Select Pexels CDN URLs using [references/pexels.md](references/pexels.md). Never download images.
5. Write `src/config/site.ts` so it satisfies `SiteConfig` in [references/content-schema.md](references/content-schema.md).
6. Set `index.html` `<title>` to the site title.
7. Keep the template animation stack. See [references/animations.md](references/animations.md). Do not add another library.
8. Run `npm install && npm run dev` in the output directory.
9. Tell the user: title, colors used, config path (`src/config/site.ts`), and that copy and images are edited there.

## Hard rules

- Title is required. No title → ask and stop.
- All user-facing copy, colors, nav, CTAs, and image metadata live in `src/config/site.ts` only.
- Images are Pexels URLs. Never `curl`, `wget`, or save image bytes.
- Single page only. Hash links, no React Router.
- Keep Lenis, Motion (`motion/react`), and GSAP ScrollTrigger.
- Credit every photographer (`Photo by {name} on Pexels`).

## Common mistakes

- Hardcoding a headline in `Hero.tsx`
- Saving images under `public/`
- Skipping colors when the user omitted them (pick a mood palette)
- Adding React Router
- Replacing Motion/GSAP with CSS-only fades
- Leaving lorem ipsum in `site.ts`

| Excuse | Reality |
|---|---|
| "I'll add copy in the component and move it later" | Copy in JSX is a failed run. Put it in `site.ts` first. |
| "Downloading is more reliable than a hotlink" | The skill forbids downloads. Use the Pexels CDN URL. |
| "No title, I'll name it Untitled" | Stop and ask. Title is required. |
| "User skipped colors so I'll use Tailwind defaults" | Pick a mood palette from `color-system.md`. |
| "Router will make it more complete" | Single page only. Anchor links. |
