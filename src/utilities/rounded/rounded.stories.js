/** @import { Meta, StoryObj } from '@storybook/html' */
import sizesDemo from './demo/sizes.twig';
import './demo/styles.scss';

/** @type {Meta} */
const meta = {
  title: 'Utilities/Rounded Corners',
  render: () => sizesDemo(),
};

export default meta;

/** @type {StoryObj} */
export const Sizes = {};
