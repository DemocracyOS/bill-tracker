/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var lorem = require('lorem-ipsum');

app.get("/", function(req, res, next) {
  var options = {
    units:'paragraphs',
    count: '10'
  };
  res.send(lorem(options));
});

