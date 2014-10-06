var View = require('view');
var template = require('./template');
var dom = require('dom');
var request = require('superagent');
var ripple = require('ripple');
var moment = require('moment');
var each = require('each');

module.exports = BillView;

function BillView() {
  if (!this instanceof BillView) {
    return new BillView();
  }

  View.call(this, template);
}

View(BillView);

//TODO: special fix for load bills of the sidebar, this should be load once.
// as model, and send to renter over the views.
BillView.prototype.loadBillFromSidebar = function (bill) {
  this.loadBill(bill.billId);
};

/**
 * Request from .
 * @param {String} billId Bill id to request steps.
 */
BillView.prototype.loadBill = function (billId) {
  var billUrl = '/api/bill/' + billId;
  var self = this;
  request.get(billUrl).end(function (res) {
    var bill = res.body;
    self.createBillView(bill);
  });
};

/**
 * Create a Bill view from bill s data
 * @param {Object} bill
 */
BillView.prototype.createBillView = function (bill) {
  var Template = ripple('<div>' +
    '<h1>{{name}}</h1>' +
    '<h5>bill s number: {{billId}}</h5>' +
    '<p>{{description}}</p>' +
    '<p>Started: {{startedAt}}</p>  ' +
    '<p>Finish: {{finishedAt}}</p>' +
    '<p>Voted at: {{votedAt}}</p>' +
    '<p>Due date: {{dueAt}}</p>' +
    '<ul class="authors"></ul>' +
  '</div>');

  bill.startedAt = moment(bill.startedAt).format("DD-MM-YYYY");
  bill.finishedAt = moment(bill.finishedAt).format("DD-MM-YYYY");
  bill.dueAt = moment(bill.dueAt).format("DD-MM-YYYY");
  bill.votedAt = moment(bill.votedAt).format("DD-MM-YYYY");

  var billTemplate = new Template(bill);
  //FIXME: this should be fixed with ripple template instead of add/remove mechanism.
  this.el.empty();
  this.el.append(billTemplate.el);

  var self = this;
  bill.authors.forEach(function (author) {
    self.addAuthors(author);
  });

};

/**
 * Append authors of the bill to the current bill view.
 * @param author
 * TODO: replace by 'each' ripple plugin.
 */
BillView.prototype.addAuthors = function (author) {
  var Template = ripple('<li >' +
        '<p>{{name}}</p>' +
        '<p>{{description}}</p>' +
      '</li>');

  var authorTemplate = new Template(author);
  dom('#bill-container .authors').append(authorTemplate.el);
};