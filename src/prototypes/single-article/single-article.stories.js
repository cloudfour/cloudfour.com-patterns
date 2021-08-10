import singleArticlePrototype from './example/example.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/Single Article',
  parameters: {
    paddings: { disable: true },
  },
};

export const Example = () => singleArticlePrototype({});
