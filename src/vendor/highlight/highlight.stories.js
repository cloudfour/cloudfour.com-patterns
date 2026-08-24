/** @import { Meta, StoryObj } from '@storybook/html' */
import { availableSamples, highlightDemo } from './demo/demo';

/** @type {Meta} */
const meta = {
  title: 'Vendor/Highlight',
  argTypes: {
    language: {
      options: availableSamples,
      type: 'string',
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    docs: {
      source: { transform: (/** @type {string} */ code) => code },
    },
    layout: 'fullscreen',
  },
  render: highlightDemo.bind({}),
};

export default meta;

/** @type {StoryObj} */
export const Theme = {
  args: { language: 'html' },
};
