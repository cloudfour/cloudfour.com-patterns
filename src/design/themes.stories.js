import alternateDemo from './demo/theme-alternate.twig';
import demo from './demo/theme.twig';
const demoStory = (args) => demo(args);

export default {
  title: 'Design/Themes',
};

export const Light = {
  args: { theme: 'light' },
  parameters: { theme: 't-light' },
  render: demoStory.bind({}),
};

export const Dark = {
  args: { theme: 'dark' },
  parameters: { theme: 't-dark' },
  render: demoStory.bind({}),
};

export const AlternateWithLight = {
  name: 'Alternate with Light',
  args: { theme: 'light' },
  parameters: { theme: 't-light' },
  render: (args) => alternateDemo(args),
};

export const AlternateWithDark = {
  name: 'Alternate with Dark',
  args: { theme: 'dark' },
  parameters: { theme: 't-dark' },
  render: (args) => alternateDemo(args),
};
