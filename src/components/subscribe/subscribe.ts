/**
 * Subscribe
 *
 * Progressively enhances the UX for the Subscribe component.
 *
 * Enhancements include:
 * - A one second form hide delay is added when `:focus` is moved away from the
 *   Subscribe component elements
 * - The form can be hidden by pressing the `Escape` key
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
  const controlEls = containerEl.querySelectorAll<HTMLElement>(
    '.js-subscribe__control'
  );

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

  // We'll store any event listener cleanup callbacks in this array for later
  const cleanupCallbacks: (() => void)[] = [];
  const addEventListeners = () => {
    getWeeklyDigestsBtn.addEventListener('click', onGetWeeklyDigestsClick);
    cleanupCallbacks.push(() =>
      getWeeklyDigestsBtn.removeEventListener('click', onGetWeeklyDigestsClick)
    );

    for (const formFocusableEl of formFocusableEls) {
      formFocusableEl.addEventListener('blur', onFormBlur);
      formFocusableEl.addEventListener('focus', onFormFocus);
      cleanupCallbacks.push(() => {
        formFocusableEl.removeEventListener('blur', onFormBlur);
        formFocusableEl.removeEventListener('focus', onFormFocus);
      });
    }

    for (const controlEl of controlEls) {
      controlEl.addEventListener('focus', onControlFocus);
      cleanupCallbacks.push(() =>
        controlEl.removeEventListener('focus', onControlFocus)
      );
    }

    document.addEventListener('keydown', onKeydown);
    cleanupCallbacks.push(() =>
      document.removeEventListener('keydown', onKeydown)
    );
  };

  // Destroys the Subscribe component
  // - clears existing timeouts
  // - sets up the proper UI state
  // - removes event listeners
  const destroy = () => {
    // Don't want this hanging around, it could end up in a confusing UI state
    clearTimeout(blurTimeoutId);
    // Remove all event listeners
    for (const cleanup of cleanupCallbacks) cleanup();
    // Hide the UI buttons so we can show the form
    for (const btn of controlEls) btn.hidden = true;
    // Show the form
    containerEl.classList.add(SHOW_FORM_CLASS);
  };

  // Initializes the Subscribe component
  // - clears existing state/timeouts
  // - sets up the proper UI state
  // - sets up event listeners
  const init = () => {
    // Perform a cleanup first
    destroy();
    // We want to make sure the UI buttons are visible on init
    for (const btn of controlEls) btn.hidden = false;
    addEventListeners();
    // Make sure to show the button UI state (no form)
    containerEl.classList.remove(SHOW_FORM_CLASS);
  };

  init();

  // Return a public API for consumers of this component
  return { reinit: init, destroy };
};
