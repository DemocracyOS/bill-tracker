/**
 * Module dependencies.
 */

var page = require('page');
var HomepageView = require('./view');
var SidebarView = require('sidebar');

page('/', function(ctx, next) {

  var view = new HomepageView();
  view.replace('section.site-content');

  //Add sidebar to the nav bar.
  var sidebar = new SidebarView();
  sidebar.replace('aside.nav');
});