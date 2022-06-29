---
'@cloudfour/patterns': major
---

Enhances the Subscribe component's ability to programmatically control its UI via 
`destroy()`/`init()` methods

- `init()` must now be explicitly called to initialize
- `destroy()` hides CTA buttons UI, shows digests sign up form

```js
// Initialize
const subscribe = createSubscribe(document.querySelector('.js-subscribe'));
subscribe.init();

// Remove all event listeners, show subscription form
subscribe.destroy();
```
