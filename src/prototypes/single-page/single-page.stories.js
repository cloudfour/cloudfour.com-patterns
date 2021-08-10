import singlePagePrototype from './example/example.twig';
import './example/example.scss';
import devices from './data/devices.json';

export default {
  title: 'Prototypes/Single Page',
  parameters: {
    paddings: { disable: true },
  },
};

export const Example = () =>
  singlePagePrototype({
    devices,
  });
