/**
 * Create Toggling Button
 * Adds an event listener to toggle the `aria-pressed` value
 *
 * @param togglingButton - The button to apply the toggling functionality to
 */
export const initTogglingButton = (togglingButton: HTMLButtonElement) => {
  // Handler for when a toggling button is clicked
  const onTogglingButtonClick = () => {
    // Get the current aria-pressed state and toggle it
    const isAriaPressed = !(
      togglingButton.getAttribute('aria-pressed') === 'true'
    );
    // Update the UI state
    togglingButton.setAttribute('aria-pressed', String(isAriaPressed));
  };

  // Clean up event listeners
  const destroy = () => {
    togglingButton.removeEventListener('click', onTogglingButtonClick);
  };

  // Intialize
  const init = () => {
    togglingButton.addEventListener('click', onTogglingButtonClick);
  };

  init();

  // Return a public API for consumers of this component
  return { destroy };
};
