// `expect.element` and the browser-mode DOM matchers, used by `*.browser.test.ts`.
/// <reference types="@vitest/browser/matchers" />
// The same matchers for the jsdom tests, which get them from `vitest.setup.node.ts`.
/// <reference types="@testing-library/jest-dom/vitest" />

declare module '*.twig' {
  // The Vite plugin in `twing/vite-plugin-twig.mjs` defaults the context to `{}`,
  // so templates that read no variables can be rendered with no arguments.
  function template(opts?: Record<string, unknown>): string;
  export default template;
}

declare module 'jabber' {
  class jabber {
    /**
     * @param themeWords Custom words that need to appear in some density
     * @param themeWordDensity appearance of themeword 1 per this number so 5 will make it approx 1 per 5 words
     * @param extraVowels additional vowel chars
     * @param extraConsonants additional consonants
     */
    constructor(
      themeWords?: string[],
      themeWordDensity?: number,
      extraVowels?: string,
      extraConsonants?: string,
    );

    /** Create a fake email address, optionally on the given domain. */
    createEmail(customDomain?: string): string;

    /** Create fake full name */
    createFullName(salutation?: string): string;

    /** Create paragraph of certain number of words */
    createParagraph(length: number): string;

    /** Create word of certain length */
    createWord(
      length: number,
      capitalize?: boolean,
      avoidThemeWords?: boolean,
    ): string;
  }
  export = jabber;
}
