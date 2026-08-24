/** @import { Meta, StoryObj } from '@storybook/html' */
import defaultDemo from './demo/demo.twig';
import defaultDemoSource from './demo/demo.twig?raw';

/** @type {Meta} */
const meta = {
  title: 'Objects/Feature Group',
  parameters: { docs: { story: { inline: false } } },
  render: defaultDemo,
};

export default meta;

/** @type {StoryObj} */
export const Default = {
  parameters: {
    docs: {
      story: { iframeHeight: '300px' },
      source: {
        code: defaultDemoSource,
      },
    },
  },
};
