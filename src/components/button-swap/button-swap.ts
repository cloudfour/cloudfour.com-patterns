/**
 * Helper to get the button from the supplied group element
 */
const getButton = (group: HTMLElement) =>
  group.querySelector('.js-c-button-swap__button') as HTMLButtonElement;

/**
 * Helper to get the status message from the supplied group element
 */
const getStatusMessage = (group: HTMLElement) =>
  group.querySelector('.js-c-button-swap__message') as HTMLElement;

/**
 * Button swap
 *
 * Swaps two buttons by toggling the `hidden` attribute on the wrapper for each
 * button + visually hidden message group. Sets the focus on the visually hidden
 * text after each toggle to allow a more inclusive experience via assistive technology.
 */
export const initButtonSwap = (
  buttonSwapEl: HTMLElement,
  {
    subscribeCallback,
    unsubscribeCallback,
  }: {
    subscribeCallback?: (event: Event) => void;
    unsubscribeCallback?: (event: Event) => void;
  } = {}
) => {
  // The group wrappers
  const subscribeGroup = buttonSwapEl.querySelector(
    '.js-c-button-swap__subscribe-group'
  ) as HTMLElement;
  const unsubscribeGroup = buttonSwapEl.querySelector(
    '.js-c-button-swap__unsubscribe-group'
  ) as HTMLElement;

  // The buttons
  const subscribeBtn = getButton(subscribeGroup);
  const unsubscribeBtn = getButton(unsubscribeGroup);

  /**
   * Performs all "subscribe" actions
   */
  const onSubscribeClick = (event: Event) => {
    subscribeGroup.hidden = true;
    unsubscribeGroup.hidden = false;

    const statusMsg = getStatusMessage(unsubscribeGroup);
    statusMsg.setAttribute('role', 'alert');
    statusMsg.focus();

    if (subscribeCallback) {
      subscribeCallback(event);
    }
  };

  /**
   * Performs all "unsubscribe" actions
   */
  const onUnsubscribeClick = (event: Event) => {
    unsubscribeGroup.hidden = true;
    subscribeGroup.hidden = false;

    const statusMsg = getStatusMessage(subscribeGroup);
    statusMsg.setAttribute('role', 'alert');
    statusMsg.focus();

    if (unsubscribeCallback) {
      unsubscribeCallback(event);
    }
  };

  const destroy = () => {
    // Clean up event listeners
    subscribeBtn.removeEventListener('click', onSubscribeClick);
    unsubscribeBtn.removeEventListener('click', onUnsubscribeClick);
  };

  // Intialize
  subscribeBtn.addEventListener('click', onSubscribeClick);
  unsubscribeBtn.addEventListener('click', onUnsubscribeClick);

  // Return a public API for consumers of this component
  return { destroy };
};
