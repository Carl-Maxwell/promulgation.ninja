Promulgation.Views.Navbar = Backbone.View.extend({
  template: JST['navbar'],
  tagName: "ul",
  className: "navbar-center-links",

  initialize: function() {
    Promulgation.router.on('route', this.routerRouted.bind(this));
  },

  routerRouted: function(route, params) {
    var activePage = ['formEdit', 'formShow', 'submissionIndex'].indexOf(route);
    if (activePage != -1) {
      this.render(params[0], activePage);
    }
  },

  render: function(id, activePage) {
    this.$el.html(this.template({id: id, activePage: activePage}));

    return this;
  }
});
