import essentials from './data/essentials.json';
import feed from './data/feed.json';
import topics from './data/topics.json';
import examplePrototype from './example/example.twig';
import daniellePrototypeA from './danielle/a.twig';
import daniellePrototypeB from './danielle/b.twig';
import './example/example.scss';
import './danielle/a.scss';
import './danielle/b.scss';

export default {
  title: 'Prototypes/Articles',
  parameters: {
    docs: { page: null },
    paddings: { disabled: true },
  },
};

export const Example = () => examplePrototype({ feed });

export const DanielleA = () => daniellePrototypeA({ essentials, feed, topics });
export const DanielleB = () => daniellePrototypeB({ essentials, feed, topics });
