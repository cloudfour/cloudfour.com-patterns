import essentials from './data/essentials.json';
import feed from './data/feed.json';
import topics from './data/topics.json';
import examplePrototype from './example/example.twig';
import daniellePrototype from './danielle/articles-dr.twig';
import './example/example.scss';
import './danielle/articles-dr.scss';

export default {
  title: 'Prototypes/Articles',
  parameters: {
    docs: { page: null },
    paddings: { disabled: true },
  },
};

export const Example = () => examplePrototype({ feed });

export const Danielle = () => daniellePrototype({ essentials, feed, topics });
