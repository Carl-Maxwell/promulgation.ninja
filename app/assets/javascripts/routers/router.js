Promulgation.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$el = options.$el;
  },

  routes:{
    "": "formIndex",
    "forms/new": "formNew",
    "forms/:id/edit": "formEdit",
    "forms/:form_id/submissions": ""
  },

  formIndex: function() {
    var view = new Promulgation.Views.FormIndex({
      collection: Promulgation.formsCollection
    });
    this.swap(view);

    Promulgation.formsCollection.fetch();
  },

  formNew: function() {
    var form = new Promulgation.Models.Form();
    var view = new Promulgation.Views.FormNew({
      model: form
    });
    this.swap(view);
  },

  formEdit: function(id) {
    var form = Promulgation.formsCollection.getOrFetch(id);
    var view = new Promulgation.Views.FormEdit({
      model: form
    });
    this.swap(view);
  },

  swap: function(view) {
    if (this._view) this._view.remove();
    this._view = view;
    this.$el.html(view.$el);
    view.render();
  }
});
