var View = require('view');
var template = require('./template');
var dom = require('dom');
var closest = require('closest');
var Emitter = require('emitter');
var request = require('superagent');
var ripple = require('ripple');
var moment = require('moment');

module.exports = WorkflowView;

function WorkflowView() {
  if (!this instanceof WorkflowView) {
    return new WorkflowView();
  }

  View.call(this, template);
  //TODO: remove hardcode bill id.
  this.loadSteps('1');
}

View(WorkflowView);

/**
 * Click over some step to set active.
 * @param {Object} el Dom node.
 * @param {Object} step Step data.
 */
WorkflowView.prototype.onClickStep = function (el, step) {
  this.el.find('li').removeClass('selected');
  dom(el).addClass('selected');
  this.emit('step change', step);
};

/**
 * Request for steps of some bill.
 * @param {String} billId Bill id to request steps.
 */
WorkflowView.prototype.loadSteps = function (billId) {
  var billUrl = '/api/bill/' + billId +  '/step/all';
  var self = this;
  request.get(billUrl).end(function (res) {
    var steps = res.body;
    steps.forEach(function (step) {
      self.createStepView(step);
    });
  });
};

/**
 * Create view and bind events in StepView from step data
 * @param {Object} step
 */
WorkflowView.prototype.createStepView = function (step) {
  var Template = ripple('<li on-click="{{number}}">' +
    '<i class="fa fa-file-text"></i>' +
    '<p class="date">{{arriveAt}}</p>' +
    '<p class="title">{{name}}</p>' +
  '</li>');

  var self = this;
  Template.directive('on-click', function (number, el, view) {
    el.addEventListener('click', function () {
      self.onClickStep(el, step);
    });
  });

  step.arriveAt = moment(step.arriveAt).format("DD-MM-YYYY");
  var stepTemplate = new Template(step);
  stepTemplate.appendTo('.frame ul');
};
