---
'@cloudfour/patterns': patch
---

Fix Footnote Link failing to render under Twig 3, which removed the `spaceless` tag. The template now uses the `spaceless` filter, which Twig has supported since 2.9. Rendered output is unchanged.
