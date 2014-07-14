
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Bill = mongoose.model('Bill');
var log = require('debug')('billtracker:db-api:bill');
/**
 * Creates Bill
 *
 * @param {Object} billData to create law
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'bill' item created or `undefined`
 * @return {Module} `Bill` module
 *
 */
exports.create = function create(billData, fn) {
  var bill = new Bill(billData);
  bill.save(function (err) {
    if (!err)
      return log('Saved bill %s', bill.id), fn(null, bill);

    if (11000 == err.code) {
      log('Attempt of duplication');
    } else {
      log('Found error %s', err);
      fn(err);
    }
    return this;
  });
};
