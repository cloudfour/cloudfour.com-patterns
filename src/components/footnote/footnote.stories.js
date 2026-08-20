import template from './demo/demo.twig';
import demoSource from './demo/demo.twig?raw';

export default {
  title: 'Components/Footnote/Footnote',
  argTypes: {
    count: { type: { name: 'number' } },
    id: { type: { name: 'number' } },
    content: { type: { name: 'string' } },
  },
  render: (args) => template(args),
};

export const Basic = {
  args: {
    count: 1,
  },
  parameters: {
    docs: {
      source: {
        code: demoSource,
      },
    },
  },
};
