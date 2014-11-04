var View = require('view');
var template = require('./template');
var header = require('./header');
var dom = require('dom');
var request = require('superagent');
var ripple = require('ripple');
var each = require('each');

module.exports = BillView;

function BillView() {
  if (!this instanceof BillView) {
    return new BillView();
  }

  View.call(this, template);
}

View(BillView);

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
  var Template = ripple(header());
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