/// <reference types="vite/client" />
import hljs from 'highlight.js';

// Load every sample as a string once. Vite resolves import.meta.glob at build time,
// which is why the pattern has to be a literal.
const samples: Record<string, string> = import.meta.glob('./samples/*', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const sampleKeys = Object.keys(samples);

/** `./samples/example.html` -> `example` */
const sampleName = (key: string) =>
  key
    .split('/')
    .at(-1)
    ?.replace(/\.[^.]+$/, '') ?? key;

/**
 * Retrieve a code sample from the samples directory.
 *
 * @param {string} [language='html'] The slug of the language to retrieve a
 * sample for.
 * @returns {string} The contents of the sample.
 */
const getSample = (language = 'html'): string => {
  const key = sampleKeys.find(
    (key) => key.includes(`${language}.`) || key.endsWith(`.${language}`)
  );
  // No sample for this language: highlight nothing rather than throwing.
  return key ? samples[key] : '';
};

/**
 * A list of supported language slugs.
 */
export const availableSamples = sampleKeys.map(sampleName);

/**
 * Syntax highlighting demo
 *
 * @param {object} args Demo options
 * @param {string} [args.language='html'] The slug of the language sample to
 * return a demo for.
 * @returns {string} A highlighted HTML snippet.
 */
export const highlightDemo = ({ language = 'html' }) => {
  const sample = getSample(language);
  // To improve accuracy, we use the language slug to explicitly set the
  // language, but only if Highlight reports that it supports that language.
  // Otherwise, we just fall back to auto-detecting the language.
  const highlighted = hljs.getLanguage(language)
    ? hljs.highlight(sample, { language })
    : hljs.highlightAuto(sample);
  return `<pre><code class="language-${language}">${highlighted.value}</code></pre>`;
};
