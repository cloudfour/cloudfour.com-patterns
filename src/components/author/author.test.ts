import path from 'path';

import type { ElementHandle } from 'pleasantest';
import { getAccessibilityTree, withBrowser } from 'pleasantest';

import { loadTwigTemplate } from '../../../test-utils.js';

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
      text
        text "By"
      link "Shakira Isabel Mebarak Ripoll"
        text "Shakira Isabel Mebarak Ripoll"
      text "Presented on March 31st, 2021"
    `);
  })
);

test(
  'Short date formatting',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(
      await template({
        // The avatar is not included because I couldn't figure out how
        // to include it. For the purposes of this test, though, it is
        // not important so I left it out.
        authors: [
          {
            name: 'Shakira Isabel Mebarak Ripoll',
          },
        ],
        date: new Date('March 31, 2021'),
        date_format: 'short',
      })
    );

    // The short date formatting applies to the visible date text
    // (not our visually hidden screen reader text)
    const visibleDateText = await screen.getByText('Mar 31, 2021');
    await expect(visibleDateText).toHaveAttribute('aria-hidden', 'true');
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
      text
        text "By"
      link "Shakira Isabel Mebarak Ripoll"
        text "Shakira Isabel Mebarak Ripoll"
      text "Singer and songwriter"
    `);
  })
);

test(
  'Optional author link prop',
  withBrowser(async ({ utils, page }) => {
    await utils.injectHTML(
      await template({
        // The avatar is not included because I couldn't figure out how
        // to include it. For the purposes of this test, though, it is
        // not important so I left it out.
        authors: [
          {
            name: 'Shakira Isabel Mebarak Ripoll',
          },
        ],
      })
    );

    const body = await page.evaluateHandle<ElementHandle>(() => document.body);

    // Confirm the author name is "text" and not a link
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      text
        text "By"
      text
        text "Shakira Isabel Mebarak Ripoll"
    `);
  })
);

test(
  'Can remove author link prop',
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
        unlink: true,
      })
    );

    const body = await page.evaluateHandle<ElementHandle>(() => document.body);

    // Confirm the author name is "text" and not a link
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      text
        text "By"
      text
        text "Shakira Isabel Mebarak Ripoll"
    `);
  })
);
