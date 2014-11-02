function BillToText() {
  if (!this instanceof BillToText) {
    return new BillToText();
  }
}

module.exports = new BillToText();

BillToText.prototype.toText = function (billText) {
  var billPlainText = "";
  var self = this;

  billPlainText += billText.officialTitle + "\n";
  billPlainText += billText.mediaTitle + "\n";
  billPlainText += billText.summary + "\n";

  billText.clauses.forEach(function (clause) {
    billPlainText += self.clauseToText(clause) + "\n\n";
  });

  return billPlainText;
};

BillToText.prototype.clauseToText = function(clause) {
  return clause.clauseName + "\n" +  clause.text;
};

//TODO: this should be remove to other object. and this constructor deleted.
BillToText.prototype.transformToParagraph = function (currentStep) {
  var paragraphs = [{
      current: currentStep.billText.mediaTitle,
      diff: { changes: []}
    }, {
      current: currentStep.billText.summary,
      diff: { changes: []}
    }];
  var pagraphClauses = currentStep.billText.clauses.map(function (clause) {
    return {
      current: clause.clauseName + "\n" +  clause.text
      , diff: { changes: []}
    }
  });
  paragraphs = paragraphs.concat(pagraphClauses);

  return paragraphs;
};