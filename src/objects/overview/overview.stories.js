import topics from '../../components/dot-leader/demo/topics.json';

import advancedDemo from './demo/advanced.twig';
import advancedDemoSource from './demo/advanced.twig?raw';
import basicDemo from './demo/basic.twig';
import basicDemoSource from './demo/basic.twig?raw';

// Inline stories disabled so media queries will behave as expected within
// embedded examples.

export default {
  title: 'Objects/Overview',
  parameters: { docs: { story: { inline: false } } },
};

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
