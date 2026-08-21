---
'@cloudfour/patterns': patch
---

Keep the `viewBox` on the SVGs inlined into `dist/standalone.min.css`. The minifier had been stripping it, so the minified bundle no longer matched the unminified one it is built from. Rendering is unchanged — compared pixel for pixel, the two differ only by antialiasing — but the bundle is now a faithful minification of its source, and around 227 bytes larger gzipped.

The generated token files also lose the build timestamp from their header comment, which makes them identical between builds, and each token in `src/compiled/tokens/js/` gains a `key` field. No token value changed.
