/** @import { Meta, StoryObj } from '@storybook/html' */
import topics from '../../components/dot-leader/demo/topics.json';

import advancedDemo from './demo/advanced.twig';
import advancedDemoSource from './demo/advanced.twig?raw';
import basicDemo from './demo/basic.twig';
import basicDemoSource from './demo/basic.twig?raw';

// Inline stories disabled so media queries will behave as expected within
// embedded examples.

/** @type {Meta} */
const meta = {
  title: 'Objects/Overview',
  parameters: { docs: { story: { inline: false } } },
};

export default meta;

/** @type {StoryObj} */
export const Basic = {
  parameters: {
    docs: {
      story: { iframeHeight: '300px' },
      source: {
        code: basicDemoSource,
      },
    },
  },
  render: () => basicDemo(),
};

/** @type {StoryObj} */
export const AdvancedUsage = {
  name: 'Advanced Usage',
  parameters: {
    docs: {
      story: { iframeHeight: '300px' },
      source: {
        code: advancedDemoSource,
      },
    },
  },
  render: () => advancedDemo({ topics }),
};
