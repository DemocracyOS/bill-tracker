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
  , arriveAt : { type: Date, default: Date.now }
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
  , steps: [StepSchema]

});

BillSchema.index({ billId: -1 });

module.exports = mongoose.model('Bill', BillSchema);
