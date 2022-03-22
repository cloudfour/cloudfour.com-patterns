import path from 'path';
import type { PleasantestUtils } from 'pleasantest';
import { withBrowser, getAccessibilityTree } from 'pleasantest';
import { loadTwigTemplate, loadGlobalCSS } from '../../../test-utils';

// Helper to load the Twig template file
const componentMarkup = loadTwigTemplate(
  path.join(__dirname, './subscription-choices.twig')
);
// Helper to load the demo Twig template file
const demoMarkup = loadTwigTemplate(path.join(__dirname, './demo/demo.twig'));

// Helper to initialize the component JS
const initJS = (utils: PleasantestUtils) =>
  utils.runJS(`
    import { initSubscriptionChoices } from './subscription-choices'
    export default () => initSubscriptionChoices(
      document.querySelector('.js-subscription-choices')
    )
  `);

describe('Subscription Choices', () => {
  test(
    'should use semantic markup',
    withBrowser(async ({ utils, page }) => {
      await loadGlobalCSS(utils);
      await utils.loadCSS('./subscription-choices.scss');
      await utils.injectHTML(await componentMarkup());
      await initJS(utils);

      expect(await getAccessibilityTree(page)).toMatchInlineSnapshot(`
        document
          heading "Never miss an article!"
            text "Never miss an article!"
          status
            text "Notifications have been turned off."
          button "Get notifications"
          link "Get Weekly Digests"
            text "Get Weekly Digests"
          form "Get Weekly Digests"
            heading "Get Weekly Digests"
              text "Get Weekly Digests"
            text "Email"
            textbox "Email"
            button "Subscribe"
      `);
    })
  );

  test(
    'should be keyboard accessible',
    withBrowser(async ({ utils, screen, waitFor, page }) => {
      await loadGlobalCSS(utils);
      await utils.loadCSS('./subscription-choices.scss');
      await utils.injectHTML(await demoMarkup());
      await initJS(utils);

      // Helper function used throughout this test
      //
      // I eslint-disabled because it was wanted me to pull this function
      // outside of the scope of this test, but, I feel collocating the function
      // within the only test that uses the function makes more sense.
      //
      // eslint-disable-next-line @cloudfour/unicorn/consistent-function-scoping
      const getFormDimensions = (formEl: HTMLElement) => ({
        formHeight: formEl.clientHeight,
        formWidth: formEl.clientWidth,
      });

      // Confirm the form is visually hidden by default
      const form = await screen.getByRole('form', {
        name: 'Get Weekly Digests',
      });
      let { formHeight, formWidth } = await form.evaluate(getFormDimensions);
      expect(formHeight).toBeLessThanOrEqual(1);
      expect(formWidth).toBeLessThanOrEqual(1);

      // Tab all the way to the form email input
      await page.keyboard.press('Tab'); // Notifications button
      await page.keyboard.press('Tab'); // Weekly Digests link
      await page.keyboard.press('Tab'); // Email input

      // Confirm the form is now "active" (not visually hidden)
      ({ formHeight, formWidth } = await form.evaluate(getFormDimensions));
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

      // Email input should be in focus
      const emailInput = await screen.getByRole('textbox', { name: 'Email' });
      await expect(emailInput).toHaveFocus();

      // Tab again to get to the Submit button
      await page.keyboard.press('Tab');

      // Submit button should be in focus
      const submitBtn = await screen.getByRole('button', { name: 'Subscribe' });
      await expect(submitBtn).toHaveFocus();

      // Confirm the form is still "active" (not visually hidden)
      ({ formHeight, formWidth } = await form.evaluate((formEl) => ({
        formHeight: formEl.clientHeight,
        formWidth: formEl.clientWidth,
      })));
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

      // Navigate back up to the Weekly Digests link
      await page.keyboard.down('Shift'); // Navigate backwards
      await page.keyboard.press('Tab'); // Email input
      await page.keyboard.press('Tab'); // Weekly Digests link
      await page.keyboard.up('Shift'); // Release Shift key

      // Confirm the focus has moved to the Weekly Digests link
      const weeklyDigestsBtn = await screen.getByRole('link', {
        name: 'Get Weekly Digests',
      });
      await expect(weeklyDigestsBtn).toHaveFocus();

      // The form should now be visually hidden again
      ({ formHeight, formWidth } = await form.evaluate(getFormDimensions));
      expect(formHeight).toBeLessThanOrEqual(1);
      expect(formWidth).toBeLessThanOrEqual(1);

      // Navigate forward past the Submit to activate the form hide timeout
      await page.keyboard.press('Tab'); // Email input
      await page.keyboard.press('Tab'); // Submit button
      await page.keyboard.press('Tab'); // Out of the form

      // Confirm the form is still "active" (not visually hidden)
      ({ formHeight, formWidth } = await form.evaluate(getFormDimensions));
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

      // Navigate back quickly to confirm timeout getting cancelled
      await page.keyboard.down('Shift'); // Navigate backwards
      await page.keyboard.press('Tab'); // Submit button
      await page.keyboard.up('Shift'); // Release Shift key

      // Confirm the form is still "active" (not visually hidden)
      ({ formHeight, formWidth } = await form.evaluate(getFormDimensions));
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

      await page.keyboard.press('Tab'); // Out of the form

      // Confirm the form is still "active" (not visually hidden)
      ({ formHeight, formWidth } = await form.evaluate(getFormDimensions));
      expect(formHeight).toBeGreaterThan(1);
      expect(formWidth).toBeGreaterThan(1);

      // After a timeout, the form eventually visually hides
      await waitFor(
        async () => {
          ({ formHeight, formWidth } = await form.evaluate(getFormDimensions));
          expect(formHeight).toBeLessThanOrEqual(1);
          expect(formWidth).toBeLessThanOrEqual(1);
        },
        {
          timeout: 2000,
          interval: 1000,
        }
      );
    })
  );

  test(
    'should be customizable',
    withBrowser(async ({ utils, screen }) => {
      // Set up CSS
      await loadGlobalCSS(utils);
      await utils.loadCSS('./subscription-choices.scss');

      // No customization
      await utils.injectHTML(await componentMarkup({ form_id: 'test' }));

      // Confirm default heading tag
      await screen.getByRole('heading', {
        name: 'Never miss an article!',
        level: 2,
      });
      await screen.getByRole('heading', {
        name: 'Get Weekly Digests',
        level: 2,
      });

      // Confirm default form values
      let form = await screen.getByRole('form');
      let { formAction, emailInputPlaceHolder } = await form.evaluate(
        (formEl) => ({
          formAction: formEl.getAttribute('action'),
          emailInputPlaceHolder: formEl.querySelector('input')?.placeholder,
        })
      );
      expect(formAction).toBe(
        'https://cloudfour.us13.list-manage.com/subscribe/post?u=ce064f42c86a5982dd218d4de&amp;id=7e505a6a67'
      );
      expect(emailInputPlaceHolder).toBe('Your Email Address');

      // Customize the component
      await utils.injectHTML(
        await componentMarkup({
          form_id: 'test',
          form_action: 'test-action.com',
          heading_tag: 'h3',
          weekly_digests_heading: 'Weekly digests available',
          never_miss_article_heading: "Don't miss out!",
          notifications_btn_class: 'hello',
          notifications_btn_initial_visual_label: 'Yes to notifications',
          weekly_digests_btn_class: 'world',
          weekly_digests_btn_label: 'I want weekly digests',
          email_input_placeholder: 'Gimme email',
          submit_btn_label: 'Sign up',
        })
      );

      // Confirm custom headings
      await screen.getByRole('heading', {
        name: 'Weekly digests available',
        level: 3,
      });
      await screen.getByRole('heading', {
        name: "Don't miss out!",
        level: 3,
      });

      // Confirm custom form values
      form = await screen.getByRole('form');
      ({ formAction, emailInputPlaceHolder } = await form.evaluate(
        (formEl) => ({
          formAction: formEl.getAttribute('action'),
          emailInputPlaceHolder: formEl.querySelector('input')?.placeholder,
        })
      ));
      expect(formAction).toBe('test-action.com');
      expect(emailInputPlaceHolder).toBe('Gimme email');

      // Confirm custom notifications button
      const notificationsBtn = await screen.getByRole('button', {
        name: 'Yes to notifications',
      });
      await expect(notificationsBtn).toHaveClass('hello');

      // Confirm custom weekly digests link
      const weeklyDigestsLink = await screen.getByRole('link', {
        name: 'I want weekly digests',
      });
      await expect(weeklyDigestsLink).toHaveClass('world');

      // Confirm custom weekly digests submit button
      await screen.getByRole('button', {
        name: 'Sign up',
      });
    })
  );
});
