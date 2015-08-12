Promulgation.Models.Form = Backbone.Model.extend({
  urlRoot: "/api/forms",

  fields: function() {
    if (!this._fields) {
      this._fields = new Promulgation.Collections.Fields();
    }

    return this._fields;
  },

  parse: function(payload) {
    if (payload.fields) {
      this.fields().set(payload.fields);
      delete payload.fields;
    }

    return payload;
  }
});
