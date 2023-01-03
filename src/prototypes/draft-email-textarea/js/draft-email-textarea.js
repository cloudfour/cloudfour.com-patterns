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

