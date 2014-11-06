var jsdiff = require('jsdiff');

/**
 * Utility to transform from {StepSchema} to {TextSection}.
 *
 * Waiting for a better name.
 * As additional type, this constructor is also an Autobot.
 * (Desepticons not allowed)
 *
 * @returns {BillTransformer}
 * @constructor
 */
function BillTransformer() {
  if (!this instanceof BillTransformer) {
    return new BillTransformer();
  }
}

/**
 * Model for each bill's section.
 *
 * @param current
 * @param diff
 * @constructor
 */
function TextSection(current, diff) {
  this.current = current || '';
  this.diff = diff || { changes: [] };
}

/**
 * Apply the transform from the {StepSchema} to {BillTransformer}
 *
 * @param {StepSchema} currentStep The current step. can't be null.
 *
 * @returns {TextSection[]}
 */
BillTransformer.prototype.transformToSection = function (currentStep) {
  var textSections = [];
  var paragraphClauses = [];
  textSections.push(new TextSection(currentStep.billText.mediaTitle));
  textSections.push(new TextSection(currentStep.billText.summary));

  //Transform each clause in to TextSection.
  paragraphClauses = currentStep.billText.clauses.map(function (clause) {
    return new TextSection(clause.clauseName + "\n" +  clause.text);
  });

  //Merge and return each section
  return textSections.concat(paragraphClauses);
};

/**
 *
 * @param {BillTransformer} currentSection. can't be null.
 * @param {BillTransformer} previousSection. can't be null.
 *
 * @returns {BillTransformer} current step.
 */
BillTransformer.prototype.calculateDiff = function (currentSection, previousSection) {
  // if is the step 1, this shouldn't compare.
  var maxLength = currentSection.length;

  for (var i=0; i<maxLength; i++) {
    var old = previousSection[i];
    var current = currentSection[i];
    var diff = jsdiff.diffLines(old.current, current.current);
    var changes = diff.map(function (change) {
      var currentType = "";

      //TODO: should handle add  and change?
      if (change.removed) {
        currentType = 'remove';
      } else {
        currentType = 'unchange';
      }
      return {
          type: currentType
        , text: change.value
      }
    });
    currentSection[i].diff = { changes: changes}
  }
  return currentSection;
};

module.exports = BillTransformer;
