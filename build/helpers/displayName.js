'use strict';
module.exports = function displayName(name) {
  var pattern = /^[0-9]{0,4}[-_]?\s+?/;
  return name.replace(pattern, '');
};
