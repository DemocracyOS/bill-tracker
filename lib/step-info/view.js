var View = require('view');
var template = require('./template');
var memberTemplate = require('./memberTemplate');
var dom = require('dom');

var ripple = require('ripple');

function StepInfo() {
  if (!this instanceof StepInfo) {
    return new StepInfo();
  }
  View.call(this, template);
}

View(StepInfo);


StepInfo.prototype.loadData = function (step) {
  var metadataTemplate = ripple(memberTemplate());
  var metadata = step.metadata;
  var self = this;

  //Empty previous data.
  self.el.html('');

  metadata.members.forEach(function (member) {
    var view = new metadataTemplate(member);
    self.el.append(view.el);
  });
};

module.exports = StepInfo;