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
    var subFields = [];

    this.model.submissionFields().sort();

    this.model.submissionFields().forEach(function(field, i) {
      subFields.push( {
        value: field.get('value'),
        key: field.field().get('label')
      });
    });

    this.$el.html(this.template({
      model: this.model,
      subFields: subFields
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
