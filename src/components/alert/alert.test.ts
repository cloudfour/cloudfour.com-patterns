import path from 'path';

import type { ElementHandle } from 'pleasantest';
import { getAccessibilityTree, withBrowser } from 'pleasantest';

import { loadTwigTemplate } from '../../../test-utils.js';

/** Helper to load the Twig template file */
const template = loadTwigTemplate(path.join(__dirname, './alert.twig'));

describe('Alert component', () => {
  test(
    'should have no role by default',
    withBrowser(async ({ utils, page }) => {
      await utils.injectHTML(
        await template({
          message: '¡Hola!',
        })
      );

      const body = await page.evaluateHandle<ElementHandle>(
        () => document.body
      );
      expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(
        `text "¡Hola!"`
      );
    })
  );

  test(
    'should be able to set a role',
    withBrowser(async ({ utils, page }) => {
      await utils.injectHTML(
        await template({
          role: 'status',
        })
      );

      const body = await page.evaluateHandle<ElementHandle>(
        () => document.body
      );
      expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
        status
          text "Hello world!"
      `);
    })
  );

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
          role: 'status',
        })
      );

      const alert = await screen.getByRole('status');
      await expect(alert).toHaveAttribute('id', 'my-id');
    })
  );
});
