import path from 'path';

import type { ElementHandle } from 'pleasantest';
import { getAccessibilityTree, withBrowser } from 'pleasantest';

import { loadTwigTemplate } from '../../../test-utils.js';

/** Helper to load the Twig template file */
const template = loadTwigTemplate(path.join(__dirname, './alert.twig'));

describe('Alert component', () => {
  test(
    'should respect `hidden` template property',
    withBrowser(async ({ utils, page }) => {
      await utils.injectHTML(
        await template({
          hidden: true,
        })
      );

      const body = await page.evaluateHandle<ElementHandle>(
        () => document.body
      );
      // Nothing to see if the `hidden` attribute is added to the alert
      expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(``);
    })
  );

  test(
    'should set an `id` attribute',
    withBrowser(async ({ utils, screen }) => {
      await utils.injectHTML(
        await template({
          id: 'my-id',
        })
      );

      const alert = await screen.getByRole('status');
      await expect(alert).toHaveAttribute('id', 'my-id');
    })
  );
});
