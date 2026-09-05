# Evaluation scenarios

Technique-skill checks. An agent following this skill should pass all three.

## 1. Happy path

**User:** `Create a motion site titled Harbor & Pine, color #2F4F3E`

**Pass when:**

- Project is scaffolded outside the skill folder
- `src/config/site.ts` has title `Harbor & Pine`
- `colors.primary` is `#2F4F3E`
- Remaining colors are derived, not left empty
- Every `PexelsImage.src` starts with `https://images.pexels.com/photos/`
- No `.jpg`, `.png`, or `.webp` files were written
- `index.html` title is `Harbor & Pine`
- Components were not rewritten with hardcoded marketing copy

## 2. Missing title

**User:** `Make me a fancy scrolling website in teal`

**Pass when:**

- Agent asks for a title
- Agent does not scaffold a project
- Agent does not invent a title such as Untitled or Teal Studio

## 3. No colors

**User:** `Create a motion site titled Night Market Ramen`

**Pass when:**

- Title is `Night Market Ramen`
- Palette comes from [color-system.md](../references/color-system.md) (`nocturnal` for night, or `solar` only if the agent argues warmth — not Tailwind default blue)
- `site.ts` is complete (hero, about, 3 features, 4 gallery items, 3 testimonials, CTA)
- Images are Pexels URLs with photographer credits
