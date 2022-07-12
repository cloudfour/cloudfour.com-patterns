import path from 'path';

import type { ElementHandle } from 'pleasantest';
import { getAccessibilityTree, withBrowser } from 'pleasantest';

import { loadTwigTemplate } from '../../../test-utils.js';

/** Helper to load the Twig template file */
const template = loadTwigTemplate(path.join(__dirname, './demo/single.twig'));
const divTemplate = loadTwigTemplate(path.join(__dirname, './demo/div.twig'));

describe('Card component', () => {
  test(
    'should use header/footer with article',
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
      expect(await getAccessibilityTree(body, {includeText: false})).toMatchInlineSnapshot(`
        article
          banner
            heading "Lorem ipsum dolor sit amet" (level=2)
          contentinfo
      `);
    })
  );

  test(
    'should not use header/footer with div',
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
        heading "Lorem ipsum dolor sit amet" (level=2)
          text "Lorem ipsum dolor sit amet"
        text "Jul 12, 2022"
      `);
    })
  );
});
