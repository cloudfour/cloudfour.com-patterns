/** @import { ArgTypes, Meta, StoryObj } from '@storybook/html' */
import template from './calendar-date.twig';
import seasonsDemo from './demo/seasons.twig';
import './demo/styles.scss';
/** @type {Partial<ArgTypes>} */
const argTypes = {
  datetime: {
    control: { type: 'date' },
  },
  note: { type: { name: 'string' } },
};

/** @type {Meta} */
const meta = {
  title: 'Components/Calendar Date',
};

export default meta;

/** @type {StoryObj} */
export const Basic = {
  args: { datetime: Date.now() },
  argTypes,
  render: ({ datetime, note }) =>
    template({ datetime: new Date(datetime), note }),
};

/** @type {StoryObj} */
export const WithNote = {
  name: 'With Note',
  args: { datetime: Date.now(), note: '3-day event' },
  argTypes,
  render: ({ datetime, note }) =>
    template({ datetime: new Date(datetime), note }),
};

/** @type {StoryObj} */
export const Seasons = {
  parameters: {
    docs: {
      source: {
        code: `{% include '@cloudfour/components/calendar-date/calendar-date.twig' with {
  datetime: '2020-04-01'
} only %}
{% include '@cloudfour/components/calendar-date/calendar-date.twig' with {
  datetime: '2020-07-04'
} only %}
{% include '@cloudfour/components/calendar-date/calendar-date.twig' with {
  datetime: '2020-10-31'
} only %}
{% include '@cloudfour/components/calendar-date/calendar-date.twig' with {
  datetime: '2020-12-31'
} only %}`,
      },
    },
  },
  render: () => seasonsDemo(),
};
