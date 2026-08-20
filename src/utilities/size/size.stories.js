import blockSizeDemo from './demo/block-size.twig';
import inlineSizeDemo from './demo/inline-size.twig';
import responsiveDemo from './demo/responsive.twig';
import './demo/styles.scss';

export default {
  title: 'Utilities/Size',
};

export const InlineSizeWidth = {
  name: 'Inline size (Width)',
  render: () => inlineSizeDemo(),
};

export const BlockSizeHeight = {
  name: 'Block size (Height)',
  render: () => blockSizeDemo(),
};

export const Responsive = {
  render: () => responsiveDemo(),
};
