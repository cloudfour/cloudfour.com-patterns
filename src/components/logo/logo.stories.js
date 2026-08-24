/** @import { Meta, StoryObj } from '@storybook/html' */
import alignmentDemo from './demo/alignment.twig';
import logoTemplate from './logo.twig';
import './demo/alignment.scss';
const alignOptions = ['start', 'center', 'end'];

/** @type {Meta} */
const meta = {
  title: 'Components/Logo',
};

export default meta;

/** @type {StoryObj} */
export const BasicOptions = {
  name: 'Basic Options',
  args: {
    src: '/media/logos/pleasantest.svg',
    alt: 'Pleasantest',
    width: 180,
    height: 58,
  },
  argTypes: {
    src: { control: { type: 'text' } },
    alt: { control: { type: 'text' } },
    class: { control: { type: 'text' } },
    width: { control: { type: 'number' } },
    height: { control: { type: 'number' } },
    scale: { control: { type: 'number' } },
    align: {
      options: alignOptions,
      control: { type: 'inline-radio' },
    },
    justify: {
      options: alignOptions,
      control: { type: 'inline-radio' },
    },
  },
  render: (args) => logoTemplate(args),
};

/** @type {StoryObj} */
export const BeforeAlignment = {
  name: 'Before Alignment',
  render: alignmentDemo.bind({}),
};

/** @type {StoryObj} */
export const AfterAlignment = {
  name: 'After Alignment',
  args: { align: true },
  render: alignmentDemo.bind({}),
};
