Promulgation.Views.PotentialFields = Backbone.CompositeView.extend({
  template: JST['form_edit/potential_fields'],

  initialize: function () {
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  }
});
