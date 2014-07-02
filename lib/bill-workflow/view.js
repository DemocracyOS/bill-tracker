var View = require('view');
var template = require('./template');


module.exports = WorkflowView;

function WorkflowView() {
  if (!this instanceof WorkflowView) {
    return new WorkflowView();
  }

  View.call(this, template);
}

View(WorkflowView);