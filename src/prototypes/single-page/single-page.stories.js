import { useSkyNav } from '../use-sky-nav.ts';

import devices from './data/devices.json';
import singlePagePrototype from './example/example.twig';

import './example/example.scss';

export default {
  title: 'Prototypes/Single Page',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Example = () => {
  useSkyNav();
  return singlePagePrototype({
    devices,
  });
};
