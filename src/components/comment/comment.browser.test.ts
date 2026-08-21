import { expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import '../../../dist/standalone.css';

import { initCommentReplyForm } from './comment.js';
import template from './comment.twig';

const body = () => page.elementLocator(document.body);

test('reply form can be opened and closed', async () => {
  document.body.innerHTML = template({
    comment: {
      ID: 1,
      date: new Date('January 1 2000'),
      avatar: '',
      author: { name: 'Test author name' },
      content: 'Test content',
      approved: true,
    },
    allow_replies: true,
  });

  initCommentReplyForm(
    document.querySelector('.js-comment-with-reply-form') as HTMLElement,
  );

  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - article "Test author name said:":
      - heading "Test author name said:" [level=3]
      - text: Test content
      - link "Permalink to Test author name’s Jan 1, 2000 comment":
        - /url: "#comment-1"
        - text: Permalink to Test author name’s
        - time: Jan 1, 2000
        - text: comment
      - button "Reply"
  `);

  // Both of these are looked up including hidden elements, because both are
  // asserted in the hidden state as well. Locators re-query the document on every
  // assertion rather than resolving to an element once, so a locator that skips
  // hidden elements stops matching anything at all instead of matching something
  // invisible -- and `not.toBeVisible()` then fails on a missing element.
  //
  // The name is anchored because the form contains a "Submit Reply" button that an
  // unanchored /reply/i would match too, which would make the locator ambiguous
  // the moment the form opens.
  const form = page.getByRole('form', { includeHidden: true });
  const replyButton = page.getByRole('button', {
    name: /^reply$/i,
    includeHidden: true,
  });

  // Initial state: reply form is hidden
  await expect.element(form).not.toBeVisible();

  await userEvent.click(replyButton);

  // Updated state: reply form is no longer hidden
  await expect.element(form).toBeVisible();
  // Reply button is hidden
  await expect.element(replyButton).not.toBeVisible();

  // Check that all the fields appear and have correct labels
  await expect.element(form).toMatchAriaInlineSnapshot(`
    - form "Reply to Test author name":
      - heading "Reply to Test author name" [level=4]
      - paragraph:
        - text: Please be kind, courteous and constructive. You may use simple HTML or
        - link "Markdown":
          - /url: https://en.support.wordpress.com/markdown-quick-reference
        - text: in your comments. All fields are required.
      - text: Reply
      - textbox "Reply"
      - text: Name
      - textbox "Name"
      - text: Email
      - textbox "Email"
      - checkbox "Notify me of follow-up comments by email."
      - text: Notify me of follow-up comments by email.
      - button "Submit Reply"
      - button "Cancel"
  `);

  // The first textbox should be focused, and should explain itself. Neither shows
  // up in an ARIA snapshot, so both are asserted directly.
  const replyTextbox = page.getByRole('textbox', { name: 'Reply' });
  await expect.element(replyTextbox).toHaveFocus();
  await expect
    .element(replyTextbox)
    .toHaveAccessibleDescription(
      'Please be kind, courteous and constructive. You may use simple HTML or Markdown in your comments. All fields are required.',
    );

  // Click the cancel button to get back to our initial state
  await userEvent.click(page.getByRole('button', { name: /cancel/i }));

  // Back to our initial state, though now the reply button is focused.
  await expect.element(form).not.toBeVisible();
  await expect.element(replyButton).toBeVisible();
  await expect.element(replyButton).toHaveFocus();
});
