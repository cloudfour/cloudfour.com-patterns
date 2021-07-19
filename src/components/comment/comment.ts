export const initComments = () => {
  const comments = document.querySelectorAll('.js-comment');

  for (const comment of [...comments]) {
    const replyButton = comment.querySelector('.js-comment-reply-button');
    const replyForm = comment.querySelector('.js-comment-reply-form');
    const cancelButton = comment.querySelector('.js-cancel-reply');

    replyButton?.addEventListener('click', () => {
      comment.classList.add('is-replying');
      replyButton.setAttribute('hidden', '');
      replyForm?.removeAttribute('hidden');
      const firstInput = replyForm?.querySelector('textarea, input') as HTMLElement | null;
      firstInput?.focus();
    });

    cancelButton?.addEventListener('click', () => {
      comment.classList.remove('is-replying');
      replyButton?.removeAttribute('hidden');
      replyForm?.setAttribute('hidden', '');
    });
  }
}
