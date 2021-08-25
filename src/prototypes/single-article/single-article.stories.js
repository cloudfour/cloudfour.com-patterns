import singleArticlePrototype from './example/example.twig';
import { useSkyNav } from '../use-sky-nav.ts';

export default {
  title: 'Prototypes/Single Article',
  parameters: {
    paddings: { disable: true },
  },
};

export const Example = () => {
  useSkyNav();
  return singleArticlePrototype({});
};
