import essentials from './data/essentials.json';
import feed from './data/feed.json';
import topics from './data/topics.json';
import examplePrototype from './example/example.twig';
import tylerPrototypeA from './tyler/a.twig';
import './example/example.scss';
import './tyler/tyler.scss';

export default {
  title: 'Prototypes/Articles',
  parameters: {
    docs: { page: null },
    paddings: { disabled: true },
  },
};

export const Example = () => examplePrototype({ essentials, feed, topics });

export const TylerA = () => tylerPrototypeA({ essentials, feed, topics });
