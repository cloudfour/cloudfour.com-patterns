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
    expect(await getAccessibilityTree(body, { includeText: false }))
      .toMatchInlineSnapshot(`
        article "Test author name said:"
          banner
            heading "Test author name said:"
          contentinfo
            link "Permalink to Test author name’s Jan 1, 2000 comment"
            button "Reply"
      `);
    const form = await screen.getByRole('form', { hidden: true });
    const replyButton = await screen.getByRole('button', {
      name: /reply/i,
    });

    // Initial state: reply form is hidden
    await expect(form).not.toBeVisible();

    await user.click(replyButton);

    // Updated state: reply form is no longer hidden
    await expect(form).toBeVisible();
    // Reply button is hidden
    await expect(replyButton).not.toBeVisible();
    // Check that all the fields appear and have correct labels and the first textbox should be focused
    expect(await getAccessibilityTree(form, { includeText: false }))
      .toMatchInlineSnapshot(`
        form "Reply to Test author name"
          heading "Reply to Test author name"
          link "Markdown"
          textbox "Reply" (focused)
            ↳ description: "Please be kind, courteous and constructive. You may use simple HTML or Markdown in your comments. All fields are required."
          textbox "Name"
          textbox "Email"
          checkbox "Notify me of follow-up comments by email."
          button "Submit Reply"
          button "Cancel"
      `);

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
