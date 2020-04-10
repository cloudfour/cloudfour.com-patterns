import feed from './data/feed.json';
import examplePrototype from './example/example.twig';
import './example/example.scss';
import dsPrototype from './ds/example-01.twig';
import './ds/example-01.scss';

export default {
  title: 'Prototypes/Articles',
  parameters: {
    docs: { page: null },
    paddings: { disabled: true },
  },
};

export const Example = () => examplePrototype({ feed });

export const DereksPrototype = () => dsPrototype({ feed });