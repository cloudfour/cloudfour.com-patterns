/** @import { Meta, StoryObj } from '@storybook/html' */
import { makeTwigInclude } from '../../make-twig-include.js';

import buttonSwap from './button-swap.twig';

/** @type {Meta} */
const meta = {
  title: 'Components/Button Swap',
  argTypes: {
    content_start_icon: {
      options: ['bell', 'magnifying-glass'],
      type: { name: 'string' },
      control: { type: 'select' },
    },
    initial_label: { type: { name: 'string' } },
    initial_visual_label: { type: { name: 'string' } },
    swapped_label: { type: { name: 'string' } },
    swapped_visual_label: { type: { name: 'string' } },
  },
  render: (args) => buttonSwap(args),
};

export default meta;

/** @type {StoryObj} */
export const Default = {
  args: {
    initial_label: 'Notifications have been turned off.',
    initial_visual_label: 'Give me all the notifications!',
    swapped_label: 'Notifications have been turned on.',
    swapped_visual_label: 'Just kidding, stop notifications, please.',
  },
  parameters: {
    docs: {
      // This story rendered in its own frame before the CSF migration, which dropped
      // the setting. No `iframeHeight` to go with it, matching the original: the
      // component measures about 45px against Storybook's 100px default, so unlike
      // the stories in #2420 there is nothing here to clip.
      story: { inline: false },
      source: {
        code: makeTwigInclude(
          '@cloudfour/components/button-swap/button-swap.twig',
          {
            initial_label: 'Notifications have been turned off.',
            initial_visual_label: 'Give me all the notifications!',
            swapped_label: 'Notifications have been turned on.',
            swapped_visual_label: 'Just kidding, stop notifications, please.',
          },
        ),
      },
    },
  },
};
