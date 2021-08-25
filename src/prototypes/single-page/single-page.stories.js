import singlePagePrototype from './example/example.twig';
import './example/example.scss';
import devices from './data/devices.json';
import { useSkyNav } from '../use-sky-nav.ts';

export default {
  title: 'Prototypes/Single Page',
  parameters: {
    paddings: { disable: true },
  },
};

export const Example = () => {
  useSkyNav();
  return singlePagePrototype({
    devices,
  });
};
