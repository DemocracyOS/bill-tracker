
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Bill = mongoose.model('Bill');

/**
 * Creates Bill
 *
 * @param {Object} data to create law
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'law' item created or `undefined`
 * @return {Module} `Bill` module
 *
 */
exports.create = function create(data, fn) {
  var bill = new Bill(data);
  bill.save(function onSave(err) {
      fn(err);
  });

  return this;
};
