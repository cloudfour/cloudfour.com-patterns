declare module '*.twig' {
  function template(opts: Record<string, unknown>): string;
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
      extraConsonants?: string
    );

    /** Create email */
    createEmail(customDomain?: string): string;

    /** Create fake full name */
    createFullName(salutation?: string): string;

    /** Create paragraph of certain number of words */
    createParagraph(length: number): string;

    /** Create word of certain length */
    createWord(
      length: number,
      capitalize?: boolean,
      avoidThemeWords?: boolean
    ): string;
  }
  export = jabber;
}
