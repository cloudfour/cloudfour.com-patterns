---
'@cloudfour/patterns': patch
---

Drop the `engines.node` field, so installing the package no longer declares a Node requirement. Nothing in the published `files` runs on Node — the package ships CSS, Sass, Twig templates, assets and a browser bundle — so the field was only ever gating installation, and it was gating it on `>=12.16.3`, a floor nobody chose deliberately. Removing a restriction cannot break an install that worked before.

`.nvmrc` and the pinned Node version in CI are what actually control the development environment, and neither changes.
