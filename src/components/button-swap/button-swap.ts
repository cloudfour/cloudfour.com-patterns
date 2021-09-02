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
 * text after each swap to allow a more inclusive UX via assistive technology.
 */
export const initButtonSwap = (
  buttonSwapEl: HTMLElement,
  {
    firstBtnCallback,
    secondBtnCallback,
  }: {
    firstBtnCallback?: (event: Event) => void;
    secondBtnCallback?: (event: Event) => void;
  } = {}
) => {
  // The group wrappers
  const firstBtnWrapper = buttonSwapEl.querySelector(
    '.js-c-button-swap__first-btn-wrapper'
  ) as HTMLElement;
  const secondBtnWrapper = buttonSwapEl.querySelector(
    '.js-c-button-swap__second-btn-wrapper'
  ) as HTMLElement;

  // The buttons
  const subscribeBtn = getButton(firstBtnWrapper);
  const unsubscribeBtn = getButton(secondBtnWrapper);

  /**
   * Performs all "subscribe" actions
   */
  const onSubscribeClick = (event: Event) => {
    firstBtnWrapper.hidden = true;
    secondBtnWrapper.hidden = false;

    const statusMsg = getStatusMessage(secondBtnWrapper);
    statusMsg.setAttribute('role', 'alert');
    statusMsg.focus();

    if (firstBtnCallback) {
      firstBtnCallback(event);
    }
  };

  /**
   * Performs all "unsubscribe" actions
   */
  const onUnsubscribeClick = (event: Event) => {
    secondBtnWrapper.hidden = true;
    firstBtnWrapper.hidden = false;

    const statusMsg = getStatusMessage(firstBtnWrapper);
    statusMsg.setAttribute('role', 'alert');
    statusMsg.focus();

    if (secondBtnCallback) {
      secondBtnCallback(event);
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
