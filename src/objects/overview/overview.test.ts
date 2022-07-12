import path from 'path';

import type { ElementHandle } from 'pleasantest';
import { getAccessibilityTree, withBrowser } from 'pleasantest';

import { loadTwigTemplate } from '../../../test-utils.js';

/** Helper to load the Twig template file */
const template = loadTwigTemplate(path.join(__dirname, './demo/basic.twig'));
const divTemplate = loadTwigTemplate(path.join(__dirname, './demo/div.twig'));

describe('Overview object', () => {
  test(
    'should use header with section',
    withBrowser(async ({ utils, page }) => {
      await utils.injectHTML(
        await template({
          show_heading: true,
          show_footer: true,
        })
      );

      const body = await page.evaluateHandle<ElementHandle>(
        () => document.body
      );
      expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
        region
          banner
            text "Header"
          text "Actions"
          text "Content"
      `);
    })
  );

  test(
    'should not use header with div',
    withBrowser(async ({ utils, page }) => {
      await utils.injectHTML(
        await divTemplate({
          show_heading: true,
          show_footer: true,
        })
      );

      const body = await page.evaluateHandle<ElementHandle>(
        () => document.body
      );
      expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
        text "Header"
        text "Actions"
        text "Content"
      `);
    })
  );
});
