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
    if (!this.className) this.$el.css('background', 'pink');

    return _.result(this, 'className').split(' ').indexOf(selector) != -1;
  }
};

Backbone.View = Backbone.View.extend(ViewDOM);
