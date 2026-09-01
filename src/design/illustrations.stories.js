/** @import { Meta, StoryObj } from '@storybook/html' */
import avatarDefaultSrc from '../assets/illustrations/avatar/default.svg';
import avatarTransparentSrc from '../assets/illustrations/avatar/transparent.svg';
import responsiveImage from '../assets/illustrations/responsive-fallback.svg';

import imageDeck from './demo/image-deck.twig';
import responsiveImageDeck from './demo/responsive-image-deck.twig';

// Vite's equivalent of webpack's require.context. A plain `.svg` import resolves to
// the asset's URL; only `?react` imports become components.
const featureImages = import.meta.glob(
  '../assets/illustrations/feature/*.svg',
  {
    eager: true,
    import: 'default',
  },
);

const featureImageData = Object.entries(featureImages)
  .map(([filePath, src]) => ({
    name: (filePath.split('/').pop() ?? '').replace(/\.svg$/v, ''),
    src,
  }))
  .toSorted((a, b) => a.name.localeCompare(b.name));

/** @type {Meta} */
const meta = {
  title: 'Design/Illustrations',
};

export default meta;

/** @type {StoryObj} */
export const FeatureImages = {
  name: 'Feature images',
  render: () => imageDeck({ images: featureImageData }),
};

/** @type {StoryObj} */
export const ResponsiveFallbackImage = {
  name: 'Responsive fallback image',
  render: () =>
    responsiveImageDeck({
      ratios: ['1 / 1', '16 / 9', '9 / 16'],
      source: responsiveImage,
    }),
};

/** @type {StoryObj} */
export const DefaultAvatar = {
  name: 'Default avatar',
  render: () => `<img src="${avatarDefaultSrc}" alt="Default avatar">`,
};

/** @type {StoryObj} */
export const TransparentAvatar = {
  name: 'Transparent avatar',
  parameters: {
    docs: {
      // The checkerboard is only there to show the transparency, so keep it out of
      // the source snippet.
      source: {
        transform: (/** @type {string} */ code) =>
          code.replaceAll(/ style="[^"]+"/gv, ''),
      },
    },
  },
  render: () =>
    `<img src="${avatarTransparentSrc}" alt="Transparent avatar" style="background-color: var(--theme-color-background-secondary); background-image: linear-gradient(45deg, var(--theme-color-border-base) 25%, transparent 25%, transparent 75%, var(--theme-color-border-base) 75%, var(--theme-color-border-base)),
linear-gradient(45deg, var(--theme-color-border-base) 25%, transparent 25%, transparent 75%, var(--theme-color-border-base) 75%, var(--theme-color-border-base)); background-size: 40px 40px; background-position: 0 0, 20px 20px;">`,
};
