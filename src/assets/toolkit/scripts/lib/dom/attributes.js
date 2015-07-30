'use strict';

export function addClass (el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

export function removeClass (el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    let classNameItems = el.className.split(' ');
    let classNameIndex = classNameItems.indexOf(className);
    el.className = classNameItems.slice(classNameIndex).join(' ');
  }
}

export function hasClass (el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
}

export function toggleClass (el, className, force) {
  if (el.classList) {
    return el.classList.toggle(className, force);
  }
  if (typeof force === 'undefined') {
    force = ! hasClass(el, className);
  }
  if (force) {
    addClass(el, className);
  } else {
    removeClass(el, className);
  }
  return force;
}
