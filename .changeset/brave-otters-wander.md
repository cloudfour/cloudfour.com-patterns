---
'@cloudfour/patterns': patch
---

Stop publishing three Storybook demo fixtures — `defaultArgs`, `defaultArgTypes` and `generateGroundNavProps`. They come from `ground-nav-args.js`, which only the Ground Nav stories import, and they reached the bundle because the build's entry glob excluded `.stories.` and `.test.` files but not `-args.` ones. They were never documented or intended as API, and nothing a consumer would want can be done with them.

The four real exports — `createElasticTextArea`, `createSubscribe`, `initCommentReplyForm` and `initSkyNav` — are byte-for-byte unchanged, and `dist/standalone.css` and `dist/standalone.min.css` are untouched. Dropping the fixtures takes `dist/cloudfour-patterns.min.js` from 7.8KB to 4.1KB (2.7KB to 1.5KB gzipped), the ESM bundle from 9.4KB to 5.9KB, the UMD bundle from 21KB to 15KB, and the type declarations from 8.0KB to 1.6KB.
