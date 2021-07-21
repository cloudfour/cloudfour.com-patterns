export const initCommentsWithRepliesEnabled = () => {
  const commentsWithRepliesEnabled = document.querySelectorAll(
    '.js-comment-with-replies-enabled'
  );

  for (const comment of commentsWithRepliesEnabled) {
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
      const firstInput = replyForm?.querySelector(
        'textarea, input'
      ) as HTMLElement | null;

      // Without this timeout, VoiceOver does not properly focus the first input
      // (though it works outside of VoiceOver).
      // I went back and forth on whether or not to force this behavior in
      // VoiceOver, since it will skip them past context around the comment
      // (e.g. you may use simple HTML or markdown).
      // I ended up adding this timeout to force the focus so that we provide
      // an equivalent experience for all users.
      setTimeout(() => firstInput?.focus(), 0);
    });

    cancelButton?.addEventListener('click', () => {
      comment.classList.remove('is-replying');
      replyButton?.removeAttribute('hidden');
    });
  }
};
