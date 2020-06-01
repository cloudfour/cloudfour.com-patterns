// Prism core
import 'prismjs/components/prism-core';
// Required by other languages
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup-templating';
// Supported languages
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-twig';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';

/**
 * Custom Liquid source highlighting
 *
 * Uses Twig highlighting as a starting point but overrides comment syntax.
 */
Prism.languages.liquid = Prism.languages.extend('twig', {
  comment: /{%\s*comment\s*%}[\S\s]*?{%\s*endcomment\s*%}/,
});
