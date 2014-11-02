var jsdiff = require('jsdiff');

module.exports = CalculateBillDiff;

function CalculateBillDiff () {
  if (!this instanceof CalculateBillDiff) {
    return new CalculateBillDiff();
  }
}

//TODO: this should be maged with to pharagrap on BillToText
CalculateBillDiff.prototype.calculate = function (currentParagraph, previusParagraph) {
  var result = [];

  // if is the step 1, this shouldn't compare.
  if (!previusParagraph) {
    previusParagraph = currentParagraph;
  }
  var maxLength = currentParagraph.length;

  for (var i=0; i<maxLength; i++) {
    var old = previusParagraph[i];
    var current = currentParagraph[i];
    var diff = jsdiff.diffLines(old.current, current.current);
    var changes = diff.map(function (change) {
      var currentType = "";

      if (change.removed)
        currentType = 'remove';
      else
        currentType = 'unchange';
      return {
          type: currentType
        , text: change.value
      }
    });
    currentParagraph[i].diff = { changes: changes}
  }

  return currentParagraph;
};