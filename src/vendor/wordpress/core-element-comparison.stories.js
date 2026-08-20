import CommentDemo from './demo/compare-comment.twig';
import GutenbergDemo from './demo/compare-gutenberg.twig';
import HTMLDemo from './demo/compare-html.twig';
import MarkdownDemo from './demo/compare-markdown.twig';

export default {
  title: 'Vendor/WordPress/Core Element Comparison',
};

export const Markdown = {
  render: () => MarkdownDemo(),
};

export const HTML = {
  render: () => HTMLDemo(),
};

export const Gutenberg = {
  render: () => GutenbergDemo(),
};

export const Comments = {
  render: () => CommentDemo(),
};
