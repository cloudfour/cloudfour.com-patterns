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

/**
 * Really simple and not at all resilient method of expanding a range string in
 * the manner used by the Syntax-highlighting Code Block WordPress plugin. There
 * are much more sophisticated ways to do this but this seemed reasonable for
 * the purposes of demonstration.
 *
 * @example
 * expandRange('1,3,4,5') // => [1, 3, 5]
 * @example
 * expandRange('1,3-5') // => [1, 3, 4, 5]
 * @param {string} rangeString The string to expand.
 * @returns {number[]} An array of distinct numbers.
 */
const expandRange = (rangeString = '') => {
  // If the string is empty or the wrong type, fall back to an empty array
  if (typeof rangeString !== 'string' || rangeString.trim().length === 0) {
    return [];
  }
  // Split the string by commas
  const segments = rangeString.split(',').map((segment) => {
    // Split this segment by dashes and drop any empty items
    const span = segment.split('-').filter((item) => item.trim().length > 0);
    // If there aren't at least two segments in this range, parse and return
    // the whole segment on its own.
    if (span.length < 2) {
      return Number.parseInt(segment, 10);
    }

    // Parse the first item in the span
    const min = Number.parseInt(span[0], 10);
    // Parse the last item in the span
    const max = Number.parseInt(span[span.length - 1], 10);
    // Build a new array starting from the min through the max
    const steps = [];
    for (let i = min; i <= max; i++) {
      steps.push(i);
    }

    // Return the array of expanded steps
    return steps;
  });
  // Flatten the result and filter out any bad numbers
  return segments.flat().filter((segment) => !Number.isNaN(segment));
};

/**
 * Syntax highlighting demo that attempts to mimic the output markup of the
 * Syntax-highlighting Code Block plugin for WordPress.
 *
 * @param {object} args Demo options
 * @param {string} [args.language='html'] The slug of the language sample to
 * return a demo for.
 * @param {string} [args.highlightedLines=''] Lines to highlight. Separate
 * multiple lines with a comma, ranges with a dash.
 * @param {boolean} [args.showLineNumbers=false] Number each line of the sample.
 * @param {boolean} [args.wrapLines=false] Allow lines of code to wrap instead
 * of scroll.
 * @param {string} [args.className=''] Additional classes to attach to the
 * containing element. If this includes `wp-block-code`, a container is output
 * to better approximate the experience.
 * @returns {string} A highlighted HTML snippet.
 */
export const shcbDemo = ({
  language = 'html',
  highlightedLines = '',
  showLineNumbers = false,
  wrapLines = false,
  className = '',
}) => {
  const sample = getSample(language);
  // We'll later want to refer to this language's meta properties
  const hlLanguage = hljs.getLanguage(language);
  // Same highlight logic as the `highlightDemo` but using the saved language.
  const highlighted = hlLanguage
    ? hljs.highlight(sample, { language })
    : hljs.highlightAuto(sample);
  // Determine a language name based on whether or not the language is supported
  const languageName = hlLanguage ? hlLanguage.name : language;
  // Class names to use on the `code` element
  const codeClasses = ['hljs', `language-${language}`];
  // Attributes to use on the `pre` element
  const preAttr = [
    'aria-describedby="shcb-language-example"',
    `data-shcb-language-name="${languageName}"`,
    `data-shcb-language-slug="${language}"`,
  ];
  // Store the initial highlighted value
  let content = highlighted.value;

  // Add `class` to the `pre` attributes if present and not empty
  if (className.trim().length > 0) {
    preAttr.push(`class="${className}"`);
  }

  // If options are selected that necessitate SHCB's "code table" markup...
  if (highlightedLines || showLineNumbers) {
    // Add the necessary classes to `code`
    codeClasses.push('shcb-code-table');
    // Populate an array of indices to highlight, reducing each by `1` so it
    // corresponds to a zero index.
    const highlightedIndices = expandRange(highlightedLines).map((i) => i - 1);
    // Modify the content to allow line-specific adjustments...
    content = content
      .trim() // Remove trailing lines
      .split('\n') // Split each line into an array
      .map((line, i) => {
        // Use a `mark` to contain this line if it is highlighted
        const tagName = highlightedIndices.includes(i) ? 'mark' : 'span';
        // Wrap the line in two elements per SHCB behavior
        return `<${tagName} class="shcb-loc"><span>${
          line.trim().length === 0 ? '\n' : line
        }</span></${tagName}>`;
      })
      .join('\n'); // Rejoin lines
  }

  // Add class if line numbers are shown
  if (showLineNumbers) {
    codeClasses.push('shcb-line-numbers');
  }

  // Add class if lines are meant to wrap
  if (wrapLines) {
    codeClasses.push('shcb-wrap-lines');
  }

  // Build an array of result segments. Since most of these need to be on a
  // single line, this array just keeps things a bit more readable.
  const resultSegments = [
    `<pre ${preAttr.join(' ')}>`,
    '<div>',
    `<code class="${codeClasses.join(' ')}">${content}</code>`,
    '</div>',
    '<small class="shcb-language" id="shcb-language-example">',
    '<span class="shcb-language__label">Code language:</span> ',
    `<span class="shcb-language__name">${languageName}</span> `,
    '<span class="shcb-language__paren">(</span>',
    `<span class="shcb-language__slug">${language}</span>`,
    '<span class="shcb-language__paren">)</span>',
    '</small>',
    '</pre>',
  ];

  // If the `className` property includes `wp-block-code`, we include a
  // containing element. Otherwise, it would be very difficult to find bugs
  // ahead of time since the negative margins would pull the block outside the
  // visible canvas.
  if (className.includes('wp-block-code')) {
    resultSegments.unshift(
      '<div class="o-container o-container--prose o-container--pad">',
      '<div class="o-container__content">'
    );
    resultSegments.push('</div>', '</div>');
  }

  // Join the segments and return the result
  return resultSegments.join('');
};
