# Color system

Produce a complete `SiteColors` object for `siteConfig.colors`. Never leave a color as a Tailwind default and never ship an incomplete palette.

## Workflow

1. **One hex** — treat it as `primary`. Derive:
   - `secondary`: same color with hue shifted +40 degrees
   - `accent`: complement (hue +180) or a warmer analog (hue +25) if the complement is neon or muddy
   - `background`: if primary luminance is high, use a near-cream (`#FAF7F2`–`#FFF7ED`); if low, use a near-black (`#0B0C10`–`#14110F`)
   - `foreground`: contrast-safe opposite of background
   - `muted`: mix background toward foreground at about 30%
2. **Two hexes** — map to `primary` then `secondary`. Derive `accent`, `background`, `foreground`, `muted`.
3. **Three or more hexes** — map in order: `primary`, `secondary`, `accent`. Derive the remainder.
4. **Named colors** (`sage`, `gold`, `teal`) — resolve to hex first, then follow the matching step above.
5. **No colors** — classify the title into one mood and copy that palette exactly. Do not invent a new palette when a mood matches.

## Mood palettes

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

Food, restaurants, and markets often fit `solar` (warm) or `nocturnal` (night market, ramen after dark). Pick the closer cue; do not use Tailwind default blue.

## Contrast

Foreground-on-background and primary-on-background text must stay readable.

- If a derived pair is low-contrast, flip `foreground` to `#FFFFFF` (dark backgrounds) or `#111111` (light backgrounds).
- Do not ship a pastel-on-pastel hero.
- Buttons using `primary` on `background` must keep a clear edge. If they collapse, darken `primary` or lighten `background`.
