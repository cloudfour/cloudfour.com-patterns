---
'@cloudfour/patterns': minor
---

`o-deck` automatically creates columns so sometimes there are multiple columns when only 1 column is desired. The `o-deck--X-column@Y` modifier has been updated so we can specify when we want 1 column.

When using multiple media objects inside of a deck, some media objects were top-aligned and some were middle-aligned. To fix the mismatched alignment, we've also added the `o-deck--align-start` modifier, which forces all content to align-top.
