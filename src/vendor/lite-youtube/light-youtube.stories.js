import fallbackDemo from './demo/fallback.twig';

export default {
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

export const Default = {};
