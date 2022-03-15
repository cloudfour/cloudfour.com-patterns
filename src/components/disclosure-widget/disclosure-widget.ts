/**
 * Button swap
 *
 * Swaps two buttons by toggling the `hidden` attribute on the wrapper for each
 * button + visually hidden message group; only one button + visually hidden
 * message is displayed at a time.
 */
export const initDisclosureWidget = (disclosureWidgetEl: HTMLElement) => {
  let isExpanded: boolean;

  const disclosureWidgetBtn = disclosureWidgetEl.querySelector(
    '.js-disclosure-widget__button'
  ) as HTMLButtonElement;

  // Click handler
  const onClick = () => {
    // Toggle state
    isExpanded = !isExpanded;
    // Update DOM with new value
    disclosureWidgetBtn.setAttribute('aria-expanded', String(isExpanded));
  };

  const destroy = () => {
    // Clean up event listeners
    disclosureWidgetBtn.removeEventListener('click', onClick);
  };

  // Intialize
  disclosureWidgetBtn.addEventListener('click', onClick);
  isExpanded = disclosureWidgetBtn.getAttribute('aria-expanded') === 'true';

  // Return a public API for consumers of this component
  return { destroy };
};
