var View = require('view');
var template = require('./template');
var dom = require('dom');
var BillTransformer = require('./BillSection');
var TextSection = require('text-section');
var move = require('move');

function DiffView() {
  if (!this instanceof DiffView) {
    return new DiffView();
  }

  View.call(this, template);
  this.sections = [];
}

module.exports = DiffView;

View(DiffView);

/**
 * Change bill content for the moment only when click in some step.
 *
 * @param {StepSchema} currentStep The Step Schema to show up in the view.
 * @param {StepSchema} previousStep Previous Step for calculateDiff difference.
 */
DiffView.prototype.changeBillContent = function (currentStep, previousStep) {
  //TODO: the only purpose of have 2 steps in the same view, is to be compare them.
  // Maybe this should be resolved outside of this view.
  //Here should append the current text, and anchor the differences, calculated.

  var section = new BillTransformer();
  var currentParagraph = section.transformToSection(currentStep);
  if (previousStep) {
    var previousParagraph = section.transformToSection(previousStep);
    currentParagraph = section.calculateDiff(currentParagraph, previousParagraph);
  }

  this.showBillText(currentParagraph);
};

/**
 * Move the main text to the left.
 */
DiffView.prototype.collapseLeftText = function () {
  move('#bill-diff .text')
      .to(-250, 0)
      .duration('1.0s')
      .end();
  dom('#bill-diff .text p').addClass('low-point');
};

/**
 * Center the main text in the middle of the screen
 */
DiffView.prototype.centerText = function () {
  move('#bill-diff .text')
      .to(0, 0)
      .duration('1.0s')
      .end();
  dom('#bill-diff .text p').removeClass('low-point');
};

/**
 * Convert the model called 'paragraphs to html for show on the template.
 *
 * @param paragraphs
 */
DiffView.prototype.showBillText = function (paragraphs) {
  var textContainer = dom('#bill-diff .text');
  var self = this;
   textContainer.text('');   //Clean up the text container.

  paragraphs.forEach(function (paragraph) {
    var section = new TextSection(paragraph);
    section.on('section:side-view:hide', self.centerText.bind(self));
    section.on('section:side-view:show', self.collapseLeftText.bind(self));
    textContainer.append(section.el);
  });
};
