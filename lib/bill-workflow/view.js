var View = require('view');
var template = require('./template');
var dom = require('dom');
var closest = require('closest');

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
  this.el.find('.small-hexagon').remove();
  var hexagon = e.delegateTarget || closest(e.target, '.hexagon');
  dom('<div class="small-hexagon"><i class="glyphicon glyphicon-file"></i></div>').insertAfter(hexagon)
};
