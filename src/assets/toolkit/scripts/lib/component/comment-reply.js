'use strict';

import { u } from 'umbrellajs';

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
      formIdInputSelector,
      formTemplate,
      toggleSelector,
      toggleShownClass,
      focusSelector,
      onShow,
      onHide
    });

    this.element = u(element);
    this.id = parseInt(this.element.attr(idAttributeName), 10);
    this.insertAfterElement = this.element.find(insertAfterSelector);
    this.toggleElement = this.element.find(toggleSelector);
    this.toggleElement.handle('click', () => this.toggleForm());
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

    this.formElement = u(this.formTemplate);
    this.formElement.find(this.formIdInputSelector).first().value = this.id;

    this.formElement.filter('[id]').attr('id', this.formElement.attr('id') + '-' + this.id);

    this.formElement.find('[id]').map(element => {
      element = u(element);
      const originalId = element.attr('id');
      const newId = originalId + '-' + this.id;
      element.attr('id', newId);
      this.formElement.find('[for="' + originalId + '"]').attr('for', newId);
    });

    this.insertAfterElement.after(this.formElement);

    this.formElement.find(this.toggleSelector).handle('click', () => this.toggleForm());

    if (this.focusSelector) {
      this.formElement.find(this.focusSelector).first().focus();
    }

    if (this.toggleShownClass) {
      this.toggleElement.addClass(this.toggleShownClass);
    }

    if (this.onShow) {
      this.onShow(this);
    }
  }

  hideForm () {
    if (!this.formElement) {
      return;
    }

    this.formElement.remove();
    this.formElement = undefined;

    if (this.toggleShownClass) {
      this.toggleElement.removeClass(this.toggleShownClass);
    }

    if (this.onHide) {
      this.onHide(this);
    }
  }
}
