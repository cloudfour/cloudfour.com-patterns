---
'@cloudfour/patterns': major
---

Revised WordPress alignment styles based on actual content needs. Changes include:

- Some blocks that previously required `alignwide` to fill container padding now do so by default.
- `aligncenter` may be used to prevent a block from filling container padding.
- `alignwide` now maxes out at the size of our default Container component `max-width` rather than an arbitrary value.
- Margin, padding and inline size tweaks have been made to the Image and Group block styles as well as paragraphs with background colors.
