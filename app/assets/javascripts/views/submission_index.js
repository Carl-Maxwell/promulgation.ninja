Promulgation.Views.SubmissionIndex = Backbone.CompositeView.extend({
  template: JST['submission_index'],
  className: 'submission-index',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'remove', this.removeItemView);

    this.listenTo(this.collection, 'add', this.addItemView);
    this.collection.each(this.addItemView.bind(this));
  },

  addItemView: function(model) {
    var subview = new Promulgation.Views.SubmissionIndexItem({
      model: model,
      fields: this.model.fields()
    });
    this.addSubview('.submission-index tbody', subview);
  },

  removeItemView: function(model) {
    this.removeModelSubview('.submission-index tbody', model);
  },

  render: function() {
    this.$el.html(this.template({
      model: this.model,
      fields: this.model.fields()
    }));
    this.attachSubviews();

    return this;
  }
});
