---
'@cloudfour/patterns': minor
---

Update the Deck object to better handle the WordPress block alignment styles `alignwide` and `alignfull`. By default, these would pull the Deck content flush with the edge of the screen and even clip a bit in certain circumstances. To resolve this, we add some padding to prevent the content from going full-bleed.
