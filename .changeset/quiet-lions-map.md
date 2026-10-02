---
'@cloudfour/patterns': patch
---

Use logical CSS where it was still physical: `overflow-inline` instead of `overflow-x`, and `vi`/`vb` instead of `vw`/`vh` for fluid sizing, viewport breakouts, conditional border radii and the Cloud Cover and Ground Nav illustrations. Replace deprecated `grid-gap`, `grid-row-gap` and `grid-column-gap` with `gap`, `row-gap` and `column-gap`, and remove the legacy `clip` fallback from the screen-reader-only styles.
