Promulgation.Views.SubmissionIndexItem = Backbone.View.extend({
  tagName: "tr",
  className: 'submission-index-item',
  template: JST['submission_index_item'],

  initialize: function(options) {
    this.fields = options.fields;
  },

  events: {
    'click .delete': 'deleteItem',
    'click .show-modal': 'showModal'
  },

  render: function() {
    this.$el.html(this.template({
      model: this.model,
      submissionFields: this.model.submissionFields().sort().slice(0, 3)
    }));

    return this;
  },

  deleteItem: function() {
    this.model.destroy();
  },

  showModal: function(e) {
    e.preventDefault();

    var view = new Promulgation.Views.SubmissionModal({
      model: this.model,
      collection: this.model.submissionFields(),
      fields: this.fields
    });

    $('body').append(view.$el);

    view.render();
  },
});
