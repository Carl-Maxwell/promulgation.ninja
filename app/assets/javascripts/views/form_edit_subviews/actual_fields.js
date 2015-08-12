Promulgation.Views.ActualFields = Backbone.CompositeView.extend({
  template: JST['form_edit/actual_fields'],

  initialize: function () {
    this.listenTo(this.model.fields(), 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.fields(), 'remove', this.removeItemView);

    this.listenTo(this.model.fields(), 'add', this.addItemView);
    this.model.fields().each(this.addItemView.bind(this));
  },

  addItemView: function(model) {
    var subview = new Promulgation.Views.ActualFieldItem({model: model});
    this.addSubview('.fields', subview);
  },

  removeItemView: function(model) {
    this.removeModelSubview('.fields', model);
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    this.attachSubviews();

    return this;
  }
});
