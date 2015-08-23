Promulgation.Models.Form = Backbone.Model.extend({
  urlRoot: "/api/forms",

  fields: function() {
    if (!this._fields) {
      this._fields = new Promulgation.Collections.Fields();
    }

    return this._fields;
  },

  submissions: function() {
    if (!this._submissions) {
      this._submissions = new Promulgation.Collections.Submissions();
    }

    return this._submissions;
  },

  parse: function(payload) {
    if (payload.fields) {
      this.fields().set(payload.fields, {parse: true});
      delete payload.fields;
    }

    if (payload.submissions) {
      this.submissions().set(payload.submissions, {parse: true});
      delete payload.submissions;
    }

    return payload;
  }
});
