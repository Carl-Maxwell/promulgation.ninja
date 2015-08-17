Promulgation.Views.FieldPropertiesItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['form_edit/field_properties_item'],

  // initialize: function() {},

  events: {
    'keyup .child-name': 'change',
    'change input': 'change',
    'click .delete': 'deleteButton'
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  },

  change: function() {
    var formData = this.$('[name]').serializeJSON();

    formData.value = formData.value || "";

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
  }

});
