/** @import { Meta, StoryObj } from '@storybook/html' */
import blockSizeDemo from './demo/block-size.twig';
import inlineSizeDemo from './demo/inline-size.twig';
import responsiveDemo from './demo/responsive.twig';
import './demo/styles.scss';

/** @type {Meta} */
const meta = {
  title: 'Utilities/Size',
};

export default meta;

/** @type {StoryObj} */
export const InlineSizeWidth = {
  name: 'Inline size (Width)',
  render: () => inlineSizeDemo(),
};

/** @type {StoryObj} */
export const BlockSizeHeight = {
  name: 'Block size (Height)',
  render: () => blockSizeDemo(),
};

/** @type {StoryObj} */
export const Responsive = {
  render: () => responsiveDemo(),
};
