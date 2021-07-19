import path from 'path';
import type { PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate } from '../../../test-utils';

const commentMarkup = loadTwigTemplate(path.join(__dirname, 'comment.twig'));
const initCommentsJs = (utils: PleasantestUtils) =>
  utils.runJS(`
    import { initComments } from './comment';
    initComments();
  `);

test(
  'reply form can be opened and closed',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(
      await commentMarkup({
        comment: {
          ID: 1,
          link: '#comment-1',
          date: new Date(),
          avatar: '',
          author: {
            name: 'Test',
          },
          comment_content: 'Test',
          approved: true,
          allow_replies: true
        }
      })
    );

    await utils.loadCSS('../../../dist/standalone.css');

    await initCommentsJs(utils);

    const comment = await screen.getByRole('article');
    const form = await screen.getByRole('form', { hidden: true })
    const replyButton = await screen.getByRole('button', {
      name: /reply/i,
    });

    // Initial state: reply form is hidden
    await expect(form).not.toBeVisible();
    await expect(comment).not.toHaveClass('is-replying');

    await user.click(replyButton);

    // Updated state: reply form is no longer hidden
    await expect(form).toBeVisible();
    // Reply button is hidden
    await expect(replyButton).not.toBeVisible();
    await expect(comment).toHaveClass('is-replying');

    const cancelButton = await screen.getByRole('button', {
      name: /cancel/i,
    });

    await user.click(cancelButton);

    // Back to our intial state
    await expect(form).not.toBeVisible();
    await expect(replyButton).toBeVisible();
    await expect(comment).not.toHaveClass('is-replying');
  })
);