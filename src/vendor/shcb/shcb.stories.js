import baseDemo from './demo/base.twig';
import codeTableDemo from './demo/code-table.twig';
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

export default {
  title: 'Vendor/Syntax-Highlighting Code Block',
  argTypes,
  parameters: {
    docs: {
      source: { transform: (code) => code },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (story) => {
      const result = story();
      if (result.includes('wp-block-code')) {
        return `<div class="o-container o-container--pad o-container--prose"><div class="o-container__content">${result}</div></div>`;
      }
      return result;
    },
  ],
};

export const Basic = {
  render: (args) => baseDemo(args),
};

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
