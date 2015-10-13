Promulgation.Routers.Router = Backbone.Router.extend({
  routes:{
    "": "formIndex",
    "forms/new": "formNew",
    "forms/:id": "formShow",
    "forms/:id/edit": "formEdit",
    "forms/:slug/submissions": "submissionIndex"
  },

  formIndex: function() {
    var view = new Promulgation.Views.FormIndex({
      collection: Promulgation.formsCollection
    });
    Promulgation.swapView(view);

    Promulgation.formsCollection.fetch();
  },

  formNew: function() {
    var form = new Promulgation.Models.Form();
    var view = new Promulgation.Views.FormNew({
      model: form
    });
    Promulgation.swapView(view);
  },

  formEdit: function(id) {
    var form = Promulgation.formsCollection.getOrFetch(id);
    var view = new Promulgation.Views.FormEdit({
      model: form
    });
    Promulgation.swapView(view);
  },

  formShow: function(id) {
    var form = Promulgation.formsCollection.getOrFetch(id);
    var view = new Promulgation.Views.FormShow({
      model: form,
      collection: form.fields()
    });
    Promulgation.swapView(view);
  },

  submissionIndex: function(slug) {
    var form = Promulgation.formsBySlugCollection.getOrFetch(
      slug, {
        slug: slug,
        submissions: true,
        live: true
      });

    var view = new Promulgation.Views.SubmissionIndex({
      model: form,
      collection: form.submissions()
    });

    Promulgation.swapView(view);
  }
});
