---
'@cloudfour/patterns': patch
---

Restore the `viewBox` on the SVGs inlined into `dist/standalone.min.css`. The minifier had been stripping it, so those backgrounds could not scale the way the unminified stylesheet's could. Colour and geometry are otherwise unchanged; the file is around 227 bytes larger gzipped.

The generated token files also lose the build timestamp from their header comment, which makes them identical between builds, and each token in `src/compiled/tokens/js/` gains a `key` field. No token value changed.
