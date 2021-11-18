import examplePrototype from './example/example.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/Comment Thread',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const Example = () => examplePrototype({});
