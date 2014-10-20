var View = require('view');
var template = require('./template');
var content = require('./content');
var request = require('superagent');
var ripple = require('ripple');
var emitter = require('emitter');

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
  } else {
    this.attachedView.set('status', 'hidden');
  }

};

SideView.prototype.addContent = function (text) {

  var Template = ripple(content());
  var self = this;
  var status = 'hidden'; //Initial status

  Template.directive('click-at', function (index, el, view) {
    el.addEventListener('click', function () {
      self.toggle(view);
    });
  });

  this.attachedView = new Template({
      text: text
    , status: status
  });

  this.el.append(this.attachedView.el);
};