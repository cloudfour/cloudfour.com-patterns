/** @import { ArgTypes, Meta, StoryObj } from '@storybook/html' */
import baseDemo from './demo/base.twig';
import codeTableDemo from './demo/code-table.twig';
/** @type {Partial<ArgTypes>} */
const argTypes = {
  class: {
    type: 'string',
    description: 'CSS class(es) to append to the root element.',
  },
  wrapLines: {
    type: 'boolean',
    description: 'Allow lines to wrap',
  },
};

/** @type {Meta} */
const meta = {
  title: 'Vendor/Syntax-Highlighting Code Block',
  argTypes,
  parameters: {
    docs: {
      source: { transform: (/** @type {string} */ code) => code },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (story) => {
      const result = story();
      // A story can render to a DOM node rather than a string; only the string form
      // can be wrapped by concatenating markup around it.
      if (typeof result === 'string' && result.includes('wp-block-code')) {
        return `<div class="o-container o-container--pad o-container--prose"><div class="o-container__content">${result}</div></div>`;
      }
      return result;
    },
  ],
};

export default meta;

/** @type {StoryObj} */
export const Basic = {
  render: (args) => baseDemo(args),
};

/** @type {StoryObj} */
export const MoreFeatures = {
  name: 'More Features',
  args: { lineNumbers: true, wrapLines: true },
  argTypes: {
    ...argTypes,
    lineNumbers: {
      type: 'boolean',
      description: 'Show numbers per line',
    },
  },
  render: (args) => codeTableDemo(args),
};
