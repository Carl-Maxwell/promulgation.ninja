Promulgation.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],
  tagName: "ul",
  className: "navbar-center-links",

  initialize: function() {
    Promulgation.router.on('route', this.routerRouted.bind(this));
  },

  routerRouted: function(route, params) {
    var activePage = ['formEdit', 'formShow', 'submissionIndex'].indexOf(route);
    if (!isGuest() && activePage != -1) {
      this.render(params[0], activePage);
    } else {
      this.unrender();
    }
  },

  render: function(id, activePage) {
    this.$el.html(this.template({id: id, activePage: activePage}));

    this.$el.removeClass('borderless');

    return this;
  },

  unrender: function() {
    this.$el.html('');

    this.$el.addClass('borderless');

    return this;
  }
});
