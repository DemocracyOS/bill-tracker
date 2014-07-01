/**
 * Module dependencies.
 */

var translations = require('translations');
var t = require('t');
var page = require('page');
var user = require('user');
var config = require('config');

/**
 * Load localization dictionaries to translation application
 */

translations.help(t);

/**
 * Init `t` component with locale as `es`
 */

t.lang(config['locale']);

/**
 * Boot components
 * and pages.
 */

require('homepage');

/**
 * Boot page.js
 */

page();