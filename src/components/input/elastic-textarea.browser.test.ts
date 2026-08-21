import { expect, onTestFinished, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import '../../../dist/standalone.css';

import { createElasticTextArea } from './elastic-textarea.js';
import template from './input.twig';

/**
 * Renders a textarea, makes it elastic, and caps its width so the wrap points the
 * assertions below depend on are set by the element rather than the viewport.
 */
const renderTextarea = (args: Record<string, unknown> = {}) => {
  document.body.innerHTML = template({
    class: 'js-elastic-textarea',
    type: 'textarea',
    ...args,
  });

  const textarea = page.getByRole('textbox').element() as HTMLTextAreaElement;
  const { destroy } = createElasticTextArea(textarea);
  onTestFinished(destroy);

  return textarea;
};

test('Resizes correctly with no rows attribute', async () => {
  const textarea = renderTextarea();
  textarea.style.maxWidth = '500px';

  // Default of 2 rows
  await expect.element(textarea).toHaveAttribute('rows', '2');

  // This wraps, so both lines should be full now
  await userEvent.type(
    textarea,
    'this is a very long sentence with a lot of words that make it wrap',
  );
  await expect.element(textarea).toHaveAttribute('rows', '2');

  // Enter is pressed, so now there should be 3 lines (this line doesn't wrap)
  await userEvent.type(
    textarea,
    '{Enter}this is a very long sentence with a lot',
  );
  await expect.element(textarea).toHaveAttribute('rows', '3');

  // After emptying it out, it should have 2 rows, since that is the default
  await userEvent.clear(textarea);
  await expect.element(textarea).toHaveAttribute('rows', '2');
});

test('Allows you to override the minimum number of rows', async () => {
  const textarea = renderTextarea({ rows: 1 });
  textarea.style.maxWidth = '500px';

  // Starts at 1 row since we set rows attribute
  await expect.element(textarea).toHaveAttribute('rows', '1');

  await userEvent.type(textarea, 'I have {Enter}{Enter}{Enter} a long message');
  await expect.element(textarea).toHaveAttribute('rows', '4');

  // After emptying it out, it should have 1 row, since that is what we
  // initialized `rows` to
  await userEvent.clear(textarea);
  await expect.element(textarea).toHaveAttribute('rows', '1');
});

test('Should update to fit content when textarea is resized', async () => {
  // First test the viewport changing size, start with a wide viewport
  await page.viewport(800, 400);
  const textarea = renderTextarea({
    value:
      'We are a small, versatile team who care passionately about the web. We’re full of what our industry considers unicorns. Our designers code. Our developers went to art school.',
  });

  // The text should wrap two lines
  await expect.element(textarea).toHaveAttribute('rows', '2');

  // Then size it down to a narrow viewport width
  await page.viewport(250, 400);
  // The textarea should resize, forcing the text to wrap multiple lines
  await expect.element(textarea).toHaveAttribute('rows', '6');

  // Reset the viewport back to a larger size
  await page.viewport(800, 400);
  // The textarea should go back to only 2 lines
  await expect.element(textarea).toHaveAttribute('rows', '2');

  // Now validate it works when the width of the textarea itself changes
  textarea.style.width = '250px';
  // This should resize the textarea, forcing multiple lines of text
  await expect.element(textarea).toHaveAttribute('rows', '7');

  // Reset back to larger size
  textarea.style.width = '800px';
  // Should go back to two lines of text
  await expect.element(textarea).toHaveAttribute('rows', '2');
});
