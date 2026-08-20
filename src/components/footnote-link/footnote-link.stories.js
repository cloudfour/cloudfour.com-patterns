import template from './demo/demo.twig';
import footnoteLinkSource from './demo/demo.twig?raw';

export default {
  title: 'Components/Footnote/Footnote Link',
  argTypes: {
    count: { type: { name: 'number' } },
    id: { type: { name: 'string' } },
  },
  render: (args) => template(args),
};

export const Basic = {
  args: { count: 1 },
  parameters: {
    docs: {
      source: {
        code: footnoteLinkSource,
      },
    },
  },
};
