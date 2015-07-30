'use strict';

export function addClass (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
}

export function removeClass (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    let classNameItems = element.className.split(' ');
    let classNameIndex = classNameItems.indexOf(className);
    element.className = classNameItems.slice(classNameIndex).join(' ');
  }
}

export function hasClass (element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  }
  return new RegExp(`(^| )${className}( |$)`, 'gi').test(element.className);
}

export function toggleClass (element, className, state) {
  if (element.classList) {
    return element.classList.toggle(className, state);
  }
  if (typeof state === 'undefined') {
    state = ! hasClass(element, className);
  }
  if (state) {
    addClass(element, className);
  } else {
    removeClass(element, className);
  }
  return state;
}
