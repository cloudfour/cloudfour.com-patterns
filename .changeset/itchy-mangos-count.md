---
'@cloudfour/patterns': major
---

Change button default type to the browser's default. This is breaking because if you were using the button component in a form without a type property, then the default `type` has changed from `button` to `submit`, to match the browser's default behavior.
