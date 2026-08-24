/** @import { Args, Meta, StoryObj } from '@storybook/html' */
import alternateDemo from './demo/theme-alternate.twig';
import demo from './demo/theme.twig';
/** @param {Args} args */
const demoStory = (args) => demo(args);

/** @type {Meta} */
const meta = {
  title: 'Design/Themes',
};

export default meta;

/** @type {StoryObj} */
export const Light = {
  args: { theme: 'light' },
  parameters: { theme: 't-light' },
  render: demoStory.bind({}),
};

/** @type {StoryObj} */
export const Dark = {
  args: { theme: 'dark' },
  parameters: { theme: 't-dark' },
  render: demoStory.bind({}),
};

/** @type {StoryObj} */
export const AlternateWithLight = {
  name: 'Alternate with Light',
  args: { theme: 'light' },
  parameters: { theme: 't-light' },
  render: (args) => alternateDemo(args),
};

/** @type {StoryObj} */
export const AlternateWithDark = {
  name: 'Alternate with Dark',
  args: { theme: 'dark' },
  parameters: { theme: 't-dark' },
  render: (args) => alternateDemo(args),
};
