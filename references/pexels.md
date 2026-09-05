# Pexels images (URL only)

Use free Pexels photos. Store URLs and credits in `src/config/site.ts`. Never download image bytes.

## How to pick images

1. Derive 1–2 subject keywords from the title (for example `Harbor & Pine` → coastal forest, boats, timber interiors).
2. Search Pexels in the browser or via web search for those keywords.
3. Copy the CDN URL into config. Preferred form:

```
https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w={width}
```

4. Copy photographer name, photographer profile URL, and photo page URL into the same `PexelsImage` object.

## Widths

| Placement | `w` |
|---|---|
| Hero | `1600` |
| About | `1200` |
| Gallery | `1000` |
| Feature | `800` |

## Hard rules

- `src` must start with `https://images.pexels.com/photos/`.
- Never download. Forbidden: `curl -O`, `wget`, `fetch` + `writeFile`, saving into `public/`, committing `.jpg` / `.png` / `.webp`.
- Every image needs `alt`, `photographer`, `photographerUrl`, and `pageUrl`.
- Footer or `ImageCredit` must render `Photo by {name} on Pexels`.
- Prefer landscape for hero and about. Mix orientations in the gallery.
- Do not reuse the same photo ID twice on one site.

## Fallback IDs

Use these only when Pexels search is unavailable. Still write full credit fields. Do not use the same ID twice.

| ID | Subject | Photographer | Profile | Page |
|---|---|---|---|---|
| 2014422 | landscape / desert | Joey Farina | https://www.pexels.com/@joey | https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/ |
| 325185 | architecture / city | Aleksandar Pasaric | https://www.pexels.com/@apasaric | https://www.pexels.com/photo/view-of-cityscape-325185/ |
| 2749928 | ocean / sunset | David Frampton | https://www.pexels.com/@david-frampton-1235333 | https://www.pexels.com/photo/photo-of-ocean-during-sunset-2749928/ |
| 417074 | nature / lake | James Wheeler | https://www.pexels.com/@souvenirpixels | https://www.pexels.com/photo/lake-and-mountain-417074/ |
| 1029604 | nature / texture | Scott Webb | https://www.pexels.com/@scottwebb | https://www.pexels.com/photo/green-leafed-plants-1029604/ |
| 1643383 | interior | Vecislavas Popa | https://www.pexels.com/@vecislavas-popa-59051 | https://www.pexels.com/photo/living-room-interior-1643383/ |
| 1571460 | interior | Vecislavas Popa | https://www.pexels.com/@vecislavas-popa-59051 | https://www.pexels.com/photo/white-wooden-cabinet-beside-white-wooden-chair-1571460/ |
| 3184291 | people / work | fauxels | https://www.pexels.com/@fauxels | https://www.pexels.com/photo/photo-of-people-doing-handshakes-3184291/ |
| 3184360 | people / meeting | fauxels | https://www.pexels.com/@fauxels | https://www.pexels.com/photo/photo-of-people-near-wooden-table-3184360/ |
| 380769 | architecture | Pixabay | https://www.pexels.com/@pixabay | https://www.pexels.com/photo/architecture-buildings-business-city-380769/ |
| 373543 | abstract / light | Pixabay | https://www.pexels.com/@pixabay | https://www.pexels.com/photo/blue-and-purple-lights-373543/ |
| 1640777 | food | Ella Olsson | https://www.pexels.com/@ella-olsson-572949 | https://www.pexels.com/photo/flat-lay-photography-of-variety-of-dishes-1640777/ |

CDN pattern for any row: `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w={width}`
