Promulgation.Views.SubmissionModal = Backbone.View.extend({
  // tagName: "tr",
  // className: 'modal-wrapper close-modal',
  template: JST['submission_modal'],

  initialize: function(options) {
    this.fields = options.fields;
  },

  events: {
    'click .delete': 'deleteItem',
    'click .close-modal': 'closeModal'
  },

  render: function() {
    this.$el.html(this.template({
      model: this.model,
      fields: this.fields
    }));

    return this;
  },

  deleteItem: function() {
    this.model.destroy();
  },

  closeModal: function(e) {
    e.stopPropagation();

    this.remove();
  }

});
