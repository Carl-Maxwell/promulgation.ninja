Promulgation.Models.SubmissionField = Backbone.Model.extend({
  urlRoot: "/api/submission_fields",

  // belongs_to :field

  field: function() {
    var fields = this.collection.submission.fields();

    if (fields) return fields.get(this.get('field_id'));

    return undefined;
  },
});
