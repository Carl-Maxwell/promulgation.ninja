Promulgation.Views.SubmissionModal = Backbone.View.extend({
  // tagName: "tr",
  className: 'submission-modal',//'modal-wrapper close-modal',
  template: JST['submission_modal'],

  initialize: function(options) {
    this.fields = options.fields;
    $(document).on('keyup', this.checkForEscape.bind(this));
  },

  events: {
    'click .delete': 'deleteItem',
    'click .close-modal': 'closeModal'
  },

  render: function() {
    var subFields = [];

    this.model.submissionFields().sort();

    this.model.submissionFields().forEach(function(field, i) {
      if (field.field()) {
        subFields.push( {
          value: field.get('value'),
          key: field.field().get('label')
        });
      }
    });

    this.$el.html(this.template({
      model: this.model,
      subFields: subFields,
      form: this.model.form()
    }));

    return this;
  },

  deleteItem: function() {
    this.model.destroy();
  },

  closeModal: function(e) {
    e.stopPropagation();

    this.remove();
  },

  checkForEscape: function(e) {
    if (e.which == 27) {
      e.preventDefault();
      e.stopPropagation();
      this.remove();
    }
  }

});
