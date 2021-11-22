import fallback from './data/fallbacks.json';
import examplePrototype from './example/example.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/No Results',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const Example = () => examplePrototype({ fallback });
