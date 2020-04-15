import feed from './data/feed.json';
import examplePrototype from './example/example.twig';
import './example/example.scss';
import dsPrototype01 from './ds/example-01.twig';
import dsPrototype02 from './ds/example-02.twig';
import dsPrototype03 from './ds/example-03.twig';
import './ds/example-01.scss';
import './ds/example-02.scss';
import './ds/example-03.scss';

export default {
  title: 'Prototypes/Articles',
  parameters: {
    docs: { page: null },
    paddings: { disabled: true },
  },
};

export const Example = () => examplePrototype({ feed });

export const DereksPrototype01 = () => dsPrototype01({ feed });

export const DereksPrototype02 = () => dsPrototype02({ feed });

export const DereksPrototype03 = () => dsPrototype03({ feed });
