Promulgation.Models.SubmissionField = Backbone.Model.extend({
  urlRoot: "/api/submission_fields",

  // belongs_to :submission

  submission: function() {
    return this.collection.submission;
  },

  //belongs_to :form, through: :submission, source: :form

  form: function() {
    return this.submission().form();
  },

  // belongs_to :field

  field: function() {
    var fields = this.collection.submission.fields();

    if (fields) return fields.get(this.get('field_id'));

    return undefined;
  },
});
