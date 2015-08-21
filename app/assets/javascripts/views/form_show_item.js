Promulgation.Views.FormShowItem = Backbone.View.extend({
  template: JST['form_show_item'],

  render: function() {
    this.$el.html(this.template({model: this.model}));

    this.trigger('render');

    return this;
  },
});
