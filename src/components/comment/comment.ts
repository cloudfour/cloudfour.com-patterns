export const initComments = () => {
  const comments = document.querySelectorAll('.js-comment');

  for (const comment of [...comments]) {
    const replyButton = comment.querySelector('.js-comment-reply-button');
    const replyForm = comment.querySelector('.js-comment-reply-form');
    // The cancel button is inside the Comment Form, so we need to reach inside
    // that component to grab the button. This feels a little awkward since
    // we're directly manipulating a child component, but this is a lot simpler
    // than other potential solutions. Other options included:
    // - Having the Comment Form emit a `cancel` event
    // - Having the Comment Form have a block that you could pass a button into
    const cancelButton = comment.querySelector('.js-cancel-reply');

    replyButton?.addEventListener('click', () => {
      comment.classList.add('is-replying');
      replyButton.setAttribute('hidden', '');
      replyForm?.removeAttribute('hidden');
      const firstInput = replyForm?.querySelector(
        'textarea, input'
      ) as HTMLElement | null;
      firstInput?.focus();
    });

    cancelButton?.addEventListener('click', () => {
      comment.classList.remove('is-replying');
      replyButton?.removeAttribute('hidden');
      replyForm?.setAttribute('hidden', '');
    });
  }
};
