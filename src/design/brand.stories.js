/** @import { Meta, StoryObj } from '@storybook/html' */
import logoSrc from '../assets/brand/logo.svg';

/** @type {Meta} */
const meta = {
  title: 'Design/Brand',
  render: () => `<img src="${logoSrc}" alt="Cloud Four">`,
};

export default meta;

/** @type {StoryObj} */
export const Logo = {};
