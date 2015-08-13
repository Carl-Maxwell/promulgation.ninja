Promulgation.Views.ActualFieldItem = Backbone.View.extend({
  template: JST['form_edit/actual_field_item'],
  tagName: "li",
  className: 'form-edit-actual-item',

  events: {
    "saveOrd": "saveOrd"
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  saveOrd: function() {
    if (this.model.get('ord') === this.$el.index()) {
      return;
    }
    this.model.save({ord: this.$el.index()});
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  }
});
