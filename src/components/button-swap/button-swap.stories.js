import { makeTwigInclude } from '../../make-twig-include.js';

import buttonSwap from './button-swap.twig';

export default {
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

export const Default = {
  args: {
    initial_label: 'Notifications have been turned off.',
    initial_visual_label: 'Give me all the notifications!',
    swapped_label: 'Notifications have been turned on.',
    swapped_visual_label: 'Just kidding, stop notifications, please.',
  },
  parameters: {
    docs: {
      source: {
        code: makeTwigInclude(
          '@cloudfour/components/button-swap/button-swap.twig',
          {
            initial_label: 'Notifications have been turned off.',
            initial_visual_label: 'Give me all the notifications!',
            swapped_label: 'Notifications have been turned on.',
            swapped_visual_label: 'Just kidding, stop notifications, please.',
          }
        ),
      },
    },
  },
};
