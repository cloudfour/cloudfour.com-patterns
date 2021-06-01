import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate } from '../../../test-utils';

const textInputHTML = loadTwigTemplate(path.join(__dirname, './input.twig'));
const initTextareaJS = (utils: PleasantestUtils, textarea: ElementHandle) =>
  utils.runJS(
    `
    import { createElasticTextArea } from './elastic-textarea'
    export default (textarea) => createElasticTextArea(textarea);
    `,
    [textarea]
  );

test(
  'Resizes correctly with no rows attribute',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(
      await textInputHTML({
        class: 'c-input--elastic js-elastic-textarea',
        type: 'textarea',
      })
    );
    await utils.loadCSS('../../../dist/standalone.css');
    const textarea = await screen.getByRole('textbox');
    await initTextareaJS(utils, textarea);
    textarea.evaluate((el) => (el.style.maxWidth = '500px'));

    // Default of 2 rows
    await expect(textarea).toHaveAttribute('rows', '2');

    // This wraps, so both lines should be full now
    await user.type(
      textarea,
      'this is a very long sentence with a lot of words that make it wrap'
    );
    await expect(textarea).toHaveAttribute('rows', '2');

    // Enter is pressed, so now there should be 3 lines (this line doesn't wrap)
    await user.type(textarea, '{enter}this is a very long sentence with a lot');
    await expect(textarea).toHaveAttribute('rows', '3');

    // After emptying it out, it should have 2 rows, since that is the default
    await user.clear(textarea);
    await expect(textarea).toHaveAttribute('rows', '2');
  })
);

test(
  'Allows you to override the minimum number of rows',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(
      await textInputHTML({
        class: 'c-input--elastic js-elastic-textarea',
        type: 'textarea',
        rows: 1,
      })
    );
    const textarea = await screen.getByRole('textbox');
    await initTextareaJS(utils, textarea);
    await textarea.evaluate((el) => (el.style.maxWidth = '500px'));

    // Starts at 1 row since we set rows attribute
    await expect(textarea).toHaveAttribute('rows', '1');

    await user.type(textarea, 'I have {enter}{enter}{enter} a long message');
    await expect(textarea).toHaveAttribute('rows', '4');

    // After emptying it out, it should have 1 row, since that is what we initialized `rows` to
    await user.clear(textarea);
    await expect(textarea).toHaveAttribute('rows', '1');
  })
);
