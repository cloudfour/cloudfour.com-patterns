// Prism core
// Loads the default languages: markup, css, clike and javascript
import Prism from 'prismjs';
// Required by other languages
import 'prismjs/components/prism-markup-templating';
// Additional supported languages
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
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
