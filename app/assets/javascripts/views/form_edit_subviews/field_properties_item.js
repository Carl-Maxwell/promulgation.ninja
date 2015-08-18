Promulgation.Views.FieldPropertiesItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['form_edit/field_properties_item'],

  events: {
    'keyup .child-name': 'change',
    'keydown .child-name': 'checkForEnterKey',
    'change input': 'change',
    'click .delete': 'deleteButton',
    'saveOrd': 'saveOrd'
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  },

  checkForEnterKey: function(e) {
    if (e.which == 13) {
      e.preventDefault();
      $(e.currentTarget).closest('.field-children').find('.add-item').click();
    }
  },

  change: function(e) {
    var formData = this.$('[name]').serializeJSON();

    if (formData.value && !this.model.get('value')) {
      formData.value = formData.value || '';

      this.model.collection.each(function(field) {
        if (field.get('value')) {
          field.save({value: ''});
        }
      });
    }

    this.model.save(formData);
  },

  deleteButton: function() {
    var parentView = Promulgation.router._view.sidebar.tabs[1];

    this.$el.effect("drop", {
        duration: 300,
        complete: function() {
          parentView.removeSubview('.children-table', this);
          this.model.destroy();
        }.bind(this)
    });
  },

  saveOrd: function() {
    if (this.model.get('ord') === this.$el.index()) {
      return;
    }
    this.model.save({ord: this.$el.index()});
  },

});
