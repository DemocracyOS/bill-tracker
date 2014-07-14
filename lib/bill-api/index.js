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
    //if (err) return next(err);
    res.json(billDoc);
    log('Create %s', billDoc);
    return req.body;
  });
});

app.get("/all", function(req, res, next) {

});

app.get("/:id", function(req, res, next) {

});

app.get("/:id/step/all", function(req, res, next) {

});

app.get("/:id/step/current", function(req, res, next) {

});

app.get("/:id/step/previous", function(req, res, next) {

});

app.get("/:id/step/:number", function(req, res, next) {

});
