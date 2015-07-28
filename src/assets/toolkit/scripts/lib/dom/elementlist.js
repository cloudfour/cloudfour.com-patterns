'use strict';

export function forEach (elementList, callback) {
  Array.prototype.forEach.call(elementList, callback);
}
