/**
 * Iterate over a block a given number of times.
 *
 * Usage:
 *   <ul>
 *     {{#times 5}}<li>Item {{@index}}</li>{{/times}}
 *   </ul>
 */

var Handlebars  = require('handlebars');

module.exports = function (n, options) {
  var out = '', data;

  for (var i = 0; i < n; ++i) {
    data = Handlebars.createFrame(options.data || {});
    data.index = i;
    out += options.fn(i, { data: data });
  }

  return out;
};
