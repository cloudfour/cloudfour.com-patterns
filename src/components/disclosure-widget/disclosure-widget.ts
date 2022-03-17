/**
 * Button swap
 *
 * Swaps two buttons by toggling the `hidden` attribute on the wrapper for each
 * button + visually hidden message group; only one button + visually hidden
 * message is displayed at a time.
 */
export const initDisclosureWidget = (disclosureWidgetEl: HTMLElement) => {
  const HIDDEN_VISUALLY_CSS_CLASS = 'u-hidden-visually';
  let isExpanded: boolean;

  let getDigestsLink: HTMLButtonElement;
  let controlsEl: HTMLElement;
  let formTargetEl: HTMLElement;
  let formEl: HTMLFormElement;
  // let disclosureWidgetTargetId: string;

  // Click handler
  const onClick = (event: Event) => {
    event.preventDefault();
    // Toggle state
    isExpanded = !isExpanded;
    // Update DOM with new value
    // getDigestsLink.setAttribute('aria-expanded', String(isExpanded));
    controlsEl.classList.add(HIDDEN_VISUALLY_CSS_CLASS);
    formTargetEl.classList.remove(HIDDEN_VISUALLY_CSS_CLASS);
    const inputEl = formTargetEl.querySelector('input');
    console.log('inputEl', inputEl);
    inputEl?.focus();
  };

  const onFormBlur = () => {
    console.log('The FOrm BLURRED');
    setTimeout(() => {
      controlsEl.classList.remove(HIDDEN_VISUALLY_CSS_CLASS);
      formTargetEl.classList.add(HIDDEN_VISUALLY_CSS_CLASS);
    }, 1000);
  };

  const destroy = () => {
    // Clean up event listeners
    getDigestsLink.removeEventListener('click', onClick);
  };

  const init = () => {
    getDigestsLink = disclosureWidgetEl.querySelector(
      '.js-disclosure-widget__button'
    ) as HTMLButtonElement;

    controlsEl = disclosureWidgetEl.querySelector(
      '.js-disclosure-widget__controls'
    ) as HTMLElement;

    const targetId = getDigestsLink.getAttribute('href') as string;
    formTargetEl = document.querySelector(targetId) as HTMLElement;

    const inputs = formTargetEl.querySelectorAll('form') as HTMLFormElement;

    // getDigestsLink.setAttribute('aria-expanded', 'false');
    // formTargetEl.classList.add(HIDDEN_VISUALLY_CSS_CLASS);
    // formTargetEl.setAttribute('tabindex', '-1');

    // isExpanded = getDigestsLink.getAttribute('aria-expanded') === 'true';
    getDigestsLink.addEventListener('click', onClick);
    // formEl.addEventListener('blur', onFormBlur);
  };

  init();

  // Return a public API for consumers of this component
  return { destroy };
};
