Promulgation.Views.FieldPropertiesItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['form_edit/field_properties_item'],
  className: 'field-properties-item',

  events: {
    'keyup .child-name': 'setModel',
    'change input'     : 'saveModel',
    'click .delete'    : 'deleteButton',
    'saveOrd'          : 'saveOrd'
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  },

  setModel: function(e) {
    var formData = this.$('[name]').serializeJSON();

    this.saveProperty(formData);
  },

  saveModel: function() {
    var formData = this.$('[name]').serializeJSON();

    if (formData.value && !this.model.get('value')) {
      this.model.collection.each(function(field) {
        if (field.get('value')) {
          field.set({value: ''});
        }
      });
    }

    this.saveProperty(formData);
  },

  saveProperty: function(formData) {
    if (this.model.get("id")) {
      this.model.save(formData);
    } else {
      this.model.set(formData);
    }
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
