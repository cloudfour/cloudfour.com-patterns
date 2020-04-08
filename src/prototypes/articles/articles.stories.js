import { withCssResources } from '@storybook/addon-cssresources';
import articles from './feed.json';
import examplePrototype from './example/example.twig';
import '../../index.scss';

export default {
  title: 'Prototypes/Articles',
};

export const Example = () => examplePrototype({ articles });

Example.story = {
  parameters: {
    cssresources: [
      {
        id: 'example',
        code: `<style>${require('./example/example.scss').toString()}</style>`,
      },
    ],
  },
  decorators: [withCssResources],
};
