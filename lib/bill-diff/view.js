var View = require('view');
var template = require('./template');
var dom = require('dom');
var request = require('superagent');

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
  dom('#bill-diff .text').text(step.text);
};

/**
 * Show step text
 *
 * @param {string} textStep
 */
DiffView.prototype.showStepText = function (textStep) {
  var textEl = dom('<div class="text">').text(textStep);
  dom('#bill-diff').append(textEl);
};
