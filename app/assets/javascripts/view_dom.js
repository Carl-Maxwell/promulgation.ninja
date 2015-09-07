window.ViewDOM = {
  viewQuery: function(selector) {
    if (this.is(selector)) {
      return this;
    }

    if (!this.eachSubview) return undefined;

    return this.findSubview(function(subview) {
      return subview.viewQuery(selector);
    });
  },
  is: function(selector) {
    classNames = _.result(this, 'className').split(' ');

    if (typeof selector != 'function') {
      return classNames.indexOf(selector) != -1;
    } else {
      return selector.call(this, classNames);
    }
  }
};

Backbone.View = Backbone.View.extend(ViewDOM);
