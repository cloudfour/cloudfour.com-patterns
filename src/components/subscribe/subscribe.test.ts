import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';

import template from './subscribe.twig';

test('should be customizable', () => {
  // No customization
  document.body.innerHTML = template({ form_id: 'test' });

  // Confirm default heading tags are not set
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();

  // Confirm default form values
  expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute(
    'placeholder',
    'Your Email Address',
  );

  // Customize the component
  document.body.innerHTML = template({
    form_id: 'test',
    form_action: 'test-action.com',
    heading_tag: 'h3',
    weekly_digests_heading: 'Weekly digests available',
    subscribe_heading: "Don't miss out!",
    notifications_btn_class: 'hello',
    notifications_btn_initial_visual_label: 'Yes to notifications',
    weekly_digests_btn_class: 'world',
    weekly_digests_btn_label: 'I want weekly digests',
    email_input_name: 'email-input-name',
    email_input_placeholder: 'Gimme email',
    submit_btn_label: 'Sign up',
  });

  // Confirm custom headings
  screen.getByRole('heading', {
    name: 'Weekly digests available',
    level: 3,
  });
  screen.getByRole('heading', { name: "Don't miss out!", level: 3 });

  // Confirm custom form values
  expect(
    screen.getByRole('form', { name: 'Weekly digests available' }),
  ).toHaveAttribute('action', 'test-action.com');
  const emailInput = screen.getByRole('textbox', { name: 'Email' });
  expect(emailInput).toHaveAttribute('placeholder', 'Gimme email');
  expect(emailInput).toHaveAttribute('name', 'email-input-name');

  // Confirm custom notifications button
  expect(
    screen.getByRole('button', { name: 'Yes to notifications' }),
  ).toHaveClass('hello');

  // Confirm custom weekly digests link
  expect(
    screen.getByRole('link', { name: 'I want weekly digests' }),
  ).toHaveClass('world');

  // Confirm custom weekly digests submit button
  screen.getByRole('button', { name: 'Sign up' });
});
