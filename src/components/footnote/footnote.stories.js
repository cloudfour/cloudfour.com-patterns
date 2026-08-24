/** @import { Meta, StoryObj } from '@storybook/html' */
import template from './demo/demo.twig';
import demoSource from './demo/demo.twig?raw';

/** @type {Meta} */
const meta = {
  title: 'Components/Footnote/Footnote',
  argTypes: {
    count: { type: { name: 'number' } },
    id: { type: { name: 'number' } },
    content: { type: { name: 'string' } },
  },
  render: (args) => template(args),
};

export default meta;

/** @type {StoryObj} */
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
