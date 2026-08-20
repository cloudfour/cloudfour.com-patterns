import { useEffect } from 'storybook/preview-api';

import { makeTwigInclude } from '../../make-twig-include.js';
import { createElasticTextArea } from '../input/elastic-textarea.ts';

import template from './comment-form.twig';
const tyler = {
  name: 'Tyler Sticka',
  link: 'https://cloudfour.com/is/tyler',
};

export default {
  title: 'Components/Comment Form',
  args: {
    isLoggedIn: false,
    isReply: false,
  },
  argTypes: {
    isLoggedIn: {
      type: { name: 'boolean' },
    },
    isReply: {
      type: { name: 'boolean' },
    },
  },
};

export const Default = {
  args: { isReply: false },
  parameters: {
    docs: {
      source: {
        code: makeTwigInclude(
          '@cloudfour/components/comment-form/comment-form.twig',
          {
            heading_id: 'leave-a-comment',
            help_text_id: 'leave-a-comment-help-text',
          }
        ),
      },
    },
  },
  render: ({ isLoggedIn, isReply }) => {
    useEffect(() => {
      const { destroy } = createElasticTextArea(
        document.querySelector('.js-elastic-textarea')
      );
      return destroy;
    });
    return template({
      logged_in_user: isLoggedIn ? tyler : undefined,
      log_out_url: '/logout',
      is_reply: isReply,
      heading_id: 'leave-a-comment',
      help_text_id: 'leave-a-comment-help-text',
    });
  },
};

export const Reply = {
  args: { isReply: true, isLoggedIn: true },
  parameters: {
    docs: {
      source: {
        code: makeTwigInclude(
          '@cloudfour/components/comment-form/comment-form.twig',
          {
            logged_in_user: tyler,
            log_out_url: '/logout',
            is_reply: true,
            heading_id: 'reply-to-comment-100',
            heading_tag: 'h4',
            heading_text: 'Reply to John Doe',
            heading_class: 'u-hidden-visually',
            main_label: 'Reply',
          }
        ),
      },
    },
  },
  render: ({ isLoggedIn, isReply }) => {
    useEffect(() => {
      const { destroy } = createElasticTextArea(
        document.querySelector('.js-elastic-textarea')
      );
      return destroy;
    });
    return template({
      logged_in_user: isLoggedIn ? tyler : undefined,
      log_out_url: '/logout',
      is_reply: isReply,
      heading_id: 'reply-to-comment-100',
      heading_tag: 'h4',
      heading_text: 'Reply to John Doe',
      heading_class: 'u-hidden-visually',
      main_label: 'Reply',
    });
  },
};
