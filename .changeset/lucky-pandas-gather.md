---
'@cloudfour/patterns': patch
---

Stop publishing `src/index-with-dependencies.scss`. It is a Storybook-only entry point, and `files` already excludes its sibling `src/index.scss` for the same reason — this was the exclusion being one file short rather than a deliberate choice.

No consumer can have been using it. It loads `@wordpress/block-library` through `../node_modules/`, which resolves inside our own package directory, and that is a devDependency we never install for anyone else; it then loads `./index`, which `files` deliberately excludes; and it configures the font directory as `/src/assets/fonts`, a root-absolute path that only means anything while Vite is serving Storybook. Compiling it from an installed tarball fails on the first of those three.

The tarball goes from 361 files to 360, and nothing else changes. Storybook reads the file from the working tree, so it is unaffected.
