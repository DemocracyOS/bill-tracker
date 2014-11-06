/**
 * Module dependencies.
 */

var page = require('page');
var HomepageView = require('./view');

page('/', function(ctx, next) {

  var view = new HomepageView();
  view.replace('body');
});