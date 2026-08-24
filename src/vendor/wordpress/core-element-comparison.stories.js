/** @import { Meta, StoryObj } from '@storybook/html' */
import CommentDemo from './demo/compare-comment.twig';
import GutenbergDemo from './demo/compare-gutenberg.twig';
import HTMLDemo from './demo/compare-html.twig';
import MarkdownDemo from './demo/compare-markdown.twig';

/** @type {Meta} */
const meta = {
  title: 'Vendor/WordPress/Core Element Comparison',
};

export default meta;

/** @type {StoryObj} */
export const Markdown = {
  render: () => MarkdownDemo(),
};

/** @type {StoryObj} */
export const HTML = {
  render: () => HTMLDemo(),
};

/** @type {StoryObj} */
export const Gutenberg = {
  render: () => GutenbergDemo(),
};

/** @type {StoryObj} */
export const Comments = {
  render: () => CommentDemo(),
};
