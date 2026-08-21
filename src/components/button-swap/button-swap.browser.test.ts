import { expect, test } from 'vitest';
import { page } from 'vitest/browser';

import '../../../dist/standalone.css';

import template from './button-swap.twig';

const body = () => page.elementLocator(document.body);

test('Swap UI state when clicked', async () => {
  document.body.innerHTML = template();

  // This package ships the markup for Button Swap but not the script that swaps it:
  // that lives in the consuming site. So what this asserts is the initial state --
  // only the unsubscribed button is exposed, and it is not the slashed variant.
  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - status: Currently unsubscribed from notifications
    - button "Get notifications"
  `);

  const firstBtn = page.getByRole('button');
  await expect.element(firstBtn).toBeVisible();
  await expect.element(firstBtn).not.toHaveClass('is-slashed');
});

test('Set custom messages and labels', async () => {
  document.body.innerHTML = template({
    initial_visual_label: 'Hello world',
    swapped_visual_label: 'Have a great day',
    initial_label: 'Unsubscribed',
    swapped_label: 'Subscribed',
  });

  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - status: Unsubscribed
    - button "Hello world"
  `);
});
