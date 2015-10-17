Promulgation.Views.FormIndexItem = Backbone.View.extend({
  tagName: "tr",
  className: 'clearfix',
  template: JST['form_index_item'],

  events: {
    'click .delete': 'deleteItem'
  },

  render: function() {
    this.$el.html(this.template({
      form: this.model,
      submissionCount: this.model.get('submission_count')
    }));

    return this;
  },

  deleteItem: function() {
    this.model.destroy();
  }
});
