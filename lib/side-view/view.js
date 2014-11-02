var View = require('view');
var template = require('./template');
var content = require('./content');
var ripple = require('ripple');
var dom = require('dom');

module.exports = SideView;

function SideView() {
  if (!this instanceof SideView) {
    return new SideView();
  }

  View.call(this, template);
  this.status = 'hidden';
  this.attachedView = {};
}

View(SideView);

SideView.prototype.toggle = function () {
  var viewStatus = this.attachedView.get('status');
  if ('hidden' === viewStatus) {
    this.attachedView.set('status', 'visible');
    this.emit('sidebar-status:visible');
  } else {
    this.attachedView.set('status', 'hidden');
    this.emit('sidebar-status:hidden');
  }
};

SideView.prototype.addContent = function () {

  var Template = ripple(content());
  var self = this;
  var status = 'hidden'; //Initial status

  Template.directive('click-at', function (index, el, view) {
    el.addEventListener('click', function () {
      self.toggle(view);
    });
  });

  this.attachedView = new Template({
    status: status
  });

  this.el.append(this.attachedView.el);
};

SideView.prototype.addChanges = function (diff) {
  var self = this;
  self.addContent();
  //TODO: this must replace with ripple template
  diff.changes.forEach(function (change) {
    var changeHtml = dom('<span class="' + change.type + '">' +  change.text + '</span>');
    dom('.text', self.attachedView.el).append(changeHtml);
  });
};