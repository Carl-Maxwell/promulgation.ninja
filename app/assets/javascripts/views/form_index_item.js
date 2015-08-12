Promulgation.Views.FormIndexItem = Backbone.View.extend({
  tagName: "li",
  template: JST['form_index_item'],

  render: function() {
    this.$el.html(this.template({form: this.model}));

    return this;
  }
});
