import defaultDemo from './demo/demo.twig';
import defaultDemoSource from './demo/demo.twig?raw';

export default {
  title: 'Objects/Feature Group',
  parameters: { docs: { story: { inline: false } } },
  render: defaultDemo,
};

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
