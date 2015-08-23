Promulgation.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$el = options.$el;
  },

  routes:{
    "": "formIndex",
    "forms/new": "formNew",
    "forms/:id": "formShow",
    "forms/:id/edit": "formEdit",
    "forms/:form_id/submissions": "submissionIndex"
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

  formShow: function(id) {
    var form = Promulgation.formsCollection.getOrFetch(id);
    var view = new Promulgation.Views.FormShow({
      model: form,
      collection: form.fields()
    });
    this.swap(view);
  },

  submissionIndex: function(form_id) {
    var form = Promulgation.formsCollection.getOrFetch(form_id, {submissions: true});

    var view = new Promulgation.Views.SubmissionIndex({
      model: form,
      collection: form.submissions()
    });

    this.swap(view);
  },

  swap: function(view) {
    if (this._view) this._view.remove();
    this._view = view;
    this.$el.html(view.$el);
    view.render();
    view.onRender && view.onRender();

    $('[autofocus]').first().focus();
  }
});
