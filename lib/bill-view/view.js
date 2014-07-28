var View = require('view');
var template = require('./template');
var dom = require('dom');
var request = require('superagent');
var ripple = require('ripple');
var moment = require('moment');

module.exports = BillView;

function BillView() {
  if (!this instanceof BillView) {
    return new BillView();
  }

  View.call(this, template);
  //TODO: remove harcode bill
  this.loadBill('1');
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
  var Template = ripple('<div>' +
    '<h1>{{name}}</h1>' +
    '<h5>bill s number: {{billId}}</h5>' +
    '<p>{{description}}</p>' +
    '<p>Started: {{startedAt}}</p>  ' +
    '<p>Finish: {{finishedAt}}</p>' +
  '</div>');

  bill.startedAt = moment(bill.startedAt).format("DD-MM-YYYY");
  bill.finishedAt = moment(bill.finishedAt).format("DD-MM-YYYY");

  var billTemplate = new Template(bill);
  dom('#bill-container').append(billTemplate.el);
};
