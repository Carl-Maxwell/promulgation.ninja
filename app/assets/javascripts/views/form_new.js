Promulgation.Views.FormNew = Backbone.View.extend({
  template: JST['form_new'],
  tagName: "form",
  className: "wrapper",

  events: {
    "submit": "submit"
  },

  initialize: function() {
    this.$el.attr('action', '/api/forms/');
    this.$el.attr('method', 'POST');
  },

  render: function() {
    this.$el.html(this.template());

    return this;
  },

  submit: function(e) {
    e.preventDefault();

    var model = new Promulgation.Models.Form(this.$el.serializeJSON());

    model.save({}, {
      success: function() {
        Promulgation.formsCollection.add(model);
        Backbone.history.navigate("", {trigger: true});
      }
    });
  }
});
