var View = require('view');
var template = require('./template');
var changeTemplate = require('./change');
var content = require('./content');
var ripple = require('ripple');
var dom = require('dom');

function SideView(changes) {
  if (!this instanceof SideView) {
    return new SideView(changes);
  }

  View.call(this, template);
  this.status = 'hidden';
  this.attachedView = {};
  this.diff = changes;
}

//TODO: maybe should remove the dependency of Global view, and use as ripple view.
View(SideView);

SideView.prototype.toggle = function () {
  var viewStatus = this.attachedView.get('status');
  if ('hidden' === viewStatus) {
    this.attachedView.set('status', 'visible');
  } else {
    this.attachedView.set('status', 'hidden');
  }
};

SideView.prototype.bindActions = function (callback) {
  var Template = ripple(content());
  var status = 'hidden'; //Initial status

  Template.directive('click-at', function (index, el, view) {
    el.addEventListener('click', callback);
  });

  this.attachedView = new Template({
    status: status
  });

  this.el.append(this.attachedView.el);
  this.addChanges();
};

SideView.prototype.addChanges = function () {
  var self = this;
  this.diff.forEach(function (change) {
    var changeView = ripple(changeTemplate());
    var changeHtml = new changeView(change);
    dom('.text', self.attachedView.el).append(changeHtml.el);
  });
};

module.exports = SideView;
