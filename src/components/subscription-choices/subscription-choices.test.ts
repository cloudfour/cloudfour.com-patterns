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

test(
  'Swap UI state when clicked',
  withBrowser.headed(async ({ utils, screen, user, page }) => {
    await loadGlobalCSS(utils);
    await utils.loadCSS('./subscription-choices.scss');
    await utils.injectHTML(await componentMarkup());
    await initJS(utils);

    expect(await getAccessibilityTree(page)).toMatchInlineSnapshot(`
      document
        status
          text "Notifications have been turned off."
        button "Get notifications"
        link "Get Weekly Digests"
          text "Get Weekly Digests"
        form
          text "Email"
          textbox "Email"
          button "Submit"
    `);

    // Confirm the form is visually hidden by default
    let form = await screen.getByRole('form');
    let formHeight = await form.evaluate((formEl) => formEl.clientHeight);
    let formWidth = await form.evaluate((formEl) => formEl.clientWidth);
    expect(formHeight).toBeLessThanOrEqual(1);
    expect(formWidth).toBeLessThanOrEqual(1);

    // Tab all the way to the form email input
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Confirm the form is now "active" (not visually hidden)
    form = await screen.getByRole('form');
    formHeight = await form.evaluate((formEl) => formEl.clientHeight);
    formWidth = await form.evaluate((formEl) => formEl.clientWidth);
    expect(formHeight).toBeGreaterThan(1);
    expect(formWidth).toBeGreaterThan(1);

    // Confirm the email input is focused
    const emailInput = await screen.getByRole('textbox', { name: 'Email' });
    await expect(emailInput).toHaveFocus();

    // Tab again to get to the Submit button, the form should still be visible
    await page.keyboard.press('Tab');

    // Confirm the form is still "active" (not visually hidden)
    form = await screen.getByRole('form');
    formHeight = await form.evaluate((formEl) => formEl.clientHeight);
    formWidth = await form.evaluate((formEl) => formEl.clientWidth);
    expect(formHeight).toBeGreaterThan(1);
    expect(formWidth).toBeGreaterThan(1);

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

test.skip(
  'Set custom messages and labels',
  withBrowser(async ({ utils, screen, user, page }) => {
    await utils.injectHTML(
      await componentMarkup({
        initial_visual_label: 'Hello world',
        swapped_visual_label: 'Have a great day',
        initial_label: 'Unsubscribed',
        swapped_label: 'Subscribed',
      })
    );
    await loadGlobalCSS(utils);
    await initJS(utils);

    const body = await page.evaluateHandle<ElementHandle>(() => document.body);
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      status
        text "Unsubscribed"
      button "Hello world"
    `);

    // Button swap action
    await user.click(await screen.getByRole('button'));

    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      alert (focused)
        text "Subscribed"
      button "Have a great day"
    `);
  })
);

test.skip(
  'Callback functions are called',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(await componentMarkup());

    const mockInitialCallback = jest.fn();
    const mockSwappedCallback = jest.fn();

    await initJS(utils, mockInitialCallback, mockSwappedCallback);

    const firstBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });

    await user.click(firstBtn);

    expect(mockInitialCallback).toBeCalledTimes(1);

    const secondBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });

    await user.click(secondBtn);

    expect(mockSwappedCallback).toBeCalledTimes(1);
  })
);
