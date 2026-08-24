/** @import { ArgTypes, Meta, StoryObj } from '@storybook/html' */
import listDemo from './demo/list.twig';
import listDemoSource from './demo/list.twig?raw';
import topics from './demo/topics.json';
import template from './dot-leader.twig';
/** @type {Partial<ArgTypes>} */
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

/** @type {Meta} */
const meta = {
  title: 'Components/Dot Leader',
};

export default meta;

/** @type {StoryObj} */
export const Single = {
  args: argDefaults,
  argTypes,
  render: (args) => template(args),
};

/** @type {StoryObj} */
export const Link = {
  args: {
    href: 'https://cloudfour.com/topics/design-systems/',
    ...argDefaults,
  },
  argTypes,
  render: (args) => template(args),
};

/** @type {StoryObj} */
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
