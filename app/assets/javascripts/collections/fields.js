Promulgation.Collections.Fields = Backbone.Collection.extend({
  url: "/api/fields",
  model: Promulgation.Models.Field,

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
  }
});
