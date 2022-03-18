import path from 'path';
import type { PleasantestUtils } from 'pleasantest';
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
      await utils.injectHTML(await componentMarkup({ form_id: 'test' }));
      await initJS(utils);

      // Confirm the form is visually hidden by default
      const form = await screen.getByRole('form', {
        name: 'Get Weekly Digests',
      });
      let { formHeight, formWidth } = await form.evaluate((formEl) => ({
        formHeight: formEl.clientHeight,
        formWidth: formEl.clientWidth,
      }));
      expect(formHeight).toBeLessThanOrEqual(1);
      expect(formWidth).toBeLessThanOrEqual(1);

      // Tab all the way to the form email input
      await page.keyboard.press('Tab'); // Notifications button
      await page.keyboard.press('Tab'); // Weekly Digests link
      await page.keyboard.press('Tab'); // Email input

      // Confirm the form is now "active" (not visually hidden)
      ({ formHeight, formWidth } = await form.evaluate((formEl) => ({
        formHeight: formEl.clientHeight,
        formWidth: formEl.clientWidth,
      })));
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

      // Email input should be in focus
      const emailInput = await screen.getByRole('textbox', { name: 'Email' });
      await expect(emailInput).toHaveFocus();

      // Tab again to get to the Submit button
      await page.keyboard.press('Tab');

      // Submit button should be in focus
      const submitBtn = await screen.getByRole('button', { name: 'Submit' });
      await expect(submitBtn).toHaveFocus();

      // Confirm the form is still "active" (not visually hidden)
      ({ formHeight, formWidth } = await form.evaluate((formEl) => ({
        formHeight: formEl.clientHeight,
        formWidth: formEl.clientWidth,
      })));
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

      // Navigate back up to the Weekly Digests link
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab'); // Email input
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab'); // Weekly Digests link

      // Confirm the focus has moved to the Weekly Digests link
      const weeklyDigestsBtn = await screen.getByRole('link', {
        name: 'Get Weekly Digests',
      });
      await expect(weeklyDigestsBtn).toHaveFocus();

      // The form should now be visually hidden again
      ({ formHeight, formWidth } = await form.evaluate((formEl) => ({
        formHeight: formEl.clientHeight,
        formWidth: formEl.clientWidth,
      })));
      expect(formHeight).toBeLessThanOrEqual(1);
      expect(formWidth).toBeLessThanOrEqual(1);

      // Navigate forward past the Submit to activate the form hide timeout
      await page.keyboard.press('Tab'); // Email input
      await page.keyboard.press('Tab'); // Submit button
      await page.keyboard.press('Tab'); // Out of the form

      // Confirm the form is still "active" (not visually hidden)
      ({ formHeight, formWidth } = await form.evaluate((formEl) => ({
        formHeight: formEl.clientHeight,
        formWidth: formEl.clientWidth,
      })));
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

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
      // Set up CSS
      await loadGlobalCSS(utils);
      await utils.loadCSS('./subscription-choices.scss');

      // No customization
      await utils.injectHTML(await componentMarkup({ form_id: 'test' }));

      // Confirm default heading tag
      await screen.getByRole('heading', {
        name: 'Never miss an article!',
        level: 2,
      });
      await screen.getByRole('heading', {
        name: 'Get Weekly Digests',
        level: 2,
      });

      // Confirm default background color
      let form = await screen.getByRole('form');
      let formBgColor = await form.evaluate(
        (formEl) => window.getComputedStyle(formEl).backgroundColor
      );
      expect(formBgColor).toBe('rgb(255, 255, 255)');

      // Customize the component
      await utils.injectHTML(
        await componentMarkup({
          form_id: 'test',
          heading_tag: 'h3',
          weekly_digests_heading: 'Weekly digests available',
          never_miss_article_heading: "Don't miss out!",
          form_bg_color: 'green',
          notifications_btn_class: 'hello',
          notifications_btn_initial_visual_label: 'Yes to notifications',
          weekly_digests_btn_class: 'world',
          weekly_digests_btn_label: 'I want weekly digests',
          weekly_digests_submit_btn_label: 'Sign up',
        })
      );

      // Confirm custom headings
      await screen.getByRole('heading', {
        name: 'Weekly digests available',
        level: 3,
      });
      await screen.getByRole('heading', {
        name: "Don't miss out!",
        level: 3,
      });

      // Confirm custom form background color
      form = await screen.getByRole('form');
      formBgColor = await form.evaluate(
        (formEl) => window.getComputedStyle(formEl).backgroundColor
      );
      // `backgroundColor` returns an RGB value
      expect(formBgColor).toBe('rgb(0, 128, 0)');

      // Confirm custom notifications button
      const notificationsBtn = await screen.getByRole('button', {
        name: 'Yes to notifications',
      });
      await expect(notificationsBtn).toHaveClass('hello');

      // Confirm custom weekly digests link
      const weeklyDigestsLink = await screen.getByRole('link', {
        name: 'I want weekly digests',
      });
      await expect(weeklyDigestsLink).toHaveClass('world');

      // Confirm custom weekly digests submit button
      await screen.getByRole('button', {
        name: 'Sign up',
      });
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
