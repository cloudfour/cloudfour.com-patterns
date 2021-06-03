import examplePrototype from './example/example.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/Clouds',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const Example = () => examplePrototype({});
