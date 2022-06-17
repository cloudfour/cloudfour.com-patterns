import { useSkyNav } from '../use-sky-nav.ts';

import singleArticlePrototype from './example/example.twig';

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
