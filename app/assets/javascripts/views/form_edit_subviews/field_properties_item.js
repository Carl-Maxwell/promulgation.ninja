Promulgation.Views.FieldPropertiesItem = Backbone.View.extend({
  tagName: 'tr',
  template: JST['form_edit/field_properties_item'],

  // initialize: function() {},

  events: {
    'keyup .child-name': 'change',
    'change input': 'change'
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  },

  change: function() {
    this.model.save(this.$('[name]').serializeJSON());
  }

});
