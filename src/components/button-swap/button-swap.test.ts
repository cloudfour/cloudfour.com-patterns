import path from 'path';

import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { getAccessibilityTree, withBrowser } from 'pleasantest';

import { loadGlobalCSS, loadTwigTemplate } from '../../../test-utils.js';

// Helper to load the Twig template file
const componentMarkup = loadTwigTemplate(
  path.join(__dirname, './button-swap.twig')
);

// Helper to initialize the component JS
const initJS = (
  utils: PleasantestUtils,
  initialCallback?: () => void,
  swappedCallback?: () => void
) =>
  utils.runJS(
    `
    import { initButtonSwap } from './button-swap'
    export default (initialCallback, swappedCallback) => {
      initButtonSwap(document.querySelector('.js-button-swap'), {
        initialCallback,
        swappedCallback
      })
    }
    `,
    [initialCallback, swappedCallback]
  );

test(
  'Swap UI state when clicked',
  withBrowser(async ({ utils, screen, user, page }) => {
    await utils.injectHTML(await componentMarkup());
    await loadGlobalCSS(utils);

    // Before JS initializes
    const body = await page.evaluateHandle<ElementHandle>(() => document.body);
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      status
        text "Currently unsubscribed from notifications"
      button "Get notifications"
    `);

    let firstBtn = await screen.getByRole('button');
    await expect(firstBtn).toBeVisible();
    await expect(firstBtn).not.toHaveClass('is-slashed');

    await initJS(utils);

    // After JS initializes it should be the same
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      status
        text "Currently unsubscribed from notifications"
      button "Get notifications"
    `);

    firstBtn = await screen.queryByRole('button');
    await expect(firstBtn).toBeVisible();
    await expect(firstBtn).not.toHaveClass('is-slashed');

    // Button swap action
    await user.click(firstBtn);

    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      alert (focused)
        text "Currently subscribed to notifications"
      button "Turn off notifications"
    `);

    const secondBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });
    await expect(secondBtn).toBeVisible();
    await expect(secondBtn).toHaveClass('is-slashed');

    // Button swap action
    await user.click(secondBtn);

    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      alert (focused)
        text "Currently unsubscribed from notifications"
      button "Get notifications"
    `);

    // Query for first button again in its new state
    firstBtn = await screen.queryByRole('button');
    await expect(firstBtn).toBeVisible();
    await expect(firstBtn).not.toHaveClass('is-slashed');
  })
);

test(
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

test(
  'Callback functions are called',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(await componentMarkup());
    await loadGlobalCSS(utils);

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
