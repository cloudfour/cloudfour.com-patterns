---
'@cloudfour/patterns': major
---

Improved text wrapping for headings and subheadings.

This is a breaking change because it may disrupt existing techniques for avoiding orphans and widows in text (such as inserting `&nbsp;` or `<span class="u-inline-block">`). It's recommended to remove these workarounds.
