import alignmentDemo from './demo/alignment.twig';
import articles from './demo/articles.json';
import articlesDemo from './demo/articles.twig';
const articlesStory = (args) => articlesDemo({ items: articles, ...args });
const alignmentStory = (args) => alignmentDemo({ items: articles, ...args });
// Custom function for generating story source from args given
const articlesTemplateSource = (_src, storyContext) => {
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
const alignmentClasses = {
  None: '',
  Full: 'alignfull',
  Wide: 'alignwide',
};

export default {
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
      options: alignmentClasses,
      control: { type: 'select' },
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

export const Basic = {
  parameters: { docs: { story: { iframeHeight: '400px' } } },
  render: articlesStory.bind({}),
};

export const Alignment = {
  parameters: { docs: { story: { iframeHeight: '200px' } } },
  args: {
    columns: 3,
    columnsBreakpoint: '@m',
    class: 'o-deck--align-start',
  },
  render: alignmentStory.bind({}),
};

export const Columns = {
  parameters: { docs: { story: { iframeHeight: '400px' } } },
  args: {
    columns: 3,
    columnsBreakpoint: '@m',
  },
  render: articlesStory.bind({}),
};

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
