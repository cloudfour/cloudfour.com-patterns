import tokens from '../../compiled/tokens/js/tokens';

/**
 * Create Toggling Button
 *
 * Adds an event listener to the toggle button of a Sky Nav component for click
 * events, which runs the toggle command to show or hide the menu with animation.
 * Responds to breakpoint changes to show or hide the nav for large and small
 * screens. Returns an object containing a `destroy()` method to remove the
 * event listener.
 *
 * TODO...
 *
 * @param togglingButton - The button to apply the toggling functionality
 */
export const initTogglingButton = (togglingButton: HTMLButtonElement) => {
  // Trigger event to relay state of button

  const togglePressedState = () => {
    const isAriaPressed =
      togglingButton.getAttribute('aria-pressed') === 'true';

    togglingButton.setAttribute('aria-pressed', String(!isAriaPressed));
  };

  togglingButton.addEventListener('click', togglePressedState);

  // Clean up event listeners
  const destroy = () => {
    togglingButton.removeEventListener('click', togglePressedState);
  };

  // Return a public API for consumers of this component
  return { destroy };
};
