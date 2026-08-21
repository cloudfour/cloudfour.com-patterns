---
'@cloudfour/patterns': patch
---

Drop the `xmlns` attribute from the templatized SVG partials in `src/assets`. These files are only ever included inline into HTML, where the namespace is implied — it is required on standalone SVG documents. The optimizer had been configured to remove it for years, but in a format it silently ignored.

The same partials also pick up small coordinate rounding differences from a newer SVGO. Rendered and compared pixel for pixel, 55 of the 72 are unchanged and the largest difference in the rest is 0.53% of pixels at the edges of curves.
