import './example/example.scss';
import examplePrototype from './example/example.twig';

const meta = {
  title: 'Prototypes/Article with No Cover',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export default meta;

export const Example = () => examplePrototype({});
