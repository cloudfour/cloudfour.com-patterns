import examplePrototype from './example/example.twig';

const meta = {
  title: 'Prototypes/No Content',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export default meta;

export const Example = () => examplePrototype({});
