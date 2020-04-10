import feed from './data/feed.json';
import examplePrototype from './example/example.twig';
import dsPrototype from './ds/example-01.twig';
import './example/example.scss';
import './ds/example-01.scss';

export default {
  title: 'Prototypes/Articles',
  parameters: {
    docs: { page: null },
    paddings: { disabled: true },
  },
};

export const Example = () => examplePrototype({ feed });

export const Derek = () => dsPrototype({ feed });
Derek.story = {
  name: 'Derek’s Prototype', // Only necessary if you want to customize name
};
