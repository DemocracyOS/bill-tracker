/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');
var WorkflowView = require('bill-workflow');
var DiffView = require('bill-diff');
var BillView = require('bill-view');

/**
 * Expose HomepageView
 */

module.exports = HomepageView;

/**
 * Creates `HomepageView`
 */
function HomepageView() {
  if (!(this instanceof HomepageView)) {
    return new HomepageView();
  }

  View.call(this, template);

  var billView = new BillView();
  this.el.append(billView.el);

  var workflowView = new WorkflowView();
  this.el.append(workflowView.el);

  var diffView = new DiffView();
  this.el.append(diffView.el);
  workflowView.on('step change', diffView.changeBillContent);
}

/**
 * Inherit from View
 */

View(HomepageView);
