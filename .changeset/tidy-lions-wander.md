---
'@cloudfour/patterns': minor
---

Make the font directory configurable. `base/fonts` now exposes a `$dir` variable, so the location of the font files can be overridden with `@use '@cloudfour/patterns/src/base/fonts' with ($dir: '/my/path')`. The default is unchanged, and the font URLs in `dist/standalone.css` are byte-for-byte identical.
