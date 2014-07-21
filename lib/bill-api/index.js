var express = require('express');
var api = require('lib/db-api');
var log = require('debug')('billtracker:bill-api:bill');

var app = module.exports = express();

/**
 * Create Bills
 */
app.post('/create', function (req, res, next) {
  log('Request /bill/create %j', req.body);

  api.bill.create(req.body, function (err, billDoc) {
    log('Create %s', billDoc);
    return res.json(billDoc);
  });
});

/**
 * Get all available bills
 */
app.get("/all", function(req, res, next) {

  api.bill.all(function (err, billDocs) {
    if (!billDocs) return res.send(404);
    log('Serving Bill %s', billDocs.billId);
    var keys = [
      'id name billId description',
      'status startedAt',
      'finishedAt steps'
    ].join(' ');
    res.json(billDocs);
  });

});

/**
 * Get bill by id.
 */
app.get("/:id", function(req, res, next) {

  api.bill.get(req.params.id, function (err, billDoc) {

    if (!billDoc) return res.send(404);
    log('Serving Bill %s', billDoc.billId);
    var keys = [
      'id name billId description',
      'status startedAt',
      'finishedAt steps'
    ].join(' ');

    res.json(billDoc.toJSON());
  });
});

/**
 * Delete specific bill.
 */
app.post("/delete/:id", function(req, res, next) {
//TBD
});

//Steps api.
app.get("/:id/step/all", function(req, res, next) {
  api.bill.getSteps(req.params.id, function (err, currentBill) {
    if (!currentBill) return res.send(404);
    log('Serving Bills %s Step %d', currentBill.billId);
    var keys = [
      'steps'
    ].join(' ');
    res.json(currentBill);
  });
});

app.get("/:id/step/current", function(req, res, next) {
//TBD
});

app.get("/:id/step/previous", function(req, res, next) {
//TBD
});

/**
 * Obtain specific step number of some bill.
 */
app.get("/:id/step/:number", function(req, res, next) {
  api.bill.getStepByNumber(req.params.id, req.params.number, function (err, currentStep) {
    if (!currentStep) return res.send(404);
    log('Serving Bills %s Step %d', req.params.id, currentStep.number);
    var keys = [
      'billId steps'
    ].join(' ');
    res.json(currentStep);
  });
});
