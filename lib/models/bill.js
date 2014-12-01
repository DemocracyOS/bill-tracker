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

var ClauseSchema = new Schema({
      clauseName: { type: String, required: true }
    , order: { type: Number, required: true, default: 0 }
    , text: { type: String, required: true }
});

var BillTextSchema = new Schema({
  officialTitle: { type: String, required: true }
    , mediaTitle: { type: String, required: true }
    , remoteUri: { type: String, required: true }
    , summary: { type: String, required: true }
    , clauses: [ClauseSchema]
});

//TODO: unify with step.js

/**
 * Step Schema
 * @type {Schema}
 */
var StepSchema = new Schema({
    number: { type: Number, required: true, default: 0 }
  , name: { type: String, required: true }
  , arriveAt : { type: Date, default: Date.now }
  , billText:  { type: Object , ref:"BillTextSchema" }
});

/**
 * Author Schema
 * Represent the participants that impulse the bill.
 * @type {Schema}
 */
var AuthorSchema = new Schema({
      name  : { type: String, required: true }
    , afiliation : { type: String }
    , image : { type: String }
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
  , authors :  [AuthorSchema]
  , steps: [StepSchema]
});

BillSchema.index({ billId: -1 });

module.exports = mongoose.model('Bill', BillSchema);
