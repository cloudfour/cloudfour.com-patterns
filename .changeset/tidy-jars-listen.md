---
'@cloudfour/patterns': patch
---

Load `src/index-with-dependencies.scss` with `@use` rather than `@import`, which Dart Sass 3 removes. This was the last `@import` in the repo.

Compiled output loses seven duplicate `@font-face` rules and nothing else. `@use` loads each stylesheet once, so the fonts configured at the top of the file are emitted a single time; under `@import` they came out twice, because `./index` loads `base/fonts` as well and an `@import` does not share the module graph with the file importing it. Every surviving rule is byte-for-byte one of the originals, in the same order, and all other CSS is byte-for-byte identical — 1,245 bytes smaller in the Storybook build.
