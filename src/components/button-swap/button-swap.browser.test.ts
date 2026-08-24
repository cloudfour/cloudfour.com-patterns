import { expect, test } from 'vitest';
import { page } from 'vitest/browser';

import '../../../dist/standalone.css';

import template from './button-swap.twig';

const body = () => page.elementLocator(document.body);

test('Render both states, exposing only the initial one', async () => {
  document.body.innerHTML = template();

  // This package ships the markup for Button Swap but not the script that swaps it:
  // that lives in the consuming site. So there is no swap to exercise here -- what
  // the template has to get right is that both states are present and only the
  // unsubscribed one reaches the accessibility tree. The snapshot covers the second
  // half: `hidden` keeps the swapped state out of it.
  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - status: Currently unsubscribed from notifications
    - button "Get notifications"
  `);

  const firstBtn = page.getByRole('button');
  await expect.element(firstBtn).toBeVisible();
  await expect.element(firstBtn).not.toHaveClass('is-slashed');

  const swapped = document.querySelector(
    '.js-button-swap__swapped-button-wrapper',
  );
  expect(swapped).not.toBeNull();
  expect(swapped).toHaveAttribute('hidden');
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
