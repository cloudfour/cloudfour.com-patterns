import examplePrototype from './example/example.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/Cloud Cover Subscription',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const Example = () => examplePrototype({});
