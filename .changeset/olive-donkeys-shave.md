---
'@cloudfour/patterns': patch
---

Publish releases via npm trusted publishing (OIDC) instead of a stored token.

There are no functional changes to the package. From this release onward,
published versions carry a provenance attestation linking the tarball to the
workflow run and commit that produced it.
