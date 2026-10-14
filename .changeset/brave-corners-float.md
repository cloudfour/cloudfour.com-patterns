---
'@cloudfour/patterns': patch
---

Use logical CSS for corner radii and floats: `border-start-start-radius` and friends instead of `border-top-left-radius` in the Alert, Calendar Date and Input Group patterns, and `float`/`clear` `inline-start`/`inline-end` instead of `left`/`right` in Hype Group and the WordPress image and Jetpack contact form styles. Remove the physical `float` fallbacks from the float utilities.
