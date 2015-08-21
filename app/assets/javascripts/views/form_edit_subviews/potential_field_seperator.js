Promulgation.Views.PotentialFieldSeperator = Backbone.View.extend({
  tagName: 'li',
  className: 'potential-field-seperator',
  template: JST['form_edit/potential_field_seperator'],

  render: function() {
    this.$el.html(this.template());

    this.trigger('render');

    return this;
  },

});
