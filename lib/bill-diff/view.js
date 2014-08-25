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

DiffView.prototype.showDifference = function (diff) {
  dom('#bill-diff .text').text('');
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
 * Change bill content for the moment only when click in some step.
 *
 * @param {Object} steps containt the current step and the previus.
 */
DiffView.prototype.changeBillContent = function (steps) {
//TODO: the only purpose of have 2 steps in the same view, is to be compare them.
//Maybe this should be resolved outside of this view.
  var diff = this.calculateTextDiff(steps.step, steps.previousStep);
  this.showDifference(diff);
};


/**
 * From 2 steps calculate the difference after convert in to plain texts.
 *
 * @param currentStep
 * @param prevStep
 * @returns [Object] a collection of each diff.
 */
DiffView.prototype.calculateTextDiff = function (currentStep, prevStep) {
  //For first step, we don't compare.
  if (!prevStep) {
    prevStep = currentStep;
  }

  var newText = billToText.toText(currentStep.billText);
  var oldText = billToText.toText(prevStep.billText);
  return jsdiff.diffWords(oldText, newText);
};
