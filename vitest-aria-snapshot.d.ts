export {};

/**
 * `@vitest/browser` types every jest-dom matcher as returning the assertion's `R`
 * type parameter, which `expect.element()` binds to `Promise<void>` so the call can
 * be awaited. The two ARIA snapshot matchers are typed `=> void` instead, so
 * `await expect.element(...).toMatchAriaInlineSnapshot(...)` reads as awaiting a
 * non-Promise and trips `@typescript-eslint/await-thenable`.
 *
 * They do return promises at runtime -- their own JSDoc examples await them -- so
 * this restates the two signatures with the return type the rest of the matchers
 * use. Remove it once `@vitest/browser` types them as `R`.
 *
 * @see https://github.com/vitest-dev/vitest/blob/main/packages/browser/jest-dom.d.ts
 */
declare module 'vitest' {
  // Merging into an existing declaration is what this file is for, and only an
  // `interface` can do that -- a `type` cannot be reopened.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Assertion<R extends void | Promise<void>, T> {
    toMatchAriaSnapshot(): R;
    toMatchAriaInlineSnapshot(inlineSnapshot?: string): R;
  }
}
