export const initCommentReplyForm = (comment: HTMLElement) => {
  const replyButton = comment.querySelector<HTMLButtonElement>(
    '.js-comment-reply-button'
  );
  const replyForm = comment.querySelector<HTMLFormElement>(
    '.js-comment-reply-form'
  );
  // The cancel button is inside the Comment Form, so we need to reach inside
  // that component to grab the button. This feels a little awkward since
  // we're directly manipulating a child component, but this is a lot simpler
  // than other potential solutions. Other options included:
  // - Having the Comment Form emit a `cancel` event
  // - Having the Comment Form have a block that you could pass a button into
  const cancelButton =
    comment.querySelector<HTMLButtonElement>('.js-cancel-reply');

  // If we're missing form elements we shouldn't proceed
  if (!replyButton || !replyForm || !cancelButton) return { destroy: () => {} };

  const show = () => {
    comment.classList.add('is-replying');
    replyButton.setAttribute('hidden', '');
    const firstInput = replyForm.querySelector<
      HTMLTextAreaElement | HTMLInputElement
    >('textarea, input');

    // Without this timeout, VoiceOver does not properly focus the first input
    // (though it works outside of VoiceOver).
    // With this timeout, iOS doesn't show the keyboard, since iOS will only
    // show the keyboard in direct response to a user action.
    // By doing it with and without a timeout we can make both work.
    firstInput?.focus();
    setTimeout(() => firstInput?.focus(), 0);
  };

  const hide = () => {
    comment.classList.remove('is-replying');
    replyButton.removeAttribute('hidden');
    // Similar to above, we use a timeout to force the focus in VoiceOver.
    setTimeout(() => replyButton.focus(), 0);
  };

  replyButton.addEventListener('click', show);
  cancelButton.addEventListener('click', hide);

  const destroy = () => {
    replyButton.removeEventListener('click', show);
    cancelButton.removeEventListener('click', hide);
  };

  return { destroy };
};
