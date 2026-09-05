# Animation patterns

Do not invent a second motion stack. Keep Lenis, Motion (`motion/react`), and GSAP ScrollTrigger.

| Library | Use for | Do not use for |
|---|---|---|
| Lenis | page-level smooth scrolling | element tweens |
| Motion (`motion/react`) | hero headline, nav, buttons, hover, page load | long scroll timelines |
| GSAP ScrollTrigger | section reveals, parallax image shift | button hover |

## Required on every generated site

- **Hero headline:** Motion `initial={{ y: 40, opacity: 0 }}` staggered by word or line.
- **Nav:** Motion fade/slide on load; active or hover underline.
- **Sections:** `useGsapReveal` on the section root. Mark heading and children with `data-reveal`.
- **Gallery images:** GSAP `yPercent` parallax from `-10` to `10`.
- **Buttons:** Motion `whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.98 }}`.

## Reduced motion

If `window.matchMedia('(prefers-reduced-motion: reduce)')` matches:

- Do not start Lenis.
- Do not run GSAP tweens or ScrollTrigger.
- Keep the static layout and config-driven content.

The template already implements this in `SmoothScroll` and `useGsapReveal`. Do not remove those guards.
