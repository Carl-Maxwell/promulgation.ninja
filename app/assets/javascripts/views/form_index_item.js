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

  deleteItem: function(e) {
    var target = $(e.currentTarget);

    if (target.is('.nope-nope')) return;
    target.addClass('nope-nope');

    Promulgation.confirm(
      'Are you sure you want to delete this form?',
      function() {
        this.model.destroy();
      }.bind(this),
      function() {
        target.removeClass('nope-nope');
      }
    );


  }
});
