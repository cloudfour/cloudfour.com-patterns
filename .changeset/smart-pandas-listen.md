---
'@cloudfour/patterns': patch
---

Shrink the UMD bundles. Rollup 4 tree-shakes the generated design-token module, which Sky Nav reads three values from, so `dist/cloudfour-patterns.js` drops from 116KB to 21KB and `dist/cloudfour-patterns.min.js` from 37KB to 7.8KB. The ESM bundle is byte-for-byte unchanged and the exports are identical in all three.
