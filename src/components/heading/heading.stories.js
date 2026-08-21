import { makeTwigEmbedIfHtml } from '../../make-twig-include.js';

import demo from './demo/demo.twig';

export default {
  title: 'Components/Heading',
  argTypes: {
    content: {
      type: { name: 'string', required: true },
      description: 'The content of the heading. Also available as a block.',
    },
    id: {
      type: 'string',
      description: 'Used to identify the heading element for permalinks.',
    },
    level: {
      type: 'number',
      description:
        'Determines the visual size and/or default `tag_name` of the heading.',
      control: {
        type: 'range',
        min: -2,
        max: 6,
        step: 1,
      },
    },
    permalink: {
      type: 'boolean',
      description: 'Include an iconographic permalink handle with the heading.',
    },
    subheading: {
      type: 'string',
      description:
        'Content to follow the main heading. Also available as a block.',
    },
    tag_name: {
      type: 'string',
      description:
        'The semantic element to use for the heading, usually an `h*` element. If abscent, the `level` will be used to determine the best element.',
      options: ['', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' },
    },
    weight: {
      type: 'string',
      description: 'The desired `font-weight` option for the heading.',
      options: ['', 'light'],
      control: { type: 'select' },
    },
    class: {
      type: 'string',
      description: 'If necessary, additional classes can be added to headings.',
    },
  },
  parameters: {
    docs: {
      source: {
        transform: (_code, storyContext) =>
          makeTwigEmbedIfHtml(
            '@cloudfour/components/heading/heading.twig',
            storyContext.args || storyContext.initialArgs || {},
            ['content', 'subheading'],
          ),
      },
    },
  },
  render: (args) => demo(args),
};

export const Example = {
  args: { content: 'Hello world', level: 1 },
};

export const LevelMinus2 = {
  name: 'Level Minus 2',
  args: { level: -2, content: 'Level -2' },
};

export const LevelMinus1 = {
  name: 'Level Minus 1',
  args: { level: -1, content: 'Level -1' },
};

export const Level0 = {
  name: 'Level 0',
  args: { level: 0, content: 'Level 0' },
};

export const Level1 = {
  name: 'Level 1',
  args: { level: 1, content: 'Level 1' },
};

export const Level2 = {
  name: 'Level 2',
  args: { level: 2, content: 'Level 2' },
};

export const Level3 = {
  name: 'Level 3',
  args: { level: 3, content: 'Level 3' },
};

export const Level4 = {
  name: 'Level 4',
  args: { level: 4, content: 'Level 4' },
};

export const Level5 = {
  name: 'Level 5',
  args: { level: 5, content: 'Level 5' },
};

export const Level6 = {
  name: 'Level 6',
  args: { level: 6, content: 'Level 6' },
};

export const DefaultWeight = {
  name: 'Default weight',
  args: { level: 1, content: 'Default weight' },
};

export const MediumWeight = {
  name: 'Medium weight',
  args: {
    level: 1,
    weight: 'medium',
    content: 'Medium weight with <b>bold</b> word',
  },
};

export const LightWeight = {
  name: 'Light weight',
  args: {
    level: 1,
    weight: 'light',
    content: 'Light weight with <b>bold</b> word',
  },
};

export const Permalink = {
  args: {
    content: 'Hello world',
    level: 1,
    permalink: true,
    id: 'permalink-example',
  },
};

export const Subheading = {
  args: {
    level: 1,
    content: 'Watch',
    subheading:
      'Smashing Conference (<time datetime="2018-10-23">Oct 23, 2018</time>)',
  },
};
