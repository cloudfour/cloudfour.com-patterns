import inputGroupDemo from './demo/input-group-demo.twig';
import inputGroupDemoSource from './demo/input-group-demo.twig?raw';

export default {
  title: 'Objects/Input Group',
  argTypes: {
    class: {
      type: 'string',
      description: 'Appends to the CSS class of the root element',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
  },
  render: (args) => inputGroupDemo(args),
};

export const Example = {
  parameters: {
    docs: {
      source: {
        code: inputGroupDemoSource,
      },
    },
  },
};
