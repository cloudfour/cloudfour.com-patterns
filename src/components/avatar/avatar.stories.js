/** @import { Args, Meta, StoryObj } from '@storybook/html' */
import template from './avatar.twig';
import { avatarArgTypes } from './demo/arg-types.js';
import demoImageMedium from './demo/tyler-335.png';
import demoImageSmall from './demo/tyler-64.png';
import demoImageLarge from './demo/tyler-768.png';
const demoImageSrcset = [
  `${demoImageSmall} 64w`,
  `${demoImageMedium} 335w`,
  `${demoImageLarge} 768w`,
].join(', ');
/** @param {Args} args */
const avatarStory = (args) => {
  // Don't bother with the size option if it is the default
  if (args.size === 'medium') {
    delete args.size;
  }
  // Same for the shape option
  if (args.shape === 'circle') {
    delete args.shape;
  }
  return template(args);
};

/** @type {Meta} */
const meta = {
  title: 'Components/Avatar',
  args: {
    size: 'medium',
  },
  argTypes: avatarArgTypes,
  render: avatarStory.bind({}),
};

export default meta;

/** @type {StoryObj} */
export const Empty = {};

/** @type {StoryObj} */
export const WithImage = {
  name: 'With Image',
  args: { src: demoImageSmall, srcset: demoImageSrcset, sizes: '60px' },
};

/** @type {StoryObj} */
export const SmallEmpty = {
  name: 'Small (Empty)',
  args: {
    size: 'small',
  },
};

/** @type {StoryObj} */
export const SmallWithImage = {
  name: 'Small (With Image)',
  args: {
    size: 'small',
    src: demoImageSmall,
    srcset: demoImageSrcset,
    sizes: '38px',
  },
};

/** @type {StoryObj} */
export const FullWidth = {
  name: 'Full Width',
  args: {
    src: demoImageSmall,
    srcset: demoImageSrcset,
    size: 'full',
    sizes: '100vw',
  },
};

/** @type {StoryObj} */
export const Square = {
  args: { shape: 'square' },
};

/** @type {StoryObj} */
export const Squircle = {
  args: { shape: 'squircle' },
};
