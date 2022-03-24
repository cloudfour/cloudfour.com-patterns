/**
 * Subscribe
 *
 * Progressively enhances the UX for the Subscribe component. Adds a
 * form hide delay when the focus exits the Subscriptoin Choices component if
 * the form is open.
 */
export const initSubscribe = (containerEl: HTMLElement) => {
  const SHOW_FORM_CLASS = 'activate-form';
  const BLUR_TIMEOUT = 1000; // Milliseconds

  // Keeps track of active setTimeouts
  let blurTimeoutId: number;
  // Keeps the current state of the form
  let isFormOpen = false;

  // Query all the required elements
  const getWeeklyDigestsBtn = containerEl.querySelector(
    '.js-subscribe__get-weekly-digests-btn'
  );
  const formEl = containerEl.querySelector('form');
  const formFocusableEls = containerEl.querySelectorAll('label, input, button');
  const controlEls = containerEl.querySelectorAll('.js-subscribe__control');

  // Confirm we have what we need to proceed
  if (!getWeeklyDigestsBtn || !formEl) {
    return;
  }

  // Hide the form anytime a `js-subscribe__control` gets focus
  const onControlFocus = () => {
    clearTimeout(blurTimeoutId);
    containerEl.classList.remove(SHOW_FORM_CLASS);
    isFormOpen = false;
  };

  // Show the form anytime any form element gets focus
  // The form is always accessible by keyboard, it's only visually hidden
  const onFormFocus = () => {
    clearTimeout(blurTimeoutId);
    containerEl.classList.add(SHOW_FORM_CLASS);
    isFormOpen = true;
  };

  // Hide the form after a delay anytime focus is removed from a form element
  const onFormBlur = () => {
    clearTimeout(blurTimeoutId);
    blurTimeoutId = window.setTimeout(() => {
      containerEl.classList.remove(SHOW_FORM_CLASS);
      isFormOpen = false;
    }, BLUR_TIMEOUT);
  };

  // Handler for the button click
  const onGetWeeklyDigestsClick = (event: Event) => {
    event.preventDefault();
    containerEl.classList.add(SHOW_FORM_CLASS);
    isFormOpen = true;
    // Jump the focus to the first input element
    formEl.querySelector('input')?.focus();
  };

  // Handler for the Escape keydown event
  const onKeydown = (event: KeyboardEvent) => {
    // We need to hide the form and reset the focus, we can get both by setting
    // the focus back to the "Get Weekly Digests" link.
    if (event.key === 'Escape' && isFormOpen) {
      (getWeeklyDigestsBtn as HTMLElement).focus();
    }
  };

  // Clean up event listeners
  const destroy = () => {
    getWeeklyDigestsBtn.removeEventListener('click', onGetWeeklyDigestsClick);
    for (const formFocusableEl of formFocusableEls) {
      formFocusableEl.removeEventListener('blur', onFormBlur);
      formFocusableEl.removeEventListener('focus', onFormFocus);
    }
    for (const controlEl of controlEls) {
      controlEl.removeEventListener('focus', onControlFocus);
    }
    document.removeEventListener('keydown', onKeydown);
  };

  // Set up all event listeners
  const init = () => {
    getWeeklyDigestsBtn.addEventListener('click', onGetWeeklyDigestsClick);
    for (const formFocusableEl of formFocusableEls) {
      formFocusableEl.addEventListener('blur', onFormBlur);
      formFocusableEl.addEventListener('focus', onFormFocus);
    }
    for (const controlEl of controlEls) {
      controlEl.addEventListener('focus', onControlFocus);
    }
    document.addEventListener('keydown', onKeydown);
  };

  init();

  // Return a public API for consumers of this component
  return { destroy };
};
