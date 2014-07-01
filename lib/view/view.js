/**
 * Module dependencies.
 */

var empty = require('empty');
var dom = require('dom');
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

/**
 * Build view's `el`
 */

 View.prototype.build = function() {
   this.el = dom(render.dom(this.template, this.locals))[0];
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
  if (1 === arguments.length) {

    // if string, then query element
    if ('string' === typeof el) {
      el = o(el);
    };

    // if it's not currently inserted
    // at `el`, then append to `el`
    if (el !== this.el.parentNode) {
      empty(el).appendChild(this.el);
    };

    return this;
  };

  return this.el;
};