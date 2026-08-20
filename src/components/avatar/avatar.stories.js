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

export default {
  title: 'Components/Avatar',
  args: {
    size: 'medium',
  },
  argTypes: avatarArgTypes,
  render: avatarStory.bind({}),
};

export const Empty = {};

export const WithImage = {
  name: 'With Image',
  args: { src: demoImageSmall, srcset: demoImageSrcset, sizes: '60px' },
};

export const SmallEmpty = {
  name: 'Small (Empty)',
  args: {
    size: 'small',
  },
};

export const SmallWithImage = {
  name: 'Small (With Image)',
  args: {
    size: 'small',
    src: demoImageSmall,
    srcset: demoImageSrcset,
    sizes: '38px',
  },
};

export const FullWidth = {
  name: 'Full Width',
  args: {
    src: demoImageSmall,
    srcset: demoImageSrcset,
    size: 'full',
    sizes: '100vw',
  },
};

export const Square = {
  args: { shape: 'square' },
};

export const Squircle = {
  args: { shape: 'squircle' },
};
