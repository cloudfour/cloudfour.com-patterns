/** @import { Meta, StoryObj } from '@storybook/html' */
import template from './author.twig';
const allAuthors = [
  {
    name: 'Bubba B-Man',
    avatar: '/media/avatar-buster-a.jpg',
    link: '#',
  },
  {
    name: 'Ozzbot Ozworth',
    avatar: '/media/avatar-ozzie-a.jpg',
    link: '#',
  },
  {
    name: 'Buster Sticka',
    avatar: '/media/avatar-buster-b.jpg',
    link: '#',
  },
  {
    name: 'Ozzie Notarte',
    avatar: '/media/avatar-ozzie-b.jpg',
    link: '#',
  },
];
const authors = (count = 1) => allAuthors.slice(0, count);
const authorsWithNoLink = (count = 1) =>
  allAuthors
    .map(({ name, avatar }) => ({
      name,
      avatar,
    }))
    .slice(0, count);

/** @type {Meta} */
const meta = {
  title: 'Components/Author',
  argTypes: {
    count: {
      type: 'number',
      description: 'Number of authors to show',
      control: {
        type: 'range',
        min: 1,
        max: allAuthors.length,
        step: 1,
      },
    },
  },
};

export default meta;

/** @type {StoryObj} */
export const BasicUsage = {
  name: 'Basic usage',
  args: { count: 1 },
  render: (args) =>
    template({
      authors: authorsWithNoLink(args.count),
    }),
};

/** @type {StoryObj} */
export const WithLink = {
  name: 'With link',
  args: { count: 1 },
  render: (args) =>
    template({
      authors: authors(args.count),
      unlink: false,
    }),
};

/** @type {StoryObj} */
export const RemoveLink = {
  name: 'Remove link',
  args: { count: 1 },
  render: (args) =>
    template({
      authors: authors(args.count),
      unlink: true,
    }),
};

/** @type {StoryObj} */
export const WithMetaContent = {
  name: 'With meta content',
  args: { count: 1 },
  render: (args) =>
    template({
      authors: authors(args.count),
      meta: 'Front-end Designer',
    }),
};

/** @type {StoryObj} */
export const WithDateContent = {
  name: 'With date content',
  args: { count: 1 },
  render: (args) =>
    template({
      authors: authors(args.count),
      date: new Date('September 29, 2021'),
    }),
};

/** @type {StoryObj} */
export const ShortDateFormat = {
  name: 'Short date format',
  args: { count: 1 },
  render: (args) =>
    template({
      authors: authors(args.count),
      date: new Date('September 29, 2021'),
      date_format: 'short',
    }),
};

/** @type {StoryObj} */
export const MultipleAuthors = {
  name: 'Multiple authors',
  args: { count: 3 },
  render: (args) =>
    template({
      authors: authors(args.count),
      date: new Date('March 31, 2021'),
    }),
};
