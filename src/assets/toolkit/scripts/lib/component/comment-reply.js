'use strict';

// these two functions should probably be moved to other files

function stringToNode (str) {
  var div = document.createElement('div');
  div.innerHTML = str.trim();
  return div.firstChild;
}

function insertAfter (referenceNode, newNode) {
  return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export class CommentReply {
  constructor (element, {
    formIdInputSelector = 'input[name="comment_parent"]',
    formTemplate = '<p>No template provided.</p>',
    idAttributeName = 'data-id',
    insertAfterSelector = '.js-comment-insertFormAfter',
    toggleSelector = '.js-comment-formToggle',
    toggleShownClass = 'u-hidden',
    focusSelector = 'textarea, input',
    onShow = null,
    onHide = null
  } = {}) {
    Object.assign(this, {
      element,
      formIdInputSelector,
      formTemplate,
      toggleSelector,
      toggleShownClass,
      focusSelector,
      onShow,
      onHide
    });

    this.id = parseInt(this.element.getAttribute(idAttributeName), 10);
    this.insertAfterElement = this.element.querySelector(insertAfterSelector);
    this.toggleElement = this.element.querySelector(toggleSelector);

    this.toggleHandler = event => {
      event.preventDefault();
      this.toggleForm();
    };

    if (
      this.id &&
      this.insertAfterElement &&
      this.toggleElement
    ) {
      this.toggleElement.addEventListener('click', this.toggleHandler);
    }
  }

  toggleForm () {
    if (this.formElement) {
      this.hideForm();
    } else {
      this.showForm();
    }
  }

  showForm () {
    if (this.formElement) {
      return;
    }

    var formElement = stringToNode(this.formTemplate);
    var formIdInputElement = formElement.querySelector(this.formIdInputSelector);
    var formToggleElement = formElement.querySelector(this.toggleSelector);

    if (formIdInputElement) {
      formIdInputElement.setAttribute('value', this.id);
    }

    if (formToggleElement) {
      formToggleElement.addEventListener('click', this.toggleHandler);
    }

    this.formElement = insertAfter(this.insertAfterElement, formElement);

    if (this.focusSelector) {
      var focusElement = this.formElement.querySelector(this.focusSelector);

      if (focusElement) {
        focusElement.focus();
      }
    }

    if (this.toggleShownClass) {
      this.toggleElement.classList.add(this.toggleShownClass);
    }

    if (this.onShow) {
      this.onShow(this);
    }
  }

  hideForm () {
    if (!this.formElement) {
      return;
    }

    this.formElement.parentNode.removeChild(this.formElement);
    this.formElement = undefined;

    if (this.toggleShownClass) {
      this.toggleElement.classList.remove(this.toggleShownClass);
    }

    if (this.onHide) {
      this.onHide(this);
    }
  }
}
