import { basename, extname } from 'path';

import hljs from 'highlight.js';

const samplesDir = require.context('!!raw-loader!./samples', false);
const sampleKeys = samplesDir.keys();

const getSample = (language = 'html') => {
  const key = sampleKeys.find(
    (key) => key.includes(`${language}.`) || key.endsWith(`.${language}`)
  );
  return key && samplesDir(key).default;
};

export const availableSamples = sampleKeys.map((key) =>
  basename(key, extname(key))
);

export const highlightDemo = ({ language = 'html' }) => {
  const sample = getSample(language);
  const highlighted = hljs.getLanguage(language)
    ? hljs.highlight(sample, { language })
    : hljs.highlightAuto(sample);
  return `<pre><code class="language-${language}">${highlighted.value}</code></pre>`;
};

const expandRange = (rangeString = '') => {
  if (typeof rangeString !== 'string' || rangeString.trim().length === 0) {
    return [];
  }
  const segments = rangeString.split(',').map((segment) => {
    const span = segment.split('-');
    if (span.length < 2) {
      return Number.parseInt(segment, 10);
    }

    const min = Number.parseInt(span[0], 10);
    const max = Number.parseInt(span[span.length - 1], 10);
    const steps = [];
    for (let i = min; i <= max; i++) {
      steps.push(i);
    }

    return steps;
  });
  return segments.flat().filter((segment) => !Number.isNaN(segment));
};

export const shcbDemo = ({
  language = 'html',
  highlightedLines = '',
  showLineNumbers = false,
  wrapLines = false,
  className = '',
}) => {
  const sample = getSample(language);
  const hlLanguage = hljs.getLanguage(language);
  const highlighted = hlLanguage
    ? hljs.highlight(sample, { language })
    : hljs.highlightAuto(sample);
  const languageName = hlLanguage ? hlLanguage.name : language;
  const codeClasses = ['hljs', `language-${language}`];
  const preAttr = [
    'aria-describedby="shcb-language-example"',
    `data-shcb-language-name="${languageName}"`,
    `data-shcb-language-slug="${language}"`,
  ];
  let content = highlighted.value;

  if (className.trim().length > 0) {
    preAttr.push(`class="${className}"`);
  }

  if (highlightedLines || showLineNumbers) {
    codeClasses.push('shcb-code-table');
    const highlightedIndices = expandRange(highlightedLines).map((i) => i - 1);
    content = content
      .trim()
      .split('\n')
      .map((line, i) => {
        const tagName = highlightedIndices.includes(i) ? 'mark' : 'span';
        return `<${tagName} class="shcb-loc"><span>${
          line.trim().length === 0 ? '\n' : line
        }</span></${tagName}>`;
      })
      .join('\n');
  }

  if (showLineNumbers) {
    codeClasses.push('shcb-line-numbers');
  }

  if (wrapLines) {
    codeClasses.push('shcb-wrap-lines');
  }

  const label = `<small class="shcb-language" id="shcb-language-example"><span class="shcb-language__label">Code language:</span> <span class="shcb-language__name">${languageName}</span> <span class="shcb-language__paren">(</span><span class="shcb-language__slug">${language}</span><span class="shcb-language__paren">)</span></small>`;

  return `<pre ${preAttr.join(' ')}><div><code class="${codeClasses.join(
    ' '
  )}">${content}</code></div>${label}</pre>`;
};
