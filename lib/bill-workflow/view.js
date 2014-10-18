var View = require('view');
var template = require('./template');
var dom = require('dom');
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
}

View(WorkflowView);

/**
 * Click over some step to set active.
 * @param {Object} el Dom node.
 * @param {Object} step Step data.
 * @param {Object} prevStep previous step
 */
WorkflowView.prototype.onClickStep = function (el, step, prevStep) {
  var steps = {
    step: step,
    previousStep: prevStep
  };

  this.el.find('li').removeClass('selected');
  dom(el).addClass('selected');
  this.emit('step change', steps);
};

/**
 * Request for steps of some bill and fill template with data.
 * .
 * @param {String} billId Bill id to request steps.
 */
WorkflowView.prototype.loadSteps = function (billId) {
  var billUrl = '/api/bill/' + billId +  '/step/all';
  var self = this;

  //FIXME: This should be remove on empty
  this.el.find('ul').empty();

  request.get(billUrl).end(function (res) {
    var steps = res.body;
    steps.forEach(function (step, index) {
      self.createStepView(step, steps[index - 1]);
    });

    //FIXME: this trigger the click on the first load.
    //The view should came with the element flag as "current"
    var el = self.el.find('li')[0];
    self.onClickStep(el,steps[0],null);
  });
};

/**
 * Create view and bind events in StepView from step data
 * @param {Object} step current step
 * @param {Object} prevStep Previous step
 */
WorkflowView.prototype.createStepView = function (step, prevStep) {
  var Template = ripple('<li on-click="{{number}}">' +
    '<i class="fa fa-file-text"></i>' +
    '<p class="date">{{arriveAt}}</p>' +
    '<p class="title">{{name}}</p>' +
  '</li>');

  var self = this;
  Template.directive('on-click', function (number, el, view) {
    el.addEventListener('click', function () {
      self.onClickStep(el, step, prevStep);
    });
  });

  step.arriveAt = moment(step.arriveAt).format("DD-MM-YYYY");
  var stepTemplate = new Template(step);
  stepTemplate.appendTo('.frame ul');
};
