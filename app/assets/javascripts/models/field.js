Promulgation.Models.Field = Backbone.Model.extend({
  urlRoot: "/api/fields",

  html: function() {
    return fieldHelper.makeField(this);
  },

  hasChildren: function() {
    return fieldHelper.hasChildren(this);
  },

  // has_many :fields

  fields: function() {
    if (!this._fields) {
      this._fields = new Promulgation.Collections.Fields();
    }

    return this._fields;
  },

  parse: function(payload) {
    if (payload.fields) {
      this.fields().set(payload.fields, {parse: true});
      delete payload.fields;
    }

    return payload;
  }
});
