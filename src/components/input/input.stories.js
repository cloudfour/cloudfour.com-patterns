import { useEffect } from 'storybook/preview-api';

import { makeTwigInclude } from '../../make-twig-include.js';

import selectDemo from './demo/select.twig';
import selectDemoSource from './demo/select.twig?raw';
import './demo/styles.scss';
import { createElasticTextArea } from './elastic-textarea.ts';
import input from './input.twig';

const elasticTextAreaConfig = {
  type: 'textarea',
  value:
    'We are a small, versatile team who care passionately about the web. We’re full of what our industry considers unicorns. Our designers code. Our developers went to art school.',
  placeholder: 'Placeholder text…',
  id: 'demo-elastic',
  rows: 2,
  class: 'js-elastic-textarea',
};

// Inline stories disabled because when the same input element is rendered with
// different settings within the same file, React syncs all their properties.

export default {
  title: 'Components/Input',
  parameters: { docs: { story: { inline: false } } },
};

export const TextElements = {
  name: 'Text Elements',
  args: {
    type: 'text',
    placeholder: 'Placeholder text…',
    id: 'demo-input',
    readonly: false,
    disabled: false,
  },
  argTypes: {
    type: {
      options: ['text', 'email', 'search', 'date', 'textarea'],
      type: { name: 'string' },
      control: {
        type: 'select',
      },
    },
    value: { type: { name: 'string' } },
    placeholder: { type: { name: 'string' } },
    id: { type: { name: 'string' } },
    readonly: { type: { name: 'boolean' } },
    disabled: { type: { name: 'boolean' } },
  },
  render: (args) => input(args),
};

export const SelectElement = {
  name: 'Select Element',
  args: {
    id: 'demo-select',
    disabled: false,
  },
  argTypes: {
    id: { type: { name: 'string' } },
    disabled: { type: { name: 'boolean' } },
  },
  parameters: { docs: { source: { code: selectDemoSource } } },
  render: (args) => selectDemo(args),
};

export const ElasticTextarea = {
  name: 'Elastic Textarea',
  args: elasticTextAreaConfig,
  argTypes: {
    rows: { type: { name: 'number' } },
    class: { type: { name: 'string' } },
  },
  parameters: {
    docs: {
      story: { iframeHeight: '250px' },
      source: {
        code: makeTwigInclude(
          '@cloudfour/components/input/input.twig',
          elasticTextAreaConfig,
        ),
      },
    },
  },
  render: (args) => {
    // Use storybook hooks to trigger JS after story renders
    // @see https://github.com/storybookjs/storybook/issues/7786
    useEffect(() => {
      createElasticTextArea(document.querySelector('.js-elastic-textarea'));
    });
    return input(args);
  },
};
