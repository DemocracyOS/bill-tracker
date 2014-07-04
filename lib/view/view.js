/**
 * Module dependencies.
 */

var dom = require('dom');
var empty = require('empty');
var Emitter = require('emitter');
var inherit = require('inherit');
var o = require('query')
var render = require('render');

/**
 * Expose View
 */

module.exports = View;

/**
 * Create View class
 */

function View(template, locals) {
  if (!(this instanceof View))
    return inherit(template, View);
  
  Emitter.call(this);
  this.template = template;
  this.locals = locals || {};
  this.build();
}


inherit(View, Emitter);

/**
 * Build view's `el`
 */

 View.prototype.build = function() {
   this.el = dom(render.dom(this.template, this.locals));
 };

 /**
 * Renders to provided `el`
 * or delivers view's `el`
 *
 * @param {Element} el
 * @return {LawForm|Element}
 * @api public
 */

View.prototype.render = function(el) {
  return this.el;
};

/**
 * Replace `el` content
 * with View's `el`
 */

View.prototype.replace = function(el) {
  // if string, then query element
  if ('string' === typeof el) {
    el = o(el);
  }

  this.wrapper = dom(el);
  return this.refresh();
};

/**
 * Render `this.el` inside
 * an empty `this.wrapper`
 */
View.prototype.refresh = function() {
  this.wrapper.empty().append(this.render());
  return this;
};