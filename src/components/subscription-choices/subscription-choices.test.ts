import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser, getAccessibilityTree } from 'pleasantest';
import { loadTwigTemplate, loadGlobalCSS } from '../../../test-utils';

// Helper to load the Twig template file
const componentMarkup = loadTwigTemplate(
  path.join(__dirname, './subscription-choices.twig')
);

// Helper to initialize the component JS
const initJS = (utils: PleasantestUtils) =>
  utils.runJS(`
    import { initSubscriptionChoices } from './subscription-choices'
    export default () => initSubscriptionChoices(
      document.querySelector('.js-subscription-choices')
    )
  `);

describe('Subscription Choices', () => {
  test(
    'Should use semantic markup',
    withBrowser(async ({ utils, page }) => {
      await loadGlobalCSS(utils);
      await utils.loadCSS('./subscription-choices.scss');
      await utils.injectHTML(await componentMarkup());
      await initJS(utils);

      // Get baseline accessibility tree snapshot
      expect(await getAccessibilityTree(page)).toMatchInlineSnapshot(`
        document
          heading "Never miss an article!"
            text "Never miss an article!"
          status
            text "Notifications have been turned off."
          button "Get notifications"
          link "Get Weekly Digests"
            text "Get Weekly Digests"
          form "Get Weekly Digests"
            heading "Get Weekly Digests"
              text "Get Weekly Digests"
            text "Email"
            textbox "Email"
            button "Submit"
      `);
    })
  );

  test(
    'Should be keyboard accessible',
    withBrowser(async ({ utils, screen, user, page }) => {
      await loadGlobalCSS(utils);
      await utils.loadCSS('./subscription-choices.scss');
      await utils.injectHTML(await componentMarkup());
      await initJS(utils);

      // Confirm the form is visually hidden by default
      const form = await screen.getByRole('form', {
        name: 'Get Weekly Digests',
      });
      let formHeight = await form.evaluate((formEl) => formEl.clientHeight);
      let formWidth = await form.evaluate((formEl) => formEl.clientWidth);
      expect(formHeight).toBeLessThanOrEqual(1);
      expect(formWidth).toBeLessThanOrEqual(1);

      // Tab all the way to the form email input
      await page.keyboard.press('Tab'); // Notifications button
      await page.keyboard.press('Tab'); // Weekly Digests button
      await page.keyboard.press('Tab'); // Email input

      // Confirm the form is now "active" (not visually hidden)
      formHeight = await form.evaluate((formEl) => formEl.clientHeight);
      formWidth = await form.evaluate((formEl) => formEl.clientWidth);
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

      // Email input should be in focus
      const emailInput = await screen.getByRole('textbox', { name: 'Email' });
      await expect(emailInput).toHaveFocus();

      // Tab again to get to the Submit button, the form should still be visible
      await page.keyboard.press('Tab');

      // Submit button should be in focus
      const submitButton = await screen.getByRole('button', { name: 'Submit' });
      await expect(submitButton).toHaveFocus();

      // Confirm the form is still "active" (not visually hidden)
      formHeight = await form.evaluate((formEl) => formEl.clientHeight);
      formWidth = await form.evaluate((formEl) => formEl.clientWidth);
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

      await page.keyboard.press('Shift');

      const getWeeklyDigestsBtn = await screen.getByRole('link', {
        name: 'Get Weekly Digests',
      });
      // Button swap action
      // await user.click(firstBtn);

      // const secondBtn = await screen.queryByRole('button', {
      //   name: /^turn off notifications$/i,
      // });
      // await expect(secondBtn).toBeVisible();
      // await expect(secondBtn).toHaveClass('is-slashed');

      // Button swap action
      // await user.click(secondBtn);

      // expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      //   alert (focused)
      //     text "Currently unsubscribed from notifications"
      //   button "Get notifications"
      // `);

      // // Query for first button again in its new state
      // firstBtn = await screen.queryByRole('button');
      // await expect(firstBtn).toBeVisible();
      // await expect(firstBtn).not.toHaveClass('is-slashed');
    })
  );

  test(
    'Should be customizable',
    withBrowser(async ({ utils, screen, user, page }) => {
      // Confirm default options
      await utils.injectHTML(await componentMarkup());
      await screen.getAllByRole('heading', { level: 2 });

      // Should allow customization
      await utils.injectHTML(
        await componentMarkup({
          heading_tag: 'h3',
        })
      );
      await screen.getAllByRole('heading', { level: 3 });
    })
  );

  // test.skip(
  //   'Set custom messages and labels',
  //   withBrowser(async ({ utils, screen, user, page }) => {
  //     await utils.injectHTML(
  //       await componentMarkup({
  //         initial_visual_label: 'Hello world',
  //         swapped_visual_label: 'Have a great day',
  //         initial_label: 'Unsubscribed',
  //         swapped_label: 'Subscribed',
  //       })
  //     );
  //     await loadGlobalCSS(utils);
  //     await initJS(utils);

  //     const body = await page.evaluateHandle<ElementHandle>(
  //       () => document.body
  //     );
  //     expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
  //             status
  //               text "Unsubscribed"
  //             button "Hello world"
  //         `);

  //     // Button swap action
  //     await user.click(await screen.getByRole('button'));

  //     expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
  //             alert (focused)
  //               text "Subscribed"
  //             button "Have a great day"
  //         `);
  //   })
  // );

  // test.skip(
  //   'Callback functions are called',
  //   withBrowser(async ({ utils, screen, user }) => {
  //     await utils.injectHTML(await componentMarkup());

  //     const mockInitialCallback = jest.fn();
  //     const mockSwappedCallback = jest.fn();

  //     await initJS(utils, mockInitialCallback, mockSwappedCallback);

  //     const firstBtn = await screen.queryByRole('button', {
  //       name: /^get notifications$/i,
  //     });

  //     await user.click(firstBtn);

  //     expect(mockInitialCallback).toBeCalledTimes(1);

  //     const secondBtn = await screen.queryByRole('button', {
  //       name: /^turn off notifications$/i,
  //     });

  //     await user.click(secondBtn);

  //     expect(mockSwappedCallback).toBeCalledTimes(1);
  //   })
  // );
});
