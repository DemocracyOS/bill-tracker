/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');
var WorkflowView = require('bill-workflow');
var DiffView = require('bill-diff');
var BillView = require('bill-view');
var Dashboard = require('dashboard');

/**
 * Creates `HomepageView`
 */
function HomepageView() {
  if (!(this instanceof HomepageView)) {
    return new HomepageView();
  }

  View.call(this, template);
  this.appendElementsToMainView();
}

/**
 * Inherit from View
 */
View(HomepageView);


HomepageView.prototype.appendElementsToMainView = function () {
  var mainView =  this.el.find('section.site-content #homepage');

  this.dashboard = new Dashboard();
  mainView.append(this.dashboard.el);

  this.billView = new BillView();
  mainView.append(this.billView.el);

  this.workflowView = new WorkflowView();
  mainView.append(this.workflowView.el);

  this.diffView = new DiffView();
  mainView.append(this.diffView.el);
  this.workflowView.on('step:change', this.diffView.changeBillContent.bind(this.diffView));

  this.dashboard.on('dashboard:click-at', this.billView.loadBill.bind(this.billView));
  this.dashboard.on('dashboard:click-at', this.workflowView.loadSteps.bind(this.workflowView));
  this.dashboard.on('dashboard:click-at', this.toggleViews.bind(this));

  this.hideBillView();
};

HomepageView.prototype.toggleViews = function () {
  this.dashboard.el.attr('style', 'display:none');
  this.showBill();
};

//Fixme: hide/show should be part of the view. This is a hack.
HomepageView.prototype.hideBillView = function () {
  this.billView.el.attr('style', 'display:none');
  this.workflowView.el.attr('style', 'display:none');
  this.diffView.el.attr('style', 'display:none');
};

HomepageView.prototype.showBill = function () {
  this.billView.el.attr('style', '');
  this.workflowView.el.attr('style', '');
  this.diffView.el.attr('style', '');
};

/**
 * Expose HomepageView
 */
module.exports = HomepageView;
