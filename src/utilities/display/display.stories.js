/** @import { Meta, StoryObj } from '@storybook/html' */
import clearfixDemo from './demo/clearfix.twig';
import hiddenVisuallyDemo from './demo/hidden-visually.twig';

/** @type {Meta} */
const meta = {
  title: 'Utilities/Display',
};

export default meta;

/** @type {StoryObj} */
export const HiddenVisually = {
  name: 'Hidden Visually',
  render: hiddenVisuallyDemo,
};

/** @type {StoryObj} */
export const Clearfix = {
  render: clearfixDemo,
};
