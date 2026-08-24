/** @import { Meta, StoryObj } from '@storybook/html' */
import { useEffect } from 'storybook/preview-api';

import { makeTwigInclude } from '../../make-twig-include.js';

import menu from './demo/menu.json';
import { initSkyNav } from './sky-nav';
import template from './sky-nav.twig';
const basicStoryArgs = {
  include_main_demo: true,
  menu,
};

// Inline stories disabled so media queries will behave as expected within
// embedded examples.

/** @type {Meta} */
const meta = {
  title: 'Components/Sky Nav',
  parameters: { docs: { story: { inline: false } } },
  decorators: [
    (story) => {
      useEffect(() => {
        const toggle = /** @type {HTMLButtonElement | null} */ (
          document.querySelector('.js-sky-nav-menu-toggle')
        );
        if (!toggle) return;
        const { destroy } = initSkyNav(toggle);
        return destroy;
      });
      return story();
    },
  ],
};

export default meta;

/** @type {StoryObj} */
export const Dark = {
  parameters: {
    layout: 'fullscreen',
    themes: { disable: true },
    docs: {
      story: { iframeHeight: '200px' },
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

/** @type {StoryObj} */
export const Light = {
  parameters: {
    layout: 'fullscreen',
    themes: { disable: true },
    docs: {
      story: { iframeHeight: '200px' },
      source: {
        code: makeTwigInclude(
          '@cloudfour/components/sky-nav/sky-nav.twig',
          basicStoryArgs,
        ),
      },
    },
  },
  render: () => template(basicStoryArgs),
};
