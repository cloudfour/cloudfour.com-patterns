import { basename, extname } from 'path';

import hljs from 'highlight.js';

// Load samples from directory and retrieve keys once
const samplesDir = require.context('!!raw-loader!./samples', false);
const sampleKeys = samplesDir.keys();

/**
 * Retrieve a code sample from the samples directory.
 *
 * @param {string} [language='html'] The slug of the language to retrieve a
 * sample for.
 * @returns {string} The contents of the sample.
 */
const getSample = (language = 'html') => {
  const key = sampleKeys.find(
    (key) => key.includes(`${language}.`) || key.endsWith(`.${language}`)
  );
  return key && samplesDir(key).default;
};

/**
 * A list of supported language slugs.
 */
export const availableSamples = sampleKeys.map((key) =>
  basename(key, extname(key))
);

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
