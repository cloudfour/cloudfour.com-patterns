/** @import { Meta, StoryContext, StoryObj } from '@storybook/html' */
import { mediaArgTypes } from './demo/arg-types.js';
import calendarDateDemo from './demo/calendar-date.twig';
import calendarDateDemoSource from './demo/calendar-date.twig?raw';
import checkboxDemo from './demo/checkbox.twig';
import checkboxDemoSource from './demo/checkbox.twig?raw';
import imageDemo from './demo/image.twig';
import meganProfileImage from './demo/megan.png';
const exampleText =
  'One of the things that is really clear to us (and that we hear often from our clients) is that the way we engage with our clients is unique. In fact, bringing clients in early and often to our process is one of our specialties at Cloud Four.';
// We define a source transform for the image demo since it needs to
// respond to args more dynamically than other demos.
/**
 * @param {string} _src
 * @param {StoryContext} storyContext
 */
const imageDemoTransformSource = (_src, storyContext) => {
  const { args } = storyContext;
  const withStr = args?.reverse
    ? ` with {
  reverse: true
}`
    : '';
  return `{% embed '@cloudfour/objects/media/media.twig'${withStr} only %}
  {% block object %}
    {% include '@cloudfour/components/avatar/avatar.twig' with {
      src: '${args?.imgSrc}'
    } only %}
  {% endblock %}
  {% block content %}
    <p>${args?.text}</p>
  {% endblock %}
{% endembed %}`;
};

/** @type {Meta} */
const meta = {
  title: 'Objects/Media',
  args: {
    imgSrc: meganProfileImage,
    text: exampleText,
    reverse: false,
  },
  argTypes: {
    ...mediaArgTypes,
    imgSrc: { type: { name: 'string', required: true } },
    text: { type: { name: 'string' } },
  },
};

export default meta;

/** @type {StoryObj} */
export const Image = {
  parameters: {
    docs: {
      source: { transform: imageDemoTransformSource },
    },
  },
  render: (args) => imageDemo(args),
};

/** @type {StoryObj} */
export const GenerousSpacing = {
  name: 'Generous Spacing',
  args: { generous: true },
  parameters: {
    docs: {
      source: { transform: imageDemoTransformSource },
    },
  },
  render: (args) => imageDemo(args),
};

/** @type {StoryObj} */
export const ImageReversed = {
  name: 'Image Reversed',
  args: { reverse: true },
  parameters: {
    docs: {
      source: { transform: imageDemoTransformSource },
    },
  },
  render: (args) => imageDemo(args),
};

/** @type {StoryObj} */
export const RelativeSize = {
  name: 'Relative Size',
  args: { class: 'o-media--1-by-3' },
  parameters: {
    docs: {
      source: { transform: imageDemoTransformSource },
    },
  },
  render: (args) => imageDemo(args),
};

/** @type {StoryObj} */
export const CheckboxLabel = {
  name: 'Checkbox Label',
  parameters: { docs: { source: { code: checkboxDemoSource } } },
  render: checkboxDemo,
};

/** @type {StoryObj} */
export const EventSummary = {
  name: 'Event Summary',
  parameters: { docs: { source: { code: calendarDateDemoSource } } },
  render: calendarDateDemo,
};

/** @type {StoryObj} */
export const Jaunty = {
  args: { jaunty: true },
  parameters: {
    docs: {
      source: { transform: imageDemoTransformSource },
    },
  },
  render: (args) => imageDemo(args),
};

/** @type {StoryObj} */
export const AlignDefault = {
  name: 'Align Default',
  args: {
    text: 'Default alignment',
  },
  parameters: {
    docs: {
      source: { transform: imageDemoTransformSource },
    },
  },
  render: (args) => imageDemo(args),
};

/** @type {StoryObj} */
export const AlignStart = {
  name: 'Align Start',
  args: {
    align_start: true,
    text: 'Align start alignment',
  },
  parameters: {
    docs: {
      source: { transform: imageDemoTransformSource },
    },
  },
  render: (args) => imageDemo(args),
};
