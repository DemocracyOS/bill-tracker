var View = require('view');
var template = require('./template');
var dom = require('dom');
var closest = require('closest');
var Emitter = require('emitter');

module.exports = WorkflowView;

function WorkflowView() {
  if (!this instanceof WorkflowView) {
    return new WorkflowView();
  }

  View.call(this, template);
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

  this.el.find('.small-hexagon').remove();
  var hexagon = e.delegateTarget || closest(e.target, '.hexagon');
  dom('<div class="small-hexagon"><i class="glyphicon glyphicon-file"></i></div>').insertAfter(hexagon)
  this.emit('step change', step)
};
