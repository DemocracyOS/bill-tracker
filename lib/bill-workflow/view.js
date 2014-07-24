var View = require('view');
var template = require('./template');
var dom = require('dom');
var closest = require('closest');
var Emitter = require('emitter');
var request = require('superagent');
var ripple = require('ripple');

module.exports = WorkflowView;

function WorkflowView() {
  if (!this instanceof WorkflowView) {
    return new WorkflowView();
  }

  View.call(this, template);
  //TODO: remove hardcode bill id.
  this.loadSteps('1');
  this.el.on('click', '.hexagon', this.onClickStep.bind(this));
}

View(WorkflowView);

/**
 * Click over some step to set active.
 */
WorkflowView.prototype.onClickStep = function (e) {
  var step = {
    index: 1,
    billVersion: 1
  };

  this.el.find('.hexagon').removeClass('selected');
  var hexagon = dom(e.delegateTarget || closest(e.target, '.hexagon'));
  hexagon.addClass('selected');
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
 * Create a step view from step data
 * @param {Object} step
 */
WorkflowView.prototype.createStepView = function (step) {
  var Template = ripple('<li>' +
    '<p class="date">{{arriveAt}}</p>' +
    '<div class="hexagon">' +
      '<i class="fa fa-file-text"></i>' +
    '</div>' +
    '<p class="title">{{name}}</p>');
    //TODO: add steps name to the model data.
  var stepTemplate = new Template(step);
  dom('#workflow-container ol').append(stepTemplate.el);
};
