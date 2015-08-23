Promulgation.Models.Submission = Backbone.Model.extend({
  urlRoot: "/api/submissions",

  // belongs_to :form

  form: function() {
    return Promulgation.formsCollection.get(this.get('form_id'));
  },

  // has_many :fields, through: form, source: fields

  fields: function() {
    var form = this.form();

    if (form) return form.fields();

    return undefined;
  },

  // has_many :submission_fields

  submissionFields: function() {
    if (!this._submissionFields) {
      this._submissionFields = new Promulgation.Collections.SubmissionFields();
      this._submissionFields.submission = this;
    }

    return this._submissionFields;
  },

  parse: function(payload) {
    if (payload.submission_fields) {
      this.submissionFields().set(payload.submission_fields, {parse: true});
      delete payload.submission_fields;
    }

    return payload;
  }
});
