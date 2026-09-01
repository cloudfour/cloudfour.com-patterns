/** @import { Meta, StoryObj } from '@storybook/html' */
import { useEffect } from 'storybook/preview-api';

import exampleDemoWithAlert from './demo/example-with-alert.twig';
import exampleDemoWithAlertSource from './demo/example-with-alert.twig?raw';
import exampleDemo from './demo/example.twig';
import exampleDemoSource from './demo/example.twig?raw';

/** @type {Meta} */
const meta = {
  title: 'Objects/Page',
  parameters: { docs: { story: { inline: false } }, layout: 'fullscreen' },
  decorators: [
    (story) => {
      useEffect(() => {
        // Set this story's `body` element to full-height
        document.body.style.height = '100%';
        // Prevent Storybook's container from affecting this layout
        const root = /** @type {HTMLElement | null} */ (
          document.querySelector('#storybook-root')
        );
        if (root) {
          root.style.display = 'contents';
        }
      });
      return story();
    },
  ],
};

export default meta;

/** @type {StoryObj} */
export const Example = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { iframeHeight: '400px' },
      source: { code: exampleDemoSource },
    },
  },
  render: () => exampleDemo(),
};

/** @type {StoryObj} */
export const ExampleWithAlert = {
  name: 'Example with Alert',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { iframeHeight: '400px' },
      source: { code: exampleDemoWithAlertSource },
    },
  },
  render: () => exampleDemoWithAlert(),
};
