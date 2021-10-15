import fallback from './data/fallbacks.json';
import examplePrototype from './example/example.twig';

export default {
  title: 'Prototypes/No Results',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const Example = () => examplePrototype({ fallback });
