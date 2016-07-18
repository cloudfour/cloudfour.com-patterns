'use strict';

import {u} from 'umbrellajs';
import {ElasticTextarea} from './elastic-textarea';
import {FloatLabel} from './float-label';

export class CommentReply {
  constructor (element, {
    idAttribute = 'data-id',
    template = '<p>No template provided.</p>',
    hiddenClass = 'u-hidden',
    toggleSelector = '.js-comment-replyToggle',
    insertMethod = 'after',
    insertSelector = '.js-comment-insertReply',
    focusSelector = 'textarea, input',
    elasticTextareaSelector = '.js-ElasticTextarea',
    floatLabelSelector = '.js-FloatLabel'
  } = {}) {
    this.element = u(element);
    this.id = this.element.attr(this.idAttribute);
    this.template = template.replace(/\{\{id\}\}/g, this.id);
    this.isOpen = false;
    this.insertElement = this.element.find(insertSelector);
    this.toggleElements = this.element.find(toggleSelector);

    this.options = {
      hiddenClass,
      toggleSelector,
      insertMethod,
      focusSelector,
      floatLabelSelector,
      elasticTextareaSelector
    };

    this.toggleElements.handle('click', () => this.toggle());
  }

  toggle () {
    if (this.isOpen) {
      return this.close();
    }

    return this.open();
  }

  open () {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    this.formElement.removeClass(this.options.hiddenClass);
    this.toggleElements.addClass(this.options.hiddenClass);

    if (this.options.focusSelector) {
      this.formElement.find(this.options.focusSelector).first().focus();
    }
  }

  close () {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;

    this.formElement.addClass(this.options.hiddenClass);
    this.toggleElements.removeClass(this.options.hiddenClass);
  }

  get formElement () {
    if (!this._formElement) {
      this._formElement = u(this.template);
      this._formElement.addClass(this.options.hiddenClass);
      this._formElement.find(this.options.toggleSelector).handle('click', () => this.toggle());
      this.insertElement[this.options.insertMethod](this._formElement);
      this._formElement.find(this.options.elasticTextareaSelector).map(element => {
        new ElasticTextarea(element, {
          eventName: 'keyup'
        });
      });
      this._formElement.find(this.options.floatLabelSelector).map(element => {
        new FloatLabel(element);
      });
    }

    return this._formElement;
  }
}
