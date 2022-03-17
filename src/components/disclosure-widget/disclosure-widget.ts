/**
 * Button swap
 *
 * Swaps two buttons by toggling the `hidden` attribute on the wrapper for each
 * button + visually hidden message group; only one button + visually hidden
 * message is displayed at a time.
 */
export const initDisclosureWidget = (disclosureWidgetEl: HTMLElement) => {
  let isExpanded: boolean;

  const getWeeklyDigestsBtn = disclosureWidgetEl.querySelector(
    '.js-disclosure-widget__button'
  ) as HTMLButtonElement;

  const formEl = disclosureWidgetEl.querySelector('form') as HTMLFormElement;

  // Click handler
  const onClick = (event: Event) => {
    event.preventDefault();
    // Toggle state
    // isExpanded = !isExpanded;
    // Update DOM with new value
    // getWeeklyDigestsBtn.setAttribute('aria-expanded', String(isExpanded));
    // controlsEl.classList.add(HIDDEN_VISUALLY_CSS_CLASS);
    // formEl.classList.remove(HIDDEN_VISUALLY_CSS_CLASS);
    formEl.querySelector('input')?.focus();
  };

  const onFormBlur = () => {
    console.log('The FOrm BLURRED');
    setTimeout(() => {
      // controlsEl.classList.remove(HIDDEN_VISUALLY_CSS_CLASS);
      // formEl.classList.add(HIDDEN_VISUALLY_CSS_CLASS);
    }, 1000);
  };

  const destroy = () => {
    // Clean up event listeners
    getWeeklyDigestsBtn.removeEventListener('click', onClick);
  };

  const init = () => {
    // controlsEl = disclosureWidgetEl.querySelector(
    //   '.js-disclosure-widget__controls'
    // ) as HTMLElement;

    // const inputs = formEl.querySelectorAll('input') as HTMLFormElement;

    // getWeeklyDigestsBtn.setAttribute('aria-expanded', 'false');
    // formEl.classList.add(HIDDEN_VISUALLY_CSS_CLASS);
    // formEl.setAttribute('tabindex', '-1');

    // isExpanded = getWeeklyDigestsBtn.getAttribute('aria-expanded') === 'true';
    getWeeklyDigestsBtn.addEventListener('click', onClick);
    // formEl.addEventListener('blur', onFormBlur);
  };

  init();

  // Return a public API for consumers of this component
  return { destroy };
};
