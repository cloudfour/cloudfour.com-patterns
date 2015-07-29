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
