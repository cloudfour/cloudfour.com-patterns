import path from 'path';
import type { ElementHandle } from 'pleasantest';
import { getAccessibilityTree, withBrowser } from 'pleasantest';
import { loadTwigTemplate } from '../../../test-utils';

/** Helper to load the Twig template file */
const template = loadTwigTemplate(path.join(__dirname, './author.twig'));

test(
  'more accessible experience for publish date',
  withBrowser(async ({ utils, page }) => {
    await utils.injectHTML(
      await template({
        // The avatar is not included because I couldn't figure out how
        // to include it. For the purposes of this test, though, it is
        // not important so I left it out.
        authors: [
          {
            name: 'Shakira Isabel Mebarak Ripoll',
            link: 'https://www.shakira.com/',
          },
        ],
        date: new Date('March 31, 2021'),
        date_prefix: 'Presented on',
      })
    );

    const body = await page.evaluateHandle<ElementHandle>(() => document.body);
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      text "By"
      link "Shakira Isabel Mebarak Ripoll"
        text "Shakira Isabel Mebarak Ripoll"
      text "Presented on March 31st, 2021"
    `);
  })
);

test(
  'meta is prioritized over date',
  withBrowser(async ({ utils, page }) => {
    await utils.injectHTML(
      await template({
        // The avatar is not included because I couldn't figure out how
        // to include it. For the purposes of this test, though, it is
        // not important so I left it out.
        authors: [
          {
            name: 'Shakira Isabel Mebarak Ripoll',
            link: 'https://www.shakira.com/',
          },
        ],
        date: new Date('March 31, 2021'),
        meta: 'Singer and songwriter',
      })
    );

    const body = await page.evaluateHandle<ElementHandle>(() => document.body);

    // Confirm the meta value is rendered and the date is not rendered
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      text "By"
      link "Shakira Isabel Mebarak Ripoll"
        text "Shakira Isabel Mebarak Ripoll"
      text "Singer and songwriter"
    `);
  })
);
