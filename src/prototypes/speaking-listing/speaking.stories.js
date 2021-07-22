import speaking from './data/speaking.json';
import future from './data/future.json';
import examplePrototype from './example/example.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/Speaking Listing',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const Example = () => examplePrototype({ speaking, future });
