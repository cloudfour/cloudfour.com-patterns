'use strict';

import {u} from 'umbrellajs';
import {ElasticTextarea} from './elastic-textarea';
import {FloatLabel} from './float-label';

export class CommentReply {
  /**
   * Replacement for WordPress' default `comment-reply.js` functionality.
   *
   * @param {DOM} element - The containing element for the entire comment.
   * @param {Object} options
   */
  constructor (element, {
    elasticTextareaSelector = '.js-ElasticTextarea',
    floatLabelSelector = '.js-FloatLabel',
    focusSelector = 'textarea, input',
    hiddenClass = 'u-hidden',
    idAttribute = 'data-id',
    insertMethod = 'after',
    insertSelector = '.js-comment-insertReply',
    template = '<p>No template provided.</p>',
    toggleSelector = '.js-comment-replyToggle'
  } = {}) {
    // Store element as Umbrella object
    this.element = u(element);
    // Store ID
    this.id = this.element.attr(idAttribute) || 0;
    // Store relevant children of comments (also as Umbrella objects)
    this.insertElement = this.element.find(insertSelector);
    this.toggleElements = this.element.find(toggleSelector);
    // Store template, replacing occurrences of `{{id}}` with the actual ID
    this.template = template.replace(/\{\{id\}\}/g, this.id);
    // Store remaining items as options
    this.options = {
      elasticTextareaSelector,
      floatLabelSelector,
      focusSelector,
      hiddenClass,
      insertMethod,
      toggleSelector
    };
    // Bind events to toggle elements
    this.toggleElements.handle('click', () => this.toggle());
  }

  /**
   * Toggle the open/close state of the reply form.
   */
  toggle () {
    if (this.isOpen) {
      return this.close();
    }

    return this.open();
  }

  /**
   * Open the form.
   */
  open () {
    // If already open, do nothing
    if (this.isOpen) {
      return;
    }
    // Set this right away to avoid double-opens
    this.isOpen = true;
    // Show the form, hide the reply toggle
    this.formElement.removeClass(this.options.hiddenClass);
    this.toggleElements.addClass(this.options.hiddenClass);
    // Focus the first focusable element in the form
    if (this.options.focusSelector) {
      this.formElement.find(this.options.focusSelector).first().focus();
    }
  }

  /**
   * Close the form.
   */
  close () {
    // If already closed, do nothing
    if (!this.isOpen) {
      return;
    }
    // Set this right away to avoid double-closes
    this.isOpen = false;
    // Hide the form, show the reply toggle
    this.formElement.addClass(this.options.hiddenClass);
    this.toggleElements.removeClass(this.options.hiddenClass);
  }

  /**
   * Getter for the form element.
   *
   * If it doesn't exist yet, it creates it first.
   */
  get formElement () {
    if (!this._formElement) {
      // Create the form element from the template
      this._formElement = u(this.template);
      // Hide it initially
      this._formElement.addClass(this.options.hiddenClass);
      // Bind events to any toggles therein
      this._formElement.find(this.options.toggleSelector).handle('click', () => this.toggle());
      // Insert the form into the DOM using the configurable insertion method and selector
      this.insertElement[this.options.insertMethod](this._formElement);
      // Initialize any elastic textareas
      if (this.options.elasticTextareaSelector) {
        this._formElement.find(this.options.elasticTextareaSelector).map(element => {
          new ElasticTextarea(element, {
            eventName: 'keyup'
          });
        });
      }
      // Initialize any float labels
      if (this.options.floatLabelSelector) {
        this._formElement.find(this.options.floatLabelSelector).map(element => {
          new FloatLabel(element);
        });
      }
    }
    // Return the existing (or newly created) element
    return this._formElement;
  }
}
