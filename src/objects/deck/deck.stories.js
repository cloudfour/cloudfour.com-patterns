/** @import { Args, Meta, StoryContext, StoryObj } from '@storybook/html' */
import alignmentDemo from './demo/alignment.twig';
import articles from './demo/articles.json';
import articlesDemo from './demo/articles.twig';
/** @param {Args} args */
const articlesStory = (args) => articlesDemo({ items: articles, ...args });
/** @param {Args} args */
const alignmentStory = (args) => alignmentDemo({ items: articles, ...args });
// Custom function for generating story source from args given
/**
 * @param {string} _src
 * @param {StoryContext} storyContext
 */
const articlesTemplateSource = (_src, storyContext) => {
  /** @type {Args} */
  const args = storyContext.args || storyContext.initialArgs || {};
  let twigArgs = '';
  if (
    args.columns &&
    args.columns > 1 &&
    args.columnsBreakpoint &&
    args.columnsBreakpoint !== 'none'
  ) {
    twigArgs = ` with {
  class: 'o-deck--${args.columns}-column${args.columnsBreakpoint}'
}`;
  }
  return `{% embed '@cloudfour/objects/deck/deck.twig'${twigArgs} only %}
  {% block content %}
    {# cards #}
  {% endblock %}
{% endembed %}`;
};
// Keyed by value rather than label: `options` is the list of values, and
// `control.labels` maps each one to what the select shows.
const alignmentLabels = {
  '': 'None',
  alignfull: 'Full',
  alignwide: 'Wide',
};

/** @type {Meta} */
const meta = {
  title: 'Objects/Deck',
  args: {
    columns: 3,
    columnsBreakpoint: 'none',
    horizontalItem: 1,
    horizontalBreakpoint: 'none',
  },
  argTypes: {
    class: { type: { name: 'string' } },
    alignment: {
      options: Object.keys(alignmentLabels),
      control: { type: 'select', labels: alignmentLabels },
    },
    columns: {
      control: {
        type: 'range',
        min: 1,
        max: 6,
        step: 1,
      },
    },
    columnsBreakpoint: {
      options: ['none', '@s', '@m', '@l', '@xl'],
      type: { name: 'string' },
      control: { type: 'inline-radio' },
    },
    horizontalItem: {
      control: {
        type: 'range',
        min: 1,
        max: articles.length,
        step: 1,
      },
    },
    horizontalBreakpoint: {
      options: ['none', '@m', '@l', '@xl'],
      type: { name: 'string' },
      control: { type: 'inline-radio' },
    },
    tag_name: {
      type: { name: 'string' },
      description: 'The root tag for the component',
      table: {
        defaultValue: {
          summary: 'div',
        },
      },
    },
  },
  parameters: {
    docs: {
      story: { inline: false },
      source: { transform: articlesTemplateSource },
    },
  },
};

export default meta;

/** @type {StoryObj} */
export const Basic = {
  parameters: { docs: { story: { iframeHeight: '400px' } } },
  render: articlesStory.bind({}),
};

/** @type {StoryObj} */
export const Alignment = {
  parameters: { docs: { story: { iframeHeight: '200px' } } },
  args: {
    columns: 3,
    columnsBreakpoint: '@m',
    class: 'o-deck--align-start',
  },
  render: alignmentStory.bind({}),
};

/** @type {StoryObj} */
export const Columns = {
  parameters: { docs: { story: { iframeHeight: '400px' } } },
  args: {
    columns: 3,
    columnsBreakpoint: '@m',
  },
  render: articlesStory.bind({}),
};

/** @type {StoryObj} */
export const HorizontalCard = {
  parameters: { docs: { story: { iframeHeight: '500px' } } },
  name: 'Horizontal Card',
  args: {
    columns: 3,
    columnsBreakpoint: '@l',
    horizontalBreakpoint: '@m',
  },
  render: articlesStory.bind({}),
};
