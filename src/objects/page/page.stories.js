import { useEffect } from 'storybook/preview-api';

import exampleDemoWithAlert from './demo/example-with-alert.twig';
import exampleDemoWithAlertSource from './demo/example-with-alert.twig?raw';
import exampleDemo from './demo/example.twig';
import exampleDemoSource from './demo/example.twig?raw';

export default {
  title: 'Objects/Page',
  parameters: { docs: { story: { inline: false } }, layout: 'fullscreen' },
  decorators: [
    (story) => {
      useEffect(() => {
        // Set this story's `body` element to full-height
        document.body.style.height = '100%';
        // Prevent Storybook's container from affecting this layout
        document.querySelector('#storybook-root').style.display = 'contents';
      });
      return story();
    },
  ],
};

export const Example = {
  parameters: {
    layout: 'fullscreen',
    docs: { source: { code: exampleDemoSource } },
  },
  render: () => exampleDemo(),
};

export const ExampleWithAlert = {
  name: 'Example with Alert',
  parameters: {
    layout: 'fullscreen',
    docs: { source: { code: exampleDemoWithAlertSource } },
  },
  render: () => exampleDemoWithAlert(),
};
