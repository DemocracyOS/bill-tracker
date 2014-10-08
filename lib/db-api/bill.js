
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

/**
 * Get bill by id.
 *
 * @param {String} billId bill's id.
 * @param {Function} fn Callback function, return error, or
 * bill data.
 *
 */
exports.get = function get(billId, fn) {

  var query = { billId: billId };
  log("Looking for bill %s", billId);

  Bill.findOne(query)
  .exec(function (err, bill) {
    if (err) return fn(err);

    fn(null, bill);
  });

  return this;
};

/**
 * Get All bills.
 *
 * @param {Function} fn Callback function, return error, or
 * bill data.
 *
 */
exports.all = function all(fn) {

  log("Looking for all bill");

  Bill.find({})
  .exec(function (err, bills) {
    if (err) return fn(err);
    fn(null, bills);
  });

  return this;
};

/**
 * Get All bills in a reduce way..
 *
 * Only bill id, billId, and name will be returned
 *
 * @param {Function} fn Callback function, return error, or
 * bill data.
 *
 */
exports.smallAll = function smallAll(fn) {
  log("Looking for reduce all bills ");
  Bill.find()
    .select('id name billId')
    .exec(function (err, bills) {
      if (err)
        return fn(err);

      fn(null, bills);
    });

  return this;
};

/**
 * Get Step by number.
 *
 * @param {String} billId bill's id.
 * @param {Number} stepNumber Number of the wanted step.
 * @param {Function} fn Callback function, return error, or
 * bill data.
 *
 */
exports.getStepByNumber = function getStepByNumber(billId, stepNumber, fn) {
  var query = { billId: billId };
  log('Looking for Bills %s Step %d',billId, stepNumber );
  Bill.findOne(query)
  .exec(function (err, bill) {
    if (err) return fn(err);
    fn(null, bill.steps[stepNumber -1]);
  });

  return this;
};

/**
 * Get Step by number.
 *
 * @param {String} billId bill's id.
 * @param {Function} fn Callback function, return error, or
 * bill data.
 *
 */
exports.getSteps = function getSteps(billId, fn) {
  var query = { billId: billId };
  log('Looking for Bills %s Steps %d',billId);

  //TODO: try to unify with getStepByNumber

  Bill.findOne(query)
    .exec(function (err, bill) {
      if (err) return fn(err);
      fn(null, bill.steps);
    });

  return this;
};
