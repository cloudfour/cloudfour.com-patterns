/** @import { Meta, StoryObj } from '@storybook/html' */
import commentDemo from './demo/compare-comment.twig';
import gutenbergDemo from './demo/compare-gutenberg.twig';
import htmlDemo from './demo/compare-html.twig';
import markdownDemo from './demo/compare-markdown.twig';

/** @type {Meta} */
const meta = {
  title: 'Vendor/WordPress/Core Element Comparison',
};

export default meta;

/** @type {StoryObj} */
export const Markdown = {
  render: () => markdownDemo(),
};

/** @type {StoryObj} */
export const HTML = {
  render: () => htmlDemo(),
};

/** @type {StoryObj} */
export const Gutenberg = {
  render: () => gutenbergDemo(),
};

/** @type {StoryObj} */
export const Comments = {
  render: () => commentDemo(),
};
