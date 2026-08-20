import template from './demo/ground-nav-demo.twig';
import {
  defaultArgTypes,
  defaultArgs,
  generateGroundNavProps,
} from './ground-nav-args.js';

// Inline stories disabled so media queries will behave as expected within
// embedded examples.

export default {
  title: 'Components/Ground Nav',
  parameters: { docs: { story: { inline: false } }, layout: 'fullscreen' },
  render: (args) => template(generateGroundNavProps(args)),
};

export const CloudFour = {
  name: 'Cloud Four',
  args: defaultArgs,
  argTypes: defaultArgTypes,
  parameters: {
    layout: 'fullscreen',
  },
};

export const OneFeature = {
  name: 'One Feature',
  args: {
    ...defaultArgs,
    feature_count: 1,
  },
  argTypes: defaultArgTypes,
  parameters: {
    layout: 'fullscreen',
  },
};

export const NoFeatures = {
  name: 'No Features',
  args: {
    ...defaultArgs,
    feature_count: 0,
  },
  argTypes: defaultArgTypes,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Alternate = {
  args: {
    ...defaultArgs,
    alternate: true,
  },
  argTypes: defaultArgTypes,
  parameters: {
    layout: 'fullscreen',
  },
};
