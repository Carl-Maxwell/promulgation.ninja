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

    //
    // Grab the 3 fields to show
    //

    var submissionFields = this.model.submissionFields().sort();

    var validFields = this.model.fields()
      .sort()
      .slice(0, 3)
      .map(function(thing) { return thing.get('id'); });

    submissionFieldsByFieldId = {};

    submissionFields.each(function(submissionField) {
      submissionFieldsByFieldId[submissionField.get('field_id')] = submissionField;
    }.bind(this));

    submissionFields = validFields.map(function(id) {
      return submissionFieldsByFieldId[id];
    });

    //
    //
    //

    this.$el.html(this.template({
      model: this.model,
      submissionFields: submissionFields
    }));

    this.trigger('render');

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
