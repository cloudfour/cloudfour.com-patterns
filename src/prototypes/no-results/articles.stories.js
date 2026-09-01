import fallback from './data/fallbacks.json';
import examplePrototype from './example/example.twig';
import './example/example.scss';

const meta = {
  title: 'Prototypes/No Results',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export default meta;

export const Example = () => examplePrototype({ fallback });
