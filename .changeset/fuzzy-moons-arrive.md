---
'@cloudfour/patterns': patch
---

Make every published file reachable through Node resolution. `exports` was a bare string pointing at the browser bundle, and defining `exports` at all encapsulates every other subpath — so of the 360 files in the tarball, exactly one could be resolved. Requiring the compiled design tokens failed with `ERR_PACKAGE_PATH_NOT_EXPORTED`, and so did reading our own `package.json`, which is something tooling routinely does to a dependency.

`files` and `exports` disagreed about what the public API is, and `files` is the field expressing the intent: we deliberately publish `/dist`, the compiled tokens, the Sass partials, the Twig templates and the assets. `exports` now mirrors that shape, so what we ship and what a consumer can reach are the same set.

The subpath patterns are written per extension rather than as a blanket `./src/*`, which keeps stories and tests encapsulated even for a consumer resolving against a working tree rather than an installed tarball. `files` remains the authority on the exact file list.

Widening `exports` cannot break an import that already worked, and the published file list is byte-for-byte unchanged — only reachability changes. Sass is unaffected in both directions: it compiles identically before and after via both `loadPaths` and the `pkg:` importer, because neither route enforces the export map for stylesheets.

Also adds a `types` condition to the main entry. Under `node16`/`nodenext`/`bundler` module resolution, TypeScript reads types through `exports` and ignores the top-level `types` field, so consumers on those settings were getting `any` — TypeScript reported "There are types at dist/cloudfour-patterns.d.ts, but this result could not be resolved when respecting package.json exports". This was already true before this change; it is fixed here because it is the same field and the same root cause. What the main entry resolves to at runtime is unchanged.
