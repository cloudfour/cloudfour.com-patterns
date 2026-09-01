/** @import { ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/html' */
import tokens from '../../compiled/tokens/js/tokens.js';

import roundedDemoSrc from './demo/avatar.png';
import imageDemoImgSrc from './demo/design-system-navigation.png';
import imageDemo from './demo/image.twig';
import penDemo from './demo/pen.twig';
import pictureDemo from './demo/picture.twig';
import pictureDemoJpgSrc from './demo/twilight.jpg';
import pictureDemoWebpSrc from './demo/twilight.webp';
import videoDemo from './demo/video.twig';

const aspectRatioTokens = tokens.number.aspect_ratio;
const modifierClasses = [
  '',
  ...Object.keys(aspectRatioTokens).map((key) => `o-embed--${key}`),
];
/** @type {Partial<ArgTypes>} */
const defaultArgTypes = {
  class: {
    options: modifierClasses,
    type: { name: 'string' },
    control: { type: 'select' },
  },
  aspect_ratio: { type: { name: 'string' } },
};
const defaultArgs = {
  class: 'o-embed--wide',
};
// Custom embed source function to preserve args in source code examples
/**
 * @param {string} _src
 * @param {StoryContext} storyContext
 */
const embedTransformSource = (_src, storyContext) => {
  const args = storyContext.args || storyContext.initialArgs || {};
  const argsString =
    Object.keys(args).length > 0
      ? ` with ${JSON.stringify(args, null, 2)}`
      : '';
  return `{% embed '@cloudfour/objects/embed/embed.twig'${argsString} only %}
  {% block content %}
    {# image, video or embed #}
  {% endblock %}
{% endembed %}`;
};

/** @type {Meta} */
const meta = {
  title: 'Objects/Embed',
  parameters: { docs: { source: { transform: embedTransformSource } } },
};

export default meta;

/** @type {StoryObj} */
export const Image = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => imageDemo({ ...args, src: imageDemoImgSrc }),
};

/** @type {StoryObj} */
export const Picture = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) =>
    pictureDemo({
      ...args,
      jpgSrc: pictureDemoJpgSrc,
      webpSrc: pictureDemoWebpSrc,
    }),
};

/** @type {StoryObj} */
export const Video = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => videoDemo(args),
};

/** @type {StoryObj} */
export const Rounded = {
  args: {
    class: 'u-rounded-full',
    style: 'max-width: 10em',
  },
  render: (args) =>
    imageDemo({
      ...args,
      src: roundedDemoSrc,
    }),
};

/** @type {StoryObj} */
export const Responsive = {
  args: {
    class: 'o-embed--full@s o-embed--wide@m o-embed--cinema@l',
  },
  argTypes: {
    class: { type: { name: 'string' } },
    aspect_ratio: defaultArgTypes.aspect_ratio,
  },
  render: (args) => penDemo(args),
};
