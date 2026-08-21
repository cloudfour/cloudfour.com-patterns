import { expect, onTestFinished, test, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import '../../../dist/standalone.css';
import './subscribe.scss';

import demoTemplate from './demo/demo.twig';
import demoDestroyInitTemplate from './demo/destroy-init.twig';
import { createSubscribe } from './subscribe.js';
import template from './subscribe.twig';

const body = () => page.elementLocator(document.body);

/**
 * The form is hidden with a visually-hidden utility rather than `display: none`,
 * so a hidden form collapses to a 1px box instead of leaving the layout. That
 * makes its client dimensions the only way to tell the two states apart.
 */
const expectElementToBeVisuallyHidden = (element: HTMLElement) => {
  expect(element.clientHeight).toBeLessThanOrEqual(1);
  expect(element.clientWidth).toBeLessThanOrEqual(1);
};

const expectElementNotToBeVisuallyHidden = (element: HTMLElement) => {
  expect(element.clientHeight).toBeGreaterThan(1);
  expect(element.clientWidth).toBeGreaterThan(1);
};

/** Creates the component instance and tears it down when the test ends. */
const initSubscribe = () => {
  const subscribe = createSubscribe(
    document.querySelector('.js-subscribe') as HTMLElement,
  );

  // `createSubscribe` returns nothing if the markup is missing any of the elements
  // it needs. That would leave the assertions below testing inert markup, so fail
  // loudly instead.
  if (!subscribe) {
    throw new Error('Subscribe markup is missing an element the script needs');
  }

  onTestFinished(subscribe.destroy);
  return subscribe;
};

const getForm = (name: string) =>
  page.getByRole('form', { name }).element() as HTMLFormElement;

test('should use semantic markup', async () => {
  document.body.innerHTML = template({
    form_id: 'example-form',
    weekly_digests_heading: 'Get Weekly Digests',
    subscribe_heading: 'Never miss an article!',
  });
  initSubscribe().init();

  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - heading "Never miss an article!" [level=2]
    - status: Notifications have been turned off.
    - button "Get notifications"
    - link "Get Weekly Digests":
      - /url: "#subscribe-example-form"
    - form "Get Weekly Digests":
      - heading "Get Weekly Digests" [level=2]
      - text: Email
      - textbox "Email":
        - /placeholder: Your Email Address
      - button "Subscribe"
  `);
});

test('should be keyboard accessible', async () => {
  document.body.innerHTML = demoTemplate();
  initSubscribe().init();

  // Confirm the form is visually hidden by default
  const form = getForm('Get Weekly Digests');
  expectElementToBeVisuallyHidden(form);

  // Tab all the way to the form email input
  await userEvent.tab(); // Notifications button
  await userEvent.tab(); // Weekly Digests link
  await userEvent.tab(); // Email input

  // Confirm the form is now "active" (not visually hidden)
  expectElementNotToBeVisuallyHidden(form);

  // Email input should be in focus
  await expect
    .element(page.getByRole('textbox', { name: 'Email' }))
    .toHaveFocus();

  // Tab again to get to the Submit button
  await userEvent.tab();

  // Submit button should be in focus
  await expect
    .element(page.getByRole('button', { name: 'Subscribe' }))
    .toHaveFocus();

  // Confirm the form is still "active" (not visually hidden)
  expectElementNotToBeVisuallyHidden(form);

  // Navigate back up to the Weekly Digests link
  await userEvent.tab({ shift: true }); // Email input
  await userEvent.tab({ shift: true }); // Weekly Digests link

  // Confirm the focus has moved to the Weekly Digests link
  const weeklyDigestsLink = page.getByRole('link', {
    name: 'Get Weekly Digests',
  });
  await expect.element(weeklyDigestsLink).toHaveFocus();

  // The form should now be visually hidden again
  expectElementToBeVisuallyHidden(form);

  // Navigate forward past the Submit to activate the form hide timeout
  await userEvent.tab(); // Email input
  await userEvent.tab(); // Submit button
  await userEvent.tab(); // Out of the form

  // Confirm the form is still "active" (not visually hidden)
  expectElementNotToBeVisuallyHidden(form);

  // Navigate back quickly to confirm timeout getting cancelled
  await userEvent.tab({ shift: true }); // Submit button

  // Confirm the form is still "active" (not visually hidden)
  expectElementNotToBeVisuallyHidden(form);

  await userEvent.tab(); // Out of the form

  // Confirm the form is still "active" (not visually hidden)
  expectElementNotToBeVisuallyHidden(form);

  // After a timeout, the form eventually visually hides
  await vi.waitFor(() => expectElementToBeVisuallyHidden(form), {
    timeout: 2000,
    interval: 100,
  });

  // Navigate back into the form
  await userEvent.tab({ shift: true }); // Submit button

  // Confirm the form is "active" again (not visually hidden)
  expectElementNotToBeVisuallyHidden(form);

  // Should hide the form
  await userEvent.keyboard('{Escape}');

  // Confirm the form is visually hidden
  expectElementToBeVisuallyHidden(form);

  // The focus should reset back to the "weekly digests" link
  await expect.element(weeklyDigestsLink).toHaveFocus();
});

test('should destroy and initialize', async () => {
  document.body.innerHTML = demoDestroyInitTemplate();
  const subscribe = initSubscribe();
  // Set it to the "destroyed" state
  subscribe.destroy();

  // The form should be active/visible when `destroy()` is called
  const form = getForm('Get Weekly Digests');
  expectElementNotToBeVisuallyHidden(form);

  // Tab all the way to the "testing" link
  await userEvent.tab(); // Email input
  await userEvent.tab(); // Subscribe button
  await userEvent.tab(); // "Testing" link

  // The "testing" link should be in focus
  await expect
    .element(page.getByRole('link', { name: 'Testing link' }))
    .toHaveFocus();

  // After a timeout, the form should not visually hide
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  expectElementNotToBeVisuallyHidden(form);

  // Initialize the Subscribe component
  subscribe.init();

  // The form should be visually hidden after `init()` is called
  expectElementToBeVisuallyHidden(form);

  // Navigate back into the form
  await userEvent.tab({ shift: true }); // Form Subscribe submit button

  // The form should be visible when you move the focus back into the form
  expectElementNotToBeVisuallyHidden(form);

  // Navigate away from the form
  await userEvent.tab(); // "Testing" link

  // Immediately, the form should stay visible
  expectElementNotToBeVisuallyHidden(form);

  // After a timeout, the form eventually visually hides
  await vi.waitFor(() => expectElementToBeVisuallyHidden(form), {
    timeout: 2000,
    interval: 100,
  });

  // Cover a race condition where the timeout and destroy get called quickly one
  // after the other causing an unexpected UI state when the Subscribe component
  // timeout isn't cleared. Set the focus in the form first (on the submit button)
  const formSubmitBtn = page
    .getByRole('button', { name: 'Subscribe' })
    .element() as HTMLButtonElement;
  formSubmitBtn.focus();
  // Then blur the focus
  formSubmitBtn.blur();
  // And immediately run the `destroy()`
  subscribe.destroy();
  // Wait out the Subscribe component timeout
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  // The form should be visible
  expectElementNotToBeVisuallyHidden(form);
});
