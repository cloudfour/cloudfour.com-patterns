/**
 * Button swap
 *
 * Swaps two buttons by toggling the `hidden` attribute on the wrapper for each
 * button + visually hidden message group. Sets the focus on the visually hidden
 * text after each toggle to allow a more inclusive experience via assistive technology.
 */
export const initButtonSwap = (
  buttonSwapEl: HTMLElement,
  { subscribeCallback, unsubscribeCallback }
) => {
  console.log('RECEIVED', subscribeCallback, unsubscribeCallback);

  // The group wrappers
  const subscribeGroup = buttonSwapEl.querySelector(
    '.js-c-button-swap__subscribe-group'
  ) as HTMLElement;
  const unsubscribeGroup = buttonSwapEl.querySelector(
    '.js-c-button-swap__unsubscribe-group'
  ) as HTMLElement;
  // The buttons
  const subscribeBtn = subscribeGroup.querySelector(
    '.js-c-button-swap__button'
  ) as HTMLButtonElement;
  const unsubscribeBtn = unsubscribeGroup.querySelector(
    '.js-c-button-swap__button'
  ) as HTMLButtonElement;
  // The visually hidden messages
  const suscribedMessage = subscribeGroup.querySelector(
    '.js-c-button-swap__message'
  ) as HTMLElement;
  const unsubscribedMessage = unsubscribeGroup.querySelector(
    '.js-c-button-swap__message'
  ) as HTMLElement;

  /**
   * Performs all "subscribe" actions
   * @todo Figure out how to call a "subscribe" callback
   */
  const onSubscribeClick = () => {
    subscribeGroup.hidden = true;
    unsubscribeGroup.hidden = false;
    unsubscribedMessage.focus();
    if (subscribeCallback) {
      subscribeCallback();
    }
  };

  /**
   * Performs all "unsubscribe" actions
   * @todo Figure out how to call an "unsubscribe" callback
   */
  const onUnsubscribeClick = () => {
    unsubscribeGroup.hidden = true;
    subscribeGroup.hidden = false;
    suscribedMessage.focus();
    if (unsubscribeCallback) {
      unsubscribeCallback();
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
