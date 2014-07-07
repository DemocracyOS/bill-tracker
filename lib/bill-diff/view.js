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
  //TODO: swich the current version of the bill by the version specified in the step.
  dom('.original').style('display:none;');

  request.get('/lorem', function(res) {
    dom('.original').html(res.text);
    console.log('great succes!')
  });

  dom('#version-' + step.billVersion).style("display:inline-block;");
};
