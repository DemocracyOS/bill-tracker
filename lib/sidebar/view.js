/**
 * Module dependencies.
 */

var template = require('./template');
var o = require('query');
var log = require('debug')('sidebar:view');
var View = require('view');
var request = require('superagent');
var listItemTemplate = require('./list-item');

/**
 * Expose SidebarView
 */
module.exports = SidebarView;

/**
 * Create Sidebar List view container
 */
function SidebarView() {
  if (!(this instanceof SidebarView)) {
    return new SidebarView();
  }

  View.call(this, template);

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
    listItems.forEach(function (bill) {
      self.createListItem(bill);
    });
  });
};

/**
 *
 */
SidebarView.prototype.createListItem = function (item) {
  this.el.append(listItemTemplate({item: item}));
};
