/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */

require('node-path')(module);
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO: unify with step.js

/**
 * Step Schema
 * @type {Schema}
 */
var StepSchema = new Schema({
    number : { type: Number, required: true, default: 0 }
  , name  : { type: String, required: true }
  , arriveAt : { type: Date, default: Date.now }
});

/**
 * Author Schema
 * Represent the participants that impulse the bill.
 * @type {Schema}
 */
var AuthorSchema = new Schema({
    name  : { type: String, required: true }
  , description : { type: String }
});

/**
 * Bill Schema
 * @type {Schema}
 */
var BillSchema = new Schema({
    billId: { type: String, required: true }
  , name: { type: String, required: false }
  , status: { type: String, enum: ['started', 'stopped', 'finished'], default: 'started', required: true }
  , description: { type: String, required: false }
  , startedAt: { type: Date, default: Date.now }
  , finishedAt: { type: Date }
  , votedAt :  { type: Date }
  , dueAt   :  { type: Date }
  , authors :  [AuthorSchema]
  , steps: [StepSchema]
});

BillSchema.index({ billId: -1 });

module.exports = mongoose.model('Bill', BillSchema);
