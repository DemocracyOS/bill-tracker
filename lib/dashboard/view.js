/**
 * Module dependencies.
 */
var template = require('./template');
var View = require('view');
var request = require('superagent');
var itemTemplate = require('./item');
var ripple = require('ripple');
var Proposer = require('proposer');
var t = require('t');
var query = require('query');
var clamp = require('clampjs');

/**
 * Create Dashboard List view container
 */
function Dashboard() {
  if (!(this instanceof Dashboard)) {
    return new Dashboard();
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
View(Dashboard);

/**
 * Load the whole model for fill the sidebar.
 */
Dashboard.prototype.loadItems = function () {
  var billUrl = '/api/bill/small/all/';
  var self = this;
  //TODO: remove the api call, and move to homeview.
  request.get(billUrl).end(function (res) {
    var listItems = res.body;
    listItems.forEach(function (bill, index) {
      bill.index = index;
      self.items.push(bill);
      self.createDashboardItem(bill);
    });
  });
};

/**
 * From some model create the list element.
 * And bind click action
 *
 * @param {Object} item a model with the attributes to be created
 */
Dashboard.prototype.createDashboardItem = function (item) {
  var Template = ripple(itemTemplate());
  var self = this;
  Template.directive('click-at', function (index, el, view) {
    el.addEventListener('click', function () {
      self.clickAt(index);
    });
  });

  item.enter = t('See-this');
  item.image = 'imageUrl';
  var itemView = new Template(item);
  this.el.append(itemView.el);

  //Add author in the dashboard items.
  item.authors.forEach(function (author) {
    author.authorTitle = t("proposed-by");
    var proposerView = new Proposer(author);
    var authorWrapper = query('.author-wrapper', itemView.el);
    authorWrapper.appendChild(proposerView.el);
  });
  clamp(query('.description', itemView.el), {clamp: '160px' });
};

/**
 * Trigger the event sidebar:click-at when the user click on
 * some element of the list.
 */
Dashboard.prototype.clickAt = function (index) {
  var reduceBill = this.items[index];
  this.emit('dashboard:click-at', reduceBill.billId);
};

/**
 * Expose Dashboard
 */
module.exports = Dashboard;
