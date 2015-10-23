Promulgation.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],
  tagName: "ul",
  className: "navbar-center-links",

  initialize: function() {
    Promulgation.router.on('route', this.route.bind(this));
  },

  route: function(route, params) {
    var activePage = ['formEdit', 'formShow', 'submissionIndex'].indexOf(route);

    var form = Promulgation.view.model;

    if (!isGuest() && activePage != -1) {
      if (form.isPublished()) {
        this.render(params[0], activePage, form.get('submission_count'));
      } else {
        this.unrender();
        form.once('sync', this.route.bind(this, route, params));
      }
    } else {
      this.unrender();
    }
  },

  render: function(id, activePage, submissionCount) {
    this.$el.html(this.template({
      id: id,
      activePage: activePage,
      submissionCount: submissionCount
    }));

    this.$el.removeClass('borderless');

    return this;
  },

  unrender: function() {
    this.$el.html('');

    this.$el.addClass('borderless');

    return this;
  }
});
