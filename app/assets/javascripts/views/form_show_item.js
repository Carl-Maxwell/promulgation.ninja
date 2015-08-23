Promulgation.Views.FormShowItem = Backbone.View.extend({
  template: JST['form_show_item'],
  className: 'form-show-item',

  render: function() {
    this.$el.html(this.template({model: this.model}));

    this.trigger('render');

    return this;
  },
});
