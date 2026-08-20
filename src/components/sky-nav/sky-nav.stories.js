import { useEffect } from 'storybook/preview-api';

import { makeTwigInclude } from '../../make-twig-include.js';

import menu from './demo/menu.json';
import { initSkyNav } from './sky-nav.ts';
import template from './sky-nav.twig';
const basicStoryArgs = {
  include_main_demo: true,
  menu,
};

// Inline stories disabled so media queries will behave as expected within
// embedded examples.

export default {
  title: 'Components/Sky Nav',
  parameters: { docs: { story: { inline: false } } },
  decorators: [
    (story) => {
      useEffect(() => {
        const { destroy } = initSkyNav(
          document.querySelector('.js-sky-nav-menu-toggle')
        );
        return destroy;
      });
      return story();
    },
  ],
};

export const Dark = {
  parameters: {
    layout: 'fullscreen',
    themes: { disable: true },
    docs: {
      source: {
        code: makeTwigInclude('@cloudfour/components/sky-nav/sky-nav.twig', {
          class: 't-dark',
          ...basicStoryArgs,
        }),
      },
    },
  },
  render: () =>
    template({
      class: 't-dark',
      ...basicStoryArgs,
    }),
};

export const Light = {
  parameters: {
    layout: 'fullscreen',
    themes: { disable: true },
    docs: {
      source: {
        code: makeTwigInclude(
          '@cloudfour/components/sky-nav/sky-nav.twig',
          basicStoryArgs
        ),
      },
    },
  },
  render: () => template(basicStoryArgs),
};
