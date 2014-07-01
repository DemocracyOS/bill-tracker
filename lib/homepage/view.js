/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');

/**
 * Expose HomepageView
 */

module.exports = HomepageView;

/**
 * Creates `HomepageView`
 */
function HomepageView() {
  if (!(this instanceof HomepageView)) {
    return new HomepageView();
  };

  View.call(this, template);
}

/**
 * Inherit from View
 */

View(HomepageView);