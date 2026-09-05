# creating-motion-site

Cursor and Claude skill that scaffolds a single-page motion website from a **title** (required) and optional colors.

## Install

- **Cursor (project):** this folder at `.cursor/skills/creating-motion-site/`
- **Claude Code (project):** symlink or copy to `.claude/skills/creating-motion-site/`
- **Personal:** copy the folder to `~/.cursor/skills/creating-motion-site/` or `~/.claude/skills/creating-motion-site/`

## Usage

```
Create a motion site titled Harbor & Pine
Create a motion site titled Nova Lab, colors #0B0B0F and #7CFF6B
```

Title is required. Colors are optional — the skill picks a matching mood palette when you omit them.

After generation, edit copy, colors, and image URLs in:

```
src/config/site.ts
```

Images are Pexels CDN URLs. They are not downloaded into the project.

## Stack

Vite, React, TypeScript, Tailwind CSS v4, Motion, GSAP, Lenis.
