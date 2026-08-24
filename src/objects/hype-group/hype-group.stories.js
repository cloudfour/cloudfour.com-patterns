/** @import { Args, Meta, StoryContext, StoryObj } from '@storybook/html' */
import multipleDemo from './demo/multiple.twig';
import singleDemo from './demo/single.twig';
const defaultArgs = {
  content_class: 'o-rhythm',
  object_shape: 'circle',
  example_paragraphs: 3,
  example_object_img_src: '/media/feature-ozzie-wide.jpg',
  example_object_img_size: 480,
};
/**
 * @param {Args} args
 * @param {boolean} [multiple]
 */
const demoStory = (args, multiple) => {
  args = { ...defaultArgs, ...args };
  if (args.object_shape === 'square') {
    delete args.object_shape;
  }
  return multiple ? multipleDemo(args) : singleDemo(args);
};
/**
 * @param {string} _src
 * @param {StoryContext} storyContext
 */
const singleTransformSource = (_src, storyContext) => {
  const args = storyContext.args || storyContext.initialArgs || {};
  if (args.object_shape === 'square') {
    delete args.object_shape;
  }
  for (const key of Object.keys(args)) {
    if (key.startsWith('example_')) {
      delete args[key];
    }
  }
  const argsString =
    Object.keys(args).length > 0
      ? ` with ${JSON.stringify(args, null, 2)}`
      : '';
  return `{% embed '@cloudfour/objects/hype-group/hype-group.twig'${argsString} only %}
  {% block intro %}
    {# heading, etc. #}
  {% endblock %}
  {% block object %}
    {# image element #}
  {% endblock %}
  {% block content %}
    {# description, etc. #}
  {% endblock %}
{% endembed %}`;
};

/** @type {Meta} */
const meta = {
  title: 'Objects/Hype Group',
  argTypes: {
    reverse: { type: 'boolean' },
    object_shape: {
      options: ['circle', 'square'],
      control: { type: 'select' },
    },
    object_outline: { type: 'boolean' },
    class: { type: 'string' },
    intro_class: { type: 'string' },
    content_class: { type: 'string' },
    example_object_img_src: { type: 'string' },
    example_object_img_size: { type: 'number' },
    example_paragraphs: {
      type: 'number',
      control: {
        type: 'range',
        min: 1,
        max: 4,
        step: 1,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false } },
  },
};

export default meta;

/** @type {StoryObj} */
export const Single = {
  args: defaultArgs,
  parameters: {
    docs: {
      story: { iframeHeight: '500px' },
      source: { transform: singleTransformSource },
    },
  },
  render: (args) => demoStory(args),
};

/** @type {StoryObj} */
export const WithOptions = {
  name: 'With options',
  args: {
    ...defaultArgs,
    object_shape: 'square',
    object_outline: true,
    reverse: true,
  },
  parameters: {
    docs: {
      story: { iframeHeight: '500px' },
      source: { transform: singleTransformSource },
    },
  },
  render: (args) => demoStory(args),
};

/** @type {StoryObj} */
export const Multiple = {
  parameters: { docs: { story: { iframeHeight: '640px' } } },
  args: {
    ...defaultArgs,
    example_object_img_src: '/media/avatar-buster-a.jpg',
  },
  render: (args) => demoStory(args, true),
};
