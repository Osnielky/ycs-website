# Before / During / After images

Transformation photos for procedure **landing pages** (see `src/data/landings.ts`).

## Facelift gallery

The facelift landing page (`/procedures/facelift`) expects these files. Until a
file exists, the gallery shows a branded "Photo coming soon" placeholder — drop
the real file in at the exact path and it appears automatically, no code change.

| Case | Before | During | After |
|---|---|---|---|
| 1 | `facelift-1-before.webp` | `facelift-1-during.webp` | `facelift-1-after.webp` |
| 2 | `facelift-2-before.webp` | `facelift-2-during.webp` | `facelift-2-after.webp` |
| 3 | `facelift-3-before.webp` | `facelift-3-during.webp` | `facelift-3-after.webp` |

## Image specs (important)

The gallery renders each image in a **3:4 portrait** frame with `object-cover`,
so images are **center-cropped to portrait**. To avoid cutting off the jawline /
neckline, provide portrait-oriented photos:

- **Aspect ratio:** 3:4 (portrait)
- **Recommended size:** 900 × 1200 px (or 600 × 800 px minimum)
- **Format:** `.webp`
- Frame the face/neck centered so a portrait crop keeps the relevant area.

## Path convention (for future promos)

`/<before-after>/<slug>-<caseNumber>-<stage>.webp`
where `stage` is one of `before`, `during`, `after`. Reference these paths in the
`transformations` array of the procedure's entry in `src/data/landings.ts`.
