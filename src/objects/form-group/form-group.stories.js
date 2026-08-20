import badgeDemo from './demo/badge.twig';
import badgeDemoSource from './demo/badge.twig?raw';
import basicDemo from './demo/input.twig';
import basicDemoSource from './demo/input.twig?raw';

export default {
  title: 'Objects/Form Group',
};

export const Basic = {
  parameters: { docs: { source: { code: basicDemoSource } } },
  render: () => basicDemo(),
};

export const WithBadge = {
  name: 'With badge',
  parameters: { docs: { source: { code: badgeDemoSource } } },
  render: () => badgeDemo(),
};
