/** @import { Meta, StoryObj } from '@storybook/html' */
import badgeDemo from './demo/badge.twig';
import badgeDemoSource from './demo/badge.twig?raw';
import basicDemo from './demo/input.twig';
import basicDemoSource from './demo/input.twig?raw';

/** @type {Meta} */
const meta = {
  title: 'Objects/Form Group',
};

export default meta;

/** @type {StoryObj} */
export const Basic = {
  parameters: { docs: { source: { code: basicDemoSource } } },
  render: () => basicDemo(),
};

/** @type {StoryObj} */
export const WithBadge = {
  name: 'With badge',
  parameters: { docs: { source: { code: badgeDemoSource } } },
  render: () => badgeDemo(),
};
