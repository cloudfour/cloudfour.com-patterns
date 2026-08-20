import demo from './demo/example.twig';
import nestingDemo from './demo/nesting.twig';
import nestingDemoSource from './demo/nesting.twig?raw';
const argsStringFromStoryContext = (storyContext) => {
  const args = storyContext.args || storyContext.initialArgs || {};
  return Object.keys(args).length > 0
    ? ` with ${JSON.stringify(args, null, 2)}`
    : '';
};
const demoTransformSource = (_src, storyContext) => {
  const argsString = argsStringFromStoryContext(storyContext);
  return `{% embed '@cloudfour/objects/rhythm/rhythm.twig'${argsString} only %}
  {% block content %}
    {# Headings, paragraphs, content, etc. #}
  {% endblock %}
{% endembed %}`;
};
const nestingDemoTransformSource = (_src, storyContext) => {
  const argsString = argsStringFromStoryContext(storyContext);
  return nestingDemoSource.replace(".twig' %}", `.twig'${argsString} only %}`);
};
const amountOptions = [
  '',
  'compact',
  'condensed',
  'default',
  'generous',
  'lavish',
];
const argTypes = {
  amount: {
    options: amountOptions,
    type: { name: 'enum' },
    control: { type: 'select' },
    description:
      'Amount of vertical space to apply between adjacent elements as a keyword.',
  },
  heading_amount: {
    options: ['', 'generous', 'lavish'],
    type: { name: 'enum' },
    control: { type: 'select' },
    description:
      'Amount of vertical space to apply before headings as a keyword.',
  },
  class: {
    type: { name: 'string' },
    description: 'CSS class name to append to element.',
  },
  tag_name: {
    type: { name: 'string' },
    description: 'The HTML tag of the element.',
    table: {
      defaultValue: {
        summary: 'div',
      },
    },
  },
};

export default {
  title: 'Objects/Rhythm',
  argTypes,
  parameters: {
    docs: { source: { transform: demoTransformSource } },
  },
};

export const Example = {
  render: (args) => demo(args),
};

export const Amount = {
  args: { amount: 'condensed' },
  render: (args) => demo(args),
};

export const HeadingAmount = {
  name: 'Heading Amount',
  args: { amount: 'condensed', heading_amount: 'generous' },
  render: (args) => demo(args),
};

export const Nesting = {
  args: { amount: 'condensed' },
  argTypes: {
    ...argTypes,
    nested_amount: {
      options: amountOptions,
      type: { name: 'enum' },
      control: { type: 'select' },
    },
  },
  parameters: {
    docs: { source: { transform: nestingDemoTransformSource } },
  },
  render: (args) => nestingDemo(args),
};
