Promulgation.Collections.SubmissionFields = Backbone.Collection.extend({
  url: "/api/submission_fields",
  model: Promulgation.Models.SubmissionField,

  comparator: function(a, b) {
    var aField = a.field();
    var bField = b.field();

    if (aField && bField) {
      return Math.sign(aField.get('ord') - bField.get('ord'));
    } else {
      return 0;
    }
  },

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

});
