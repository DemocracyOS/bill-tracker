var View = require('view');
var template = require('./template');
var dom = require('dom');
var request = require('superagent');
var jsdiff = require('jsdiff');
var billToText = require('bill-to-text');

module.exports = DiffView;

function DiffView() {
  if (!this instanceof DiffView) {
    return new DiffView();
  }

  View.call(this, template);
}

View(DiffView);

/**
 * Change bill content for the moment only when click in some step.
 *
 * @param {Object} step the current step
 */
DiffView.prototype.changeBillContent = function (step) {
  var one = dom('#bill-diff .template').text();
  var other = billToText.toText(step.billText);
  var diff = jsdiff.diffWords(one, other);
  dom('#bill-diff .text').text('');
  dom('#bill-diff .template').text(billToText.toText(step.billText));

  diff.forEach(function (part) {
    var aClass = part.added ? 'add' :
          part.removed ? 'remove'
              : 'none';
    var span = dom('<span class="' + aClass + '">');
    span.text(part.value);
    dom('#bill-diff .text').append(span);
  });
};

/**
 * Show step text
 *
 * @param {Object} billText Document saved format as BillText
 * @see {@link BillTextSchema}
 */
DiffView.prototype.showStepText = function (billText) {
  var textEl = dom('<div class="text">').text(billToText.toText(billText));
  dom('#bill-diff .template').text(billToText.toText(billText));
  dom('#bill-diff').append(textEl);
};
