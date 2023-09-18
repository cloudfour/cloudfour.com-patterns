---
'@cloudfour/patterns': patch
---

Disable calc optimization in minified stylesheet. This addresses a warning when `calc` included a `clamp` function, and very slightly reduces the size of the stylesheet when compressed.
