# creating-motion-site

A [Cursor](https://cursor.com) and [Claude Code](https://claude.com/claude-code) skill that scaffolds a **single-page motion website** from a required title and optional colors. All copy, colors, and Pexels image URLs live in `src/config/site.ts`. Components only read that file.

Not a horizontal-scroll résumé camera (that is scroll-portfolio). Not a data scrollytelling article.

## Install

Claude Code:

```bash
git clone https://github.com/KanchanaSW/creating-motion-site ~/.claude/skills/creating-motion-site
```

Cursor:

```bash
git clone https://github.com/KanchanaSW/creating-motion-site ~/.cursor/skills/creating-motion-site
```

Or, from a local checkout, symlink into both runtimes:

```bash
chmod +x scripts/install.sh
./scripts/install.sh
```

That links:

- `~/.cursor/skills/creating-motion-site` — Cursor
- `~/.claude/skills/creating-motion-site` — Claude Code

Both runtimes pick up `SKILL.md` on the next session. Then, in any project:

1. Give a **title** (required). Colors are optional — hex, names, or omit them and the skill picks a mood palette.
2. Ask:

> Create a motion site titled Harbor & Pine

> Create a motion site titled Nova Lab, colors #0B0B0F and #7CFF6B

Title is required. The agent must ask and stop if you omit it.

## What's in the box

```
SKILL.md                         inputs, workflow, hard rules
references/content-schema.md     SiteConfig types and field rules
references/color-system.md       hex parsing + mood palettes
references/pexels.md             URL-only images + photographer credits
references/section-recipes.md    copy lengths, nav, section ids
references/animations.md         Lenis, Motion, GSAP roles
templates/motion-site/           Vite + React + Tailwind starter
evals/scenarios.md               happy path / missing title / no colors
scripts/install.sh               dual-runtime symlink
```

## What the skill builds

A vertical single page with hash links (`#hero`, `#about`, `#gallery`, `#contact`). No React Router.

The agent copies `templates/motion-site/` into the output directory, invents copy from the title, and writes colors plus Pexels CDN URLs into `src/config/site.ts`. After generation, edit that file only.

Motion stack (do not add another library):

| Library | Role |
|---|---|
| Lenis | page-level smooth scrolling |
| Motion (`motion/react`) | hero words, nav, button hover |
| GSAP ScrollTrigger | section reveals, gallery parallax |

Images stay as `https://images.pexels.com/photos/...` URLs with `Photo by {name} on Pexels` credits — never downloaded. For `prefers-reduced-motion`, Lenis and GSAP never start.

## After install

Restart Cursor / start a new Claude Code session so the skill is in the catalog. Give a title and ask to scaffold a motion site. The agent should read `SKILL.md`, then `references/content-schema.md` and `references/animations.md`, before writing config.

## Credits

- Format and skill by [Kanchana Walagambahu](https://github.com/KanchanaSW).

## License

MIT — see [LICENSE](LICENSE).
