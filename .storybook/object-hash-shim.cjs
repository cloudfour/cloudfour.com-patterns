const stringify = require('fast-json-stable-stringify');
var sha512 = require('hash.js/lib/hash/sha/512');

const objectHash = (obj) => {
  const str = stringify(obj);
  return str;
  // return sha512(str);
};

module.exports = objectHash;
