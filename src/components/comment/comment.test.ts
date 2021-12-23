import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser, getAccessibilityTree } from 'pleasantest';
import { loadTwigTemplate, loadGlobalCSS } from '../../../test-utils';

const commentMarkup = loadTwigTemplate(path.join(__dirname, 'comment.twig'));
const initCommentsJS = (utils: PleasantestUtils) =>
  utils.runJS(`
    import { initCommentReplyForm } from './comment';

    initCommentReplyForm(document.querySelector('.js-comment-with-reply-form'));
  `);

test(
  'reply form can be opened and closed',
  withBrowser(async ({ utils, screen, user, page }) => {
    await utils.injectHTML(
      await commentMarkup({
        comment: {
          ID: 1,
          link: '#comment-1',
          date: new Date('January 1 2000'),
          avatar: '',
          author: {
            name: 'Test author name',
          },
          comment_content: 'Test content',
          approved: true,
        },
        allow_replies: true,
      })
    );

    await loadGlobalCSS(utils);

    await initCommentsJS(utils);

    const body = await page.evaluateHandle<ElementHandle>(() => document.body);
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      article "Test author name said:"
        banner
          heading "Test author name said:"
            text "Test author name"
            text "said:"
        text "Test content"
        contentinfo
          link "Permalink to Test author name’s Jan 1, 2000 comment"
            text "Permalink to Test author name’s"
            text "Jan 1, 2000"
            text "comment"
          button "Reply"
    `);
    const form = await screen.getByRole('form', { hidden: true });
    const replyButton = await screen.getByRole('button', {
      name: /reply/i,
    });

    // Initial state: reply form is hidden
    await expect(form).not.toBeVisible();

    await user.click(replyButton);
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      article "Test author name said:"
        banner
          heading "Test author name said:"
            text "Test author name"
            text "said:"
        text "Test content"
        contentinfo
          link "Permalink to Test author name’s Jan 1, 2000 comment"
            text "Permalink to Test author name’s"
            text "Jan 1, 2000"
            text "comment"
          form "Reply to Test author name"
            heading "Reply to Test author name"
              text "Reply to Test author name"
            text "Please be kind, courteous and constructive.
                      You may use simple HTML or"
            link "Markdown"
              text "Markdown"
            text "in your comments.
                      All fields are required."
            text "Reply"
            textbox "Reply" (focused)
              ↳ description: "Please be kind, courteous and constructive. You may use simple HTML or Markdown in your comments. All fields are required."
            text "Name"
            textbox "Name"
            text "Email"
            textbox "Email"
            checkbox "Notify me of follow-up comments by email."
            text "Notify me of follow-up comments by email."
            button "Submit Reply"
            button "Cancel"
    `);

    // Updated state: reply form is no longer hidden
    await expect(form).toBeVisible();
    // Reply button is hidden
    await expect(replyButton).not.toBeVisible();

    // Click the cancel button to get back to our initial state
    const cancelButton = await screen.getByRole('button', {
      name: /cancel/i,
    });
    await user.click(cancelButton);

    // Back to our initial state, though now the reply button is focused.
    await expect(form).not.toBeVisible();
    await expect(replyButton).toBeVisible();
    await expect(replyButton).toHaveFocus();
  })
);
