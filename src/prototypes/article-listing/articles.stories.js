import recent from './data/recent.json';
import featured from './data/featured.json';
import topics from './data/topics.json';
import examplePrototype from './example/example.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/Article Listing',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const Example = () => examplePrototype({ recent, featured, topics });
