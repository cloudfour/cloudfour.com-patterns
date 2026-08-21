import { expect, test } from 'vitest';
import { page } from 'vitest/browser';

import template from './author.twig';

const body = () => page.elementLocator(document.body);

// The avatar is not included in any of these because I couldn't figure out how to
// include it. For the purposes of these tests, though, it is not important so I
// left it out.
const author = {
  name: 'Shakira Isabel Mebarak Ripoll',
  link: 'https://www.shakira.com/',
};

test('more accessible experience for publish date', async () => {
  document.body.innerHTML = template({
    authors: [author],
    date: new Date('March 31, 2021'),
    date_prefix: 'Presented on',
  });

  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - paragraph:
      - text: By
      - link "Shakira Isabel Mebarak Ripoll":
        - /url: https://www.shakira.com/
    - paragraph: Presented on March 31st, 2021
  `);
});

test('meta is prioritized over date', async () => {
  document.body.innerHTML = template({
    authors: [author],
    date: new Date('March 31, 2021'),
    meta: 'Singer and songwriter',
  });

  // Confirm the meta value is rendered and the date is not rendered
  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - paragraph:
      - text: By
      - link "Shakira Isabel Mebarak Ripoll":
        - /url: https://www.shakira.com/
    - paragraph: Singer and songwriter
  `);
});

test('Optional author link prop', async () => {
  document.body.innerHTML = template({ authors: [{ name: author.name }] });

  // Confirm the author name is text and not a link
  await expect
    .element(body())
    .toMatchAriaInlineSnapshot(`- paragraph: By Shakira Isabel Mebarak Ripoll`);
});

test('Can remove author link prop', async () => {
  document.body.innerHTML = template({ authors: [author], unlink: true });

  // Confirm the author name is text and not a link
  await expect
    .element(body())
    .toMatchAriaInlineSnapshot(`- paragraph: By Shakira Isabel Mebarak Ripoll`);
});
