---
'@cloudfour/patterns': patch
---

Fix Sky Nav rendering permanently open with no toggle button when its markup is injected as a string rather than parsed by the browser. The `no-js` class is normally cleared by an inline `<script>`, which never runs in that case, so `initSkyNav` now clears it as well.
