Promulgation.Collections.Submissions = Backbone.Collection.extend({
  url: "/api/submissions",
  model: Promulgation.Models.Submission,

  getOrFetch: function (id) {
    var collection = this;
    var model = collection.get(id);

    if (model) {
      model.fetch();
    } else {
      model = new collection.model({ id: id });
      collection.add(model);
      model.fetch({
        error: function () { collection.remove(model); }
      });
    }

    return model;
  },

  fetchBySlug: function (slug, options) {
    this.fetch({
      url: 'api/forms/' + slug + '/submissions/',
      success: function() {
        options.success.apply(this, arguments);
      }
    });
  }
});
