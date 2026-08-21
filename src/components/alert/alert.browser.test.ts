import { expect, test } from 'vitest';
import { page } from 'vitest/browser';

import template from './alert.twig';

const body = () => page.elementLocator(document.body);

test('should have no role by default', async () => {
  document.body.innerHTML = template({ message: '¡Hola!' });

  await expect.element(body()).toMatchAriaInlineSnapshot(`- paragraph: ¡Hola!`);
});

test('should be able to set a role', async () => {
  document.body.innerHTML = template({ role: 'status' });

  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - status:
      - paragraph: Hello world!
  `);
});

test('should respect `hidden` template property', () => {
  document.body.innerHTML = template({ hidden: true });

  // Nothing to see if the `hidden` attribute is added to the alert.
  //
  // This is a query rather than an empty ARIA snapshot: Vitest reads an empty
  // inline snapshot as one it still has to write, so `toMatchAriaInlineSnapshot()`
  // would pass here no matter what the alert rendered.
  expect(page.getByRole('paragraph').query()).toBeNull();
});
