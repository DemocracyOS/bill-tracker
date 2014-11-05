var View = require('view');
var template = require('./template');
var dom = require('dom');
var SideView = require('side-view');
var BillTransformer = require('./BillSection');

function DiffView() {
  if (!this instanceof DiffView) {
    return new DiffView();
  }

  View.call(this, template);
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


DiffView.prototype.collapseLeft = function () {
  dom('#bill-diff .text').addClass('collapse');
  dom('#bill-diff .text p').addClass('low-point');
};

DiffView.prototype.center = function () {
  dom('#bill-diff .text p').removeClass('low-point');
  dom('#bill-diff .text').removeClass('collapse');
};

/**
 * Convert the model called 'paragraphs to html for show on the template.
 *
 * @param paragraphs
 */
DiffView.prototype.showBillText = function (paragraphs) {
  var textContainer = dom('#bill-diff .text');
  var self = this;
  textContainer.text('');   // Clean up the text container.

  paragraphs.forEach(function (paragraph) {
    var template = dom("<p>" + paragraph.current + "</p>");

    // To show only if there are some change.
    var changes = paragraph.diff.changes.filter(function (element) {
      return  'unchange' !== element.type;
    });
    if (changes.length) {
      var sideView = new SideView();
      sideView.addChanges(paragraph.diff);
      sideView.addContainer(template);
      sideView.on('sidebar-status:visible', self.collapseLeft.bind(self));
      sideView.on('sidebar-status:hidden', self.center.bind(self));
    }

    textContainer.append(template);
  });
};
