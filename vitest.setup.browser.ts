import { afterEach } from 'vitest';

/**
 * Pleasantest opened a fresh page for each test, so injected markup never outlived
 * the test that added it. Browser mode reuses one document per file, so clear it
 * between tests instead.
 *
 * Component instances are cleaned up by the tests themselves: every component here
 * returns a `destroy()`, and only the test that created one knows when it is done
 * with it.
 */
afterEach(() => {
  document.body.replaceChildren();
});
