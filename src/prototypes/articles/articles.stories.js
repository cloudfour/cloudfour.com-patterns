import feed from './data/feed.json';
import examplePrototype from './example/example.twig';
import './example/example.scss';
import phPrototype from './ph/ph.twig';
import './ph/ph.scss';

export default {
  title: 'Prototypes/Articles',
  parameters: {
    docs: { page: null },
    paddings: { disabled: true },
  },
};

export const Example = () => examplePrototype({ feed });

export const paulsPrototype = () => phPrototype({ feed });
