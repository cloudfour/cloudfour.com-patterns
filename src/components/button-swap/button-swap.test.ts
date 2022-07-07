import path from 'path';

import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { getAccessibilityTree, withBrowser } from 'pleasantest';

import { loadGlobalCSS, loadTwigTemplate } from '../../../test-utils.js';

// Helper to load the Twig template file
const componentMarkup = loadTwigTemplate(
  path.join(__dirname, './button-swap.twig')
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

    // After JS initializes it should be the same
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      status
        text "Currently unsubscribed from notifications"
      button "Get notifications"
    `);

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

    const body = await page.evaluateHandle<ElementHandle>(() => document.body);
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      status
        text "Unsubscribed"
      button "Hello world"
    `);
  })
);
