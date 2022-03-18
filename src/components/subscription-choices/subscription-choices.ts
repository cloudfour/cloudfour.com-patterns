/**
 * Button swap
 *
 * Swaps two buttons by toggling the `hidden` attribute on the wrapper for each
 * button + visually hidden message group; only one button + visually hidden
 * message is displayed at a time.
 */
export const initSubscriptionChoices = (containerEl: HTMLElement) => {
  const SHOW_FORM_CLASS = 'activate-form';
  const BLUR_TIMEOUT = 1000; // Milliseconds

  // Keeps track of active setTimeouts
  let blurTimeoutId: number;

  // Query all the required elements
  const getWeeklyDigestsBtn = containerEl.querySelector(
    '.js-subscription-choices__get-weekly-digests-btn'
  );
  const formEl = containerEl.querySelector('form');
  const formChildEls = containerEl.querySelectorAll('form > *');
  const controlEls = containerEl.querySelectorAll(
    '.js-subscription-choices__control'
  );

  // Confirm we have what we need to proceed
  if (!getWeeklyDigestsBtn || !formEl) {
    return;
  }

  // Remove the form anytime a control gets focus
  const onControlFocus = () => {
    clearTimeout(blurTimeoutId);
    containerEl.classList.remove(SHOW_FORM_CLASS);
  };

  // Show the form anytime any form element gets focus
  // The form is always accessible by keyboard, it's only visually hidden
  const onFormFocus = () => {
    clearTimeout(blurTimeoutId);
    containerEl.classList.add(SHOW_FORM_CLASS);
  };

  // Hide the form after a delay anytime focus is removed from a form element
  const onFormBlur = () => {
    clearTimeout(blurTimeoutId);
    blurTimeoutId = window.setTimeout(() => {
      containerEl.classList.remove(SHOW_FORM_CLASS);
    }, BLUR_TIMEOUT);
  };

  // Handler for the button click
  const onGetWeeklyDigestsClick = (event: Event) => {
    event.preventDefault();
    containerEl.classList.add(SHOW_FORM_CLASS);
    formEl.querySelector('input')?.focus();
  };

  // Clean up event listeners
  const destroy = () => {
    getWeeklyDigestsBtn.removeEventListener('click', onGetWeeklyDigestsClick);
    for (const formChildEl of formChildEls) {
      formChildEl.removeEventListener('blur', onFormBlur);
      formChildEl.removeEventListener('focus', onFormFocus);
    }
    for (const controlEl of controlEls) {
      controlEl.removeEventListener('focus', onControlFocus);
    }
  };

  // Set up all event listeners
  const init = () => {
    getWeeklyDigestsBtn.addEventListener('click', onGetWeeklyDigestsClick);
    for (const formChildEl of formChildEls) {
      formChildEl.addEventListener('blur', onFormBlur);
      formChildEl.addEventListener('focus', onFormFocus);
    }
    for (const controlEl of controlEls) {
      controlEl.addEventListener('focus', onControlFocus);
    }
  };

  init();

  // Return a public API for consumers of this component
  return { destroy };
};
