/** @import { Meta, StoryObj } from '@storybook/html' */
import { useEffect } from 'storybook/preview-api';

import { makeTwigInclude } from '../../make-twig-include.js';
import { createElasticTextArea } from '../input/elastic-textarea';

import { initCommentReplyForm } from './comment';
import template from './comment.twig';
import authorDemo from './demo/author.twig';
import authorDemoSource from './demo/author.twig?raw';
import { makeComment } from './demo/data';
import memberDemo from './demo/member.twig';
import memberDemoSource from './demo/member.twig?raw';
const tyler = {
  name: 'Tyler Sticka',
  link: 'https://cloudfour.com/is/tyler',
};
const initCommentReplyForms = () => {
  const textAreaEl = /** @type {HTMLTextAreaElement | null} */ (
    document.querySelector('.js-elastic-textarea')
  );
  const commentReplyFormEl = /** @type {HTMLElement | null} */ (
    document.querySelector('.js-comment-with-reply-form')
  );
  if (textAreaEl && commentReplyFormEl) {
    const textareaInstance = createElasticTextArea(textAreaEl);
    const commentReplyFormInstance = initCommentReplyForm(commentReplyFormEl);
    return () => {
      textareaInstance.destroy();
      commentReplyFormInstance.destroy();
    };
  }
};
// Generate random comments for better performance.
// Before, the makeComment() function was called inline inside each <Story> but
// the randomness caused the stories to render hundreds or thousands of times.
// The page would freeze up. Now, we create a random set of comments ahead of
// time and just reference them in the stories.
const totalRandomComments = 5;
/** @type {ReturnType<typeof makeComment>[]} */
const randomComments = [];
for (let i = 0; i < totalRandomComments; i++) {
  randomComments.push(makeComment());
}
const randomCommentWithReply = makeComment({ replies: 2 });
const randomNotApprovedComment = makeComment({ approved: false });

/** @type {Meta} */
const meta = {
  title: 'Components/Comment',
  args: {
    isLoggedIn: false,
    allowReplies: false,
  },
  argTypes: {
    isLoggedIn: {
      type: { name: 'boolean' },
    },
    allowReplies: {
      type: { name: 'boolean' },
    },
  },
};

export default meta;

/** @type {StoryObj} */
export const Single = {
  parameters: {
    docs: {
      source: {
        code: makeTwigInclude('@cloudfour/components/comment/comment.twig', {
          comment: randomComments[0],
        }),
      },
    },
  },
  render: (args) => {
    useEffect(() => initCommentReplyForms());
    return template({
      comment: randomComments[0],
      allow_replies: args.allowReplies,
      logged_in_user: args.isLoggedIn ? tyler : null,
      log_out_url: '/logout',
    });
  },
};

/** @type {StoryObj} */
export const RoleAuthor = {
  name: 'Role: Author',
  parameters: {
    docs: {
      source: { code: authorDemoSource },
    },
  },
  render: (args) => {
    useEffect(() => initCommentReplyForms());
    return authorDemo({
      comment: randomComments[1],
      allow_replies: args.allowReplies,
      demo_post_author: true,
      logged_in_user: args.isLoggedIn ? tyler : null,
      log_out_url: '/logout',
    });
  },
};

/** @type {StoryObj} */
export const RoleCloudFour = {
  name: 'Role: Cloud Four',
  parameters: {
    docs: {
      source: {
        code: memberDemoSource,
      },
    },
  },
  render: (args) => {
    useEffect(() => initCommentReplyForms());
    return memberDemo({
      comment: randomComments[2],
      allow_replies: args.allowReplies,
      demo_cloud_four_member: true,
      logged_in_user: args.isLoggedIn ? tyler : null,
      log_out_url: '/logout',
    });
  },
};

/** @type {StoryObj} */
export const Unapproved = {
  parameters: {
    docs: {
      source: {
        code: makeTwigInclude('@cloudfour/components/comment/comment.twig', {
          comment: randomNotApprovedComment,
        }),
      },
    },
  },
  render: (args) => {
    useEffect(() => initCommentReplyForms());
    return template({
      comment: randomNotApprovedComment,
      allow_replies: args.allowReplies,
      logged_in_user: args.isLoggedIn ? tyler : null,
      log_out_url: '/logout',
    });
  },
};

/** @type {StoryObj} */
export const WithSource = {
  name: 'With source',
  parameters: {
    docs: {
      source: {
        code: makeTwigInclude('@cloudfour/components/comment/comment.twig', {
          comment: randomComments[3],
          source: {
            url: 'https://twitter.com/smashingmag/status/1371521325236416516',
            name: 'twitter.com',
          },
        }),
      },
    },
  },
  render: (args) => {
    useEffect(() => initCommentReplyForms());
    return template({
      comment: randomComments[3],
      source: {
        url: 'https://twitter.com/smashingmag/status/1371521325236416516',
        name: 'twitter.com',
      },
      allow_replies: args.allowReplies,
      logged_in_user: args.isLoggedIn ? tyler : null,
      log_out_url: '/logout',
    });
  },
};

/** @type {StoryObj} */
export const WithReplyButton = {
  name: 'With reply button',
  args: { allowReplies: true, isLoggedIn: true },
  parameters: {
    docs: {
      source: {
        code: makeTwigInclude('@cloudfour/components/comment/comment.twig', {
          comment: randomComments[4],
          allow_replies: true,
          logged_in_user: tyler,
          log_out_url: '/logout',
        }),
      },
    },
  },
  render: (args) => {
    useEffect(() => initCommentReplyForms());
    return template({
      comment: randomComments[4],
      allow_replies: args.allowReplies,
      logged_in_user: args.isLoggedIn ? tyler : null,
      log_out_url: '/logout',
    });
  },
};

/** @type {StoryObj} */
export const WithReplyThread = {
  name: 'With reply thread',
  parameters: {
    docs: {
      source: {
        code: makeTwigInclude('@cloudfour/components/comment/comment.twig', {
          comment: randomCommentWithReply,
        }),
      },
    },
  },
  render: (args) => {
    useEffect(() => initCommentReplyForms());
    return template({
      comment: randomCommentWithReply,
      allow_replies: args.allowReplies,
      logged_in_user: args.isLoggedIn ? tyler : null,
      log_out_url: '/logout',
    });
  },
};
