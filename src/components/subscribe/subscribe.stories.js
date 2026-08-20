import { useEffect } from 'storybook/preview-api';

import { makeTwigInclude } from '../../make-twig-include.js';

import template from './demo/storybook-demo.twig';
import { createSubscribe } from './subscribe.ts';
// Helper function to initialize toggling button JS
const templateStory = (args) => {
  useEffect(() => {
    // Initialize the component
    const subscribeComponent = createSubscribe(
      document.querySelector('.js-subscribe')
    );
    subscribeComponent.init();
    // Set up the demo destroy button
    const destroyBtn = document.querySelector('.js-destroy-button');
    destroyBtn.addEventListener('click', subscribeComponent.destroy);
    // Set up the demo init button
    const initBtn = document.querySelector('.js-init-button');
    initBtn.addEventListener('click', subscribeComponent.init);
    return () => {
      // Make sure to cleanup
      destroyBtn.removeEventListener('click', subscribeComponent.destroy);
      initBtn.removeEventListener('click', subscribeComponent.init);
      subscribeComponent.destroy();
    };
  });
  return template(args);
};

export default {
  title: 'Components/Subscribe',
  argTypes: {
    form_id: {
      type: { name: 'string', required: true },
      description: 'Appends to the Weekly Digests form `id` (should be unique)',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
    form_action: {
      type: { name: 'string', required: true },
      description: 'The Weekly Digests form `action` value',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
    class: {
      type: 'string',
      description: 'Appends to the CSS class of the root element',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
    heading_tag: {
      type: 'string',
      description: 'Sets the heading tag',
      control: 'text',
    },
    heading_level: {
      type: 'number',
      description:
        'Sets the heading level. If `heading_tag`, is specified, `heading_level` will override only visual styles.',
      table: {
        defaultValue: { summary: 2 },
      },
      control: {
        type: 'range',
        min: -2,
        max: 6,
        step: 1,
      },
    },
    heading_weight: {
      type: 'string',
      description: 'The desired `font-weight` option for the heading.',
      options: ['', 'light'],
      control: { type: 'select' },
    },
    subscribe_heading: {
      type: 'string',
      description: 'The overall subscribe component heading',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
    notifications_btn_class: {
      type: 'string',
      description: 'Appends to the CSS class of the "Get notifications" button',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
    notifications_btn_initial_label: {
      type: 'string',
      description:
        'See [Button Swap `initial_label`](/?path=/docs/components-button-swap--default-story#template-properties)',
      table: {
        defaultValue: { summary: 'Notifications have been turned off.' },
      },
    },
    notifications_btn_initial_visual_label: {
      type: 'string',
      description:
        'See [Button Swap `initial_visual_label`](/?path=/docs/components-button-swap--default-story#template-properties)',
      table: { defaultValue: { summary: 'Get notifications' } },
    },
    notifications_btn_swapped_label: {
      type: 'string',
      description:
        'See [Button Swap `swapped_label`](/?path=/docs/components-button-swap--default-story#template-properties)',
      table: {
        defaultValue: { summary: 'Notifications have been turned on.' },
      },
    },
    notifications_btn_swapped_visual_label: {
      type: 'string',
      description:
        'See [Button Swap `swapped_visual_label`](/?path=/docs/components-button-swap--default-story#template-properties)',
      table: {
        defaultValue: { summary: 'Turn off notifications' },
      },
    },
    weekly_digests_btn_class: {
      type: 'string',
      description:
        'Appends to the CSS class of the "Get Weekly Digests" button',
      table: {
        defaultValue: { summary: '' },
      },
    },
    weekly_digests_btn_label: {
      type: 'string',
      description: 'The "Get Weekly Digests" button label',
      table: {
        defaultValue: { summary: 'Get Weekly Digests' },
      },
    },
    weekly_digests_btn_icon: {
      type: 'string',
      description:
        'The "Get Weekly Digests" button [icon](/?path=/docs/design-icons--page)',
      table: {
        defaultValue: { summary: 'envelope' },
      },
      options: ['envelope', 'heart', 'plus'],
      control: 'select',
    },
    weekly_digests_heading: {
      type: 'string',
      description: 'The weekly digests subscription form heading',
      table: {
        defaultValue: { summary: '' },
      },
    },
    email_input_label: {
      type: 'string',
      description: 'The value for the email input `<label>`',
      table: {
        defaultValue: { summary: 'Email' },
      },
    },
    email_input_name: {
      type: 'string',
      description: 'The value for the email input `name` attribute',
      table: {
        defaultValue: { summary: 'email' },
      },
    },
    email_input_placeholder: {
      type: 'string',
      description: 'The value for the email input `placeholder` attribute',
      table: {
        defaultValue: { summary: 'Your Email Address' },
      },
    },
    submit_btn_label: {
      type: 'string',
      description: 'The subscription form submit button label',
      table: {
        defaultValue: { summary: 'Subscribe' },
      },
    },
  },
  render: (args) => templateStory(args),
};

export const Default = {
  args: {
    form_id: 'example-demo',
    subscribe_heading: 'Never miss an article!',
    weekly_digests_heading: 'Get Weekly Digests',
  },
  parameters: {
    docs: {
      source: {
        code: makeTwigInclude(
          '@cloudfour/components/subscribe/subscribe.twig',
          {
            form_id: 'example-demo',
            subscribe_heading: 'Never miss an article!',
            weekly_digests_heading: 'Get Weekly Digests',
          }
        ),
      },
    },
  },
};
