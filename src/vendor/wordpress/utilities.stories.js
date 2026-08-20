import { kebabCase } from 'lodash';

import tokens from '../../compiled/tokens/js/tokens.js';

import alignmentDemo from './demo/alignment.twig';
import colorDemo from './demo/color.twig';
import fontSizeDemo from './demo/font-size.twig';
const baseColorTokenKeys = Object.keys(tokens.color.base).map(kebabCase);
const colorControlConfig = {
  options: ['', ...baseColorTokenKeys],
  type: { name: 'string' },
  control: { type: 'select' },
};
const fontSizeControlConfig = {
  type: { name: 'string' },
  control: {
    type: 'select',
    options: [
      '',
      'big',
      'small',
      'heading-n-2',
      'heading-n-1',
      'heading-0',
      'heading-1',
      'heading-2',
      'heading-3',
    ],
  },
};

export default {
  title: 'Vendor/WordPress/Utilities',
};

export const Color = {
  args: {
    color: 'fuchsia-lighter',
    background_color: 'purple-darker',
  },
  argTypes: {
    color: colorControlConfig,
    background_color: colorControlConfig,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => colorDemo(args),
};

export const FontSize = {
  name: 'Font Size',
  args: {
    font_size: 'big',
  },
  argTypes: {
    font_size: fontSizeControlConfig,
  },
  render: (args) => fontSizeDemo(args),
};

export const Alignment = {
  args: { alignment: 'alignwide' },
  argTypes: {
    alignment: {
      options: [
        '',
        'alignleft',
        'aligncenter',
        'alignright',
        'alignfull',
        'alignwide',
      ],
      control: { type: 'select' },
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false } },
  },
  render: (args) => alignmentDemo(args),
};
