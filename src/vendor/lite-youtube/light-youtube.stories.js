/** @import { Meta, StoryObj } from '@storybook/html' */
import fallbackDemo from './demo/fallback.twig';

/** @type {Meta} */
const meta = {
  title: 'Vendor/lite-youtube',
  argTypes: {
    aspect_ratio: {
      type: { name: 'string' },
      description:
        'Value for `--lite-youtube-aspect-ratio` inline style property, sets the aspect ratio prior to component load and helps cut down on page shifts.',
    },
  },
  render: (args) => fallbackDemo(args),
};

export default meta;

/** @type {StoryObj} */
export const Default = {};
