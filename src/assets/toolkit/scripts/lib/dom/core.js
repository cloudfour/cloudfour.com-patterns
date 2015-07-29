'use strict';

export function each (elementList, callback) {
  Array.prototype.forEach.call(elementList, callback);
}
