import exampleDemo from './demo/example.twig';
import exampleDemoSource from './demo/example.twig?raw';

export default {
  title: 'Objects/Article Header',
  render: () => exampleDemo(),
};

export const Example = {
  parameters: {
    docs: {
      source: {
        code: exampleDemoSource,
      },
    },
  },
};
