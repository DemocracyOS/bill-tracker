/**
 * Module dependencies.
 */

var page = require('page');
var HomepageView = require('./view');

page('/', function(ctx, next) {
  var container = document.querySelector('section.site-content');

  var view = new HomepageView();
  view.replace('section.site-content');
});