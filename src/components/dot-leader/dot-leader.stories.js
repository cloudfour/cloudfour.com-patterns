import listDemo from './demo/list.twig';
import listDemoSource from './demo/list.twig?raw';
import topics from './demo/topics.json';
import template from './dot-leader.twig';
const argTypes = {
  label: { type: { name: 'string' } },
  count: { type: { name: 'number' } },
  href: { type: { name: 'string' } },
  count_noun_single: { type: { name: 'string' } },
  count_noun_plural: { type: { name: 'string' } },
};
const argDefaults = {
  label: 'Design systems',
  count: 42,
  count_noun_single: 'article',
  count_noun_plural: 'articles',
};

export default {
  title: 'Components/Dot Leader',
};

export const Single = {
  args: argDefaults,
  argTypes,
  render: (args) => template(args),
};

export const Link = {
  args: {
    href: 'https://cloudfour.com/topics/design-systems/',
    ...argDefaults,
  },
  argTypes,
  render: (args) => template(args),
};

export const List = {
  parameters: {
    docs: {
      source: {
        code: listDemoSource,
      },
    },
  },
  render: () => listDemo({ topics }),
};
