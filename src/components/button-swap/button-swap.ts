/**
 * Button swap
 */
export const initButtonSwap = (buttonSwapEl: HTMLElement) => {
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

  const onSubscribeClick = () => {
    subscribeGroup.hidden = true;
    unsubscribeGroup.hidden = false;

    const message = unsubscribeGroup.querySelector(
      '.js-c-button-swap__message'
    ) as HTMLElement;
    message.focus();
  };

  const onUnsubscribeClick = () => {
    unsubscribeGroup.hidden = true;
    subscribeGroup.hidden = false;

    const message = subscribeGroup.querySelector(
      '.js-c-button-swap__message'
    ) as HTMLElement;
    message.focus();
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
