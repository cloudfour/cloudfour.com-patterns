/**
 * Button swap
 *
 * Swaps two buttons by toggling the `hidden` attribute on the wrapper for each
 * button + visually hidden message group; only one button + visually hidden
 * message is displayed at a time.
 */
export const initDisclosureWidget = (containerEl: HTMLElement) => {
  let blurTimeoutId: number;

  const getWeeklyDigestsBtn = containerEl.querySelector(
    '.js-disclosure-widget__get-weekly-digests-btn'
  ) as HTMLButtonElement;
  const formEl = containerEl.querySelector('form') as HTMLFormElement;
  const formChildEls = containerEl.querySelectorAll('form > *');
  const controlEls = containerEl.querySelectorAll(
    '.js-disclosure-widget__control'
  );

  // Click handler
  const onClick = (event: Event) => {
    event.preventDefault();

    containerEl.classList.add('show-form');
    formEl.querySelector('input')?.focus();
  };

  const onControlFocus = () => {
    clearBlurTimeout();
    containerEl.classList.remove('show-form');
  };

  const onFormFocus = () => {
    clearBlurTimeout();
    containerEl.classList.add('show-form');
  };

  const onFormBlur = () => {
    startBlurTimeout();
  };

  const clearBlurTimeout = () => {
    if (blurTimeoutId) {
      clearTimeout(blurTimeoutId);
    }
  };

  const startBlurTimeout = () => {
    clearBlurTimeout();

    blurTimeoutId = window.setTimeout(() => {
      containerEl.classList.remove('show-form');
    }, 1000);
  };

  // Clean up event listeners
  const destroy = () => {
    getWeeklyDigestsBtn.removeEventListener('click', onClick);
    for (const formChildEl of formChildEls) {
      formChildEl.removeEventListener('blur', onFormBlur);
      formChildEl.removeEventListener('focus', onFormFocus);
    }
  };

  const init = () => {
    getWeeklyDigestsBtn.addEventListener('click', onClick);
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
