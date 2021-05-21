import examplePrototype from './example/example.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/Comment Thread',
  parameters: {
    docs: { page: null },
    paddings: { disabled: true },
  },
};

export const Example = () => examplePrototype({});
