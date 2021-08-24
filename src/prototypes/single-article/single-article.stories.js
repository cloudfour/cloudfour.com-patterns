import singleArticlePrototype from './example/example.twig';

export default {
  title: 'Prototypes/Single Article',
  parameters: {
    paddings: { disable: true },
  },
};

export const Example = () => singleArticlePrototype({});
