Promulgation.Collections.Forms = Backbone.Collection.extend({
  url: "/api/forms",
  model: Promulgation.Models.Form,

  getOrFetch: function (id, dataOptions) {
    dataOptions = dataOptions || {};

    var collection = this;
    var model = collection.get(id);

    if (model) {
      model.fetch({
        data: dataOptions
      });
    } else {
      model = new collection.model();

      var opts = {};
      opts[_.result(model, 'idAttribute')] = id;
      model.set(opts);
      collection.add(model);

      model.fetch({
        data: dataOptions,
        error: function () { collection.remove(model); }
      });
    }

    return model;
  }
});
