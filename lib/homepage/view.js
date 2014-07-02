/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');
var WorkflowView = require('bill-workflow');

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
}

/**
 * Inherit from View
 */

View(HomepageView);