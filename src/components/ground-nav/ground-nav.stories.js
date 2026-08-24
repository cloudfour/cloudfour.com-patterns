/** @import { Meta, StoryObj } from '@storybook/html' */
import template from './demo/ground-nav-demo.twig';
import {
  defaultArgTypes,
  defaultArgs,
  generateGroundNavProps,
} from './ground-nav-args.js';

// Inline stories disabled so media queries will behave as expected within
// embedded examples.

/** @type {Meta} */
const meta = {
  title: 'Components/Ground Nav',
  parameters: { docs: { story: { inline: false } }, layout: 'fullscreen' },
  render: (args) => template(generateGroundNavProps(args)),
};

export default meta;

/** @type {StoryObj} */
export const CloudFour = {
  name: 'Cloud Four',
  args: defaultArgs,
  argTypes: defaultArgTypes,
  parameters: {
    docs: { story: { iframeHeight: '815px' } },
    layout: 'fullscreen',
  },
};

/** @type {StoryObj} */
export const OneFeature = {
  name: 'One Feature',
  args: {
    ...defaultArgs,
    feature_count: 1,
  },
  argTypes: defaultArgTypes,
  parameters: {
    docs: { story: { iframeHeight: '800px' } },
    layout: 'fullscreen',
  },
};

/** @type {StoryObj} */
export const NoFeatures = {
  name: 'No Features',
  args: {
    ...defaultArgs,
    feature_count: 0,
  },
  argTypes: defaultArgTypes,
  parameters: {
    docs: { story: { iframeHeight: '475px' } },
    layout: 'fullscreen',
  },
};

/** @type {StoryObj} */
export const Alternate = {
  args: {
    ...defaultArgs,
    alternate: true,
  },
  argTypes: defaultArgTypes,
  parameters: {
    docs: { story: { iframeHeight: '815px' } },
    layout: 'fullscreen',
  },
};
