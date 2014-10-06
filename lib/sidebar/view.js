/**
 * Module dependencies.
 */

var template = require('./template');
var o = require('query');
var log = require('debug')('sidebar:view');
var View = require('view');
var request = require('superagent');
var listItemTemplate = require('./list-item');
var ripple = require('ripple');

/**
 * Expose SidebarView
 */
module.exports = SidebarView;
//FIXME: this should be agnostic of template and models and other things

/**
 * Create Sidebar List view container
 */
function SidebarView() {
  if (!(this instanceof SidebarView)) {
    return new SidebarView();
  }

  // Define template
  View.call(this, template);


/**
 * Model of each item on the list.
 * @type {Array}
 */
  this.items = [];

  this.loadItems();
}

//Extend from view.
View(SidebarView);

/**
 * Load the whole model for fill the sidebar.
 */
SidebarView.prototype.loadItems = function () {
  var billUrl = '/api/bill/all';
  var self = this;

  request.get(billUrl).end(function (res) {
    var listItems = res.body;
    listItems.forEach(function (bill, index) {
      bill.index = index;
      self.items.push(bill);
      self.createListItem(bill);
    });
  });
};

/**
 * From some model create the list element.
 * And bind click action
 *
 * @param {Object} item a model with the attributes to be created
 */
SidebarView.prototype.createListItem = function (item) {
  var Template = ripple(listItemTemplate());
  var self = this;

  Template.directive('click-at', function (index, el, view) {
    el.addEventListener('click', function () {
      self.clickAt(index);
    });
  });

  var listItem = new Template(item);
  listItem.appendTo(this.el[0]);
};

/**
 * Trigger the event sidebar:click-at when the user click on
 * some element of the list.
 */
SidebarView.prototype.clickAt = function (index) {
  this.emit('sidebar:click-at', this.items[index]);
};
