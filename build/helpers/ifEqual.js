/* https://github.com/zeke/handlebars-helper-equal/blob/master/index.js */
module.exports = function(lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlebars Helper equal needs 2 parameters")
  if (lvalue != rvalue) {
    return options.inverse(this)
  } else {
    return options.fn(this)
  }
};
