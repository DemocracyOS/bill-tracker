var View = require('view');
var template = require('./template');
var changeTemplate = require('./change');
var SideView = require('side-view');
var ripple = require('ripple');

function TextSection(paragraph) {

  if (!this instanceof TextSection) {
    return new TextSection(paragraph);
  }

  View.call(this, template);
  this.createSection(paragraph);
}

View(TextSection);

/**
 *  Add/remove class to highlight changes.
 */
TextSection.prototype.toggleChanges = function () {
  if (this.el.hasClass('changes')) {
    this.el.removeClass('changes');
    this.emit('section:side-view:hide');
  } else {
    this.el.addClass('changes');
    this.emit('section:side-view:show');
  }
};

/**
 * This fill the section from the phagraph model.
 */
TextSection.prototype.createSection = function (paragraph) {
  var self = this;
  if (paragraph.mainChanges.length) {
    paragraph.mainChanges.forEach(function (change) {
      var aChangeTemplate = ripple(changeTemplate());
      var changeView = new aChangeTemplate(change);
      self.el.append(changeView.el);
    });
  } else {
    this.el.text(paragraph.current);
  }

  // To show only if there are some change.
  //FIXME: this shouldn't be a filter function
  var changes = paragraph.diff.changes.filter(function (element) {
    return 'unchange' !== element.type;
  });
  //Fixme: refactor this weird relations
  if (changes.length) {
    var sideView = new SideView(paragraph.sideChanges);
    this.el.append(sideView.el);
    sideView.bindActions(function () {
      sideView.toggle();
      self.toggleChanges();
    });
  }
};

module.exports = TextSection;


