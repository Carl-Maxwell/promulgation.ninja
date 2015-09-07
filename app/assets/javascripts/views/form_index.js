Promulgation.Views.FormIndex = Backbone.CompositeView.extend({
  template: JST['form_index'],
  className: 'form-index-view',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'remove', this.removeItemView);

    this.listenTo(this.collection, 'add', this.addItemView);
    this.collection.each(this.addItemView.bind(this));
  },

  addItemView: function(model) {
    var subview = new Promulgation.Views.FormIndexItem({model: model});
    this.addSubview('.form-index', subview);
  },

  removeItemView: function(model) {
    this.removeModelSubview('.form-index', model);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  }
});
