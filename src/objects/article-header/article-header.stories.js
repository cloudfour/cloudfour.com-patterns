/** @import { Meta, StoryObj } from '@storybook/html' */
import exampleDemo from './demo/example.twig';
import exampleDemoSource from './demo/example.twig?raw';

/** @type {Meta} */
const meta = {
  title: 'Objects/Article Header',
  render: () => exampleDemo(),
};

export default meta;

/** @type {StoryObj} */
export const Example = {
  parameters: {
    docs: {
      source: {
        code: exampleDemoSource,
      },
    },
  },
};
