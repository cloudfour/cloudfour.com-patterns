/** @import { Meta, StoryObj } from '@storybook/html' */
import colorDemo from './demo/color.twig';
import colorDemoSource from './demo/color.twig?raw';
import noWrapDemo from './demo/nowrap.twig';
import noWrapDemoSource from './demo/nowrap.twig?raw';
import sizeDemo from './demo/size.twig';
import sizeDemoSource from './demo/size.twig?raw';
import textAlignDemo from './demo/text-align.twig';
import textAlignDemoSource from './demo/text-align.twig?raw';

/** @type {Meta} */
const meta = {
  title: 'Utilities/Text',
};

export default meta;

/** @type {StoryObj} */
export const WhitespaceNowrap = {
  name: 'White-space nowrap',
  parameters: { docs: { source: { code: noWrapDemoSource } } },
  render: (args) => noWrapDemo(args),
};

/** @type {StoryObj} */
export const ActionText = {
  name: 'Action text',
  parameters: { docs: { source: { code: colorDemoSource } } },
  render: (args) => colorDemo(args),
};

/** @type {StoryObj} */
export const TextAlignCenter = {
  name: 'Text-align center',
  parameters: { docs: { source: { code: textAlignDemoSource } } },
  render: (args) => textAlignDemo(args),
};

/** @type {StoryObj} */
export const BigAndSmall = {
  name: 'Big and small',
  parameters: { docs: { source: { code: sizeDemoSource } } },
  render: (args) => sizeDemo(args),
};
