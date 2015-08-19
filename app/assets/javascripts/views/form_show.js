Promulgation.Views.FormShow = Backbone.CompositeView.extend({
  template: JST['form_show'],

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addField);

    this.collection.each(function(field) {
      this.addField(field);
    }.bind(this));
  },

  addField: function(field) {
     var view = new Promulgation.Views.FormShowItem({
       model: field
     });
     this.addSubview('.fields', view);
   },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },
});
