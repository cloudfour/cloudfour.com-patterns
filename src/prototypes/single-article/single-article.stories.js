import singleArticlePrototype from './example/example.twig';
import { useSkyNav } from '../use-sky-nav.ts';

export default {
  title: 'Prototypes/Single Article',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Example = () => {
  useSkyNav();
  return singleArticlePrototype({});
};
