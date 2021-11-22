import examplePrototype from './example/example.twig';

export default {
  title: 'Prototypes/Quotes',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const Example = () => examplePrototype({});
