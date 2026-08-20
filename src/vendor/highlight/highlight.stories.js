import { availableSamples, highlightDemo } from './demo/demo.ts';

export default {
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
      source: { transform: (code) => code },
    },
    layout: 'fullscreen',
  },
  render: highlightDemo.bind({}),
};

export const Theme = {
  args: { language: 'html' },
};
