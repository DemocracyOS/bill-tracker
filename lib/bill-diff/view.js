var View = require('view');
var template = require('./template');
var dom = require('dom');
var request = require('superagent');

module.exports = DiffView;

function DiffView() {
  if (!this instanceof DiffView) {
    return new DiffView();
  }

  View.call(this, template);
}

View(DiffView);

DiffView.prototype.changeBillContent = function (step) {
  dom('.original').style('display:none;');
  dom('.original').text(step.text);
  dom('#version-' + step.number).style("display:inline-block;");
};
