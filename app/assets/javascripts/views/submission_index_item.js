Promulgation.Views.SubmissionIndexItem = Backbone.View.extend({
  tagName: "tr",
  // className: 'clearfix',
  template: JST['submission_index_item'],

  events: {
    'click .delete': 'deleteItem'
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  },

  deleteItem: function() {
    this.model.destroy();
  }
});
