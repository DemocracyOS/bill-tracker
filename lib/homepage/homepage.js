/**
 * Module dependencies.
 */

var page = require('page');
var empty = require('empty');
var splash = require('./splash');
var render = require('render');

page('/', function(ctx, next) {
  var container = document.querySelector('section.site-content');

  empty(container)
    .appendChild(render.dom(splash));
});