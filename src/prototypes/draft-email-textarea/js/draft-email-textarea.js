export const runPrototypeJavaScript = () => {
  const copyToClipboard = (text) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return Promise.reject('Clipboard API not available');
  };

  const onCopyClick = () => {
    const draftEl = document.getElementById('email-draft');

    // Select the text on click for a better UX
    draftEl.select();
    draftEl.setSelectionRange(0, 99999); // For mobile devices

    copyToClipboard(draftEl.value);
  };

  document.getElementById('copy-btn').addEventListener('click', onCopyClick);
};

export const forDemoPurposesOnlyText = `Hi there,

My name is [Firstname Lastname], I’m a [role] at [organization].

I’m reaching out to discuss [project, question, challenge]. [Additional details, if any.]

Our budget for this effort is [budget, range, etc.] and we’re interested in wrapping up in [timeframe].

I’m available to chat [potential meeting times], let me know if any of those work for you.

Have a great day!

[Firstname Lastname]`;
