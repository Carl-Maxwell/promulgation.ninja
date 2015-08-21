Promulgation.Views.FormShow = Backbone.CompositeView.extend({
  template: JST['form_show'],

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addField);

    this.collection.each(function(field) {
      this.addField(field);
    }.bind(this));
  },

  events: {
    'submit form': 'submit'
  },

  addField: function(field) {
     var view = new Promulgation.Views.FormShowItem({
       model: field
     });
     this.addSubview('.main-form', view);
   },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  submit: function(e) {
    e.preventDefault();

    


  }
});
