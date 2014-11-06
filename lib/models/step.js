/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */
require('node-path')(module);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Step Schema
 * @type {Schema}
 */
StepSchema = new Schema({
    number : { type: Number, required: true, default: 0 }
  , arriveAt : { type: Date, default: Date.now }
});
