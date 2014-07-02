/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');
var WorkflowView = require('bill-workflow');
var DiffView = require('bill-diff');

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

  var workflowView = new WorkflowView();
  this.el.append(workflowView.el);

  var diffView = new DiffView();
  this.el.append(diffView.el);
}

/**
 * Inherit from View
 */

View(HomepageView);