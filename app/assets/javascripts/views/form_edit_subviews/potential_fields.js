Promulgation.Views.PotentialFields = Backbone.CompositeView.extend({
  template: JST['form_edit/potential_fields'],

  initialize: function () {
    var possibilities = ["Sentence", "Paragraph(s)", "Dropdown", "Radio",
      "Checkbox"];

    possibilities.forEach(function(possibility) {
      var view = new Promulgation.Views.PotentialFieldItem({model: possibility});
      this.addSubview('.add-field-index', view);
    }.bind(this) );
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    this.$el.add(this.$el.children).disableSelection();

    return this;
  }
});
