Promulgation.Views.PotentialFields = Backbone.CompositeView.extend({
  template: JST['form_edit/potential_fields'],

  initialize: function () {
    var possibilities = [
      { type: "Sentence" },
      { type: "Paragraph(s)" },
      { type: "Dropdown" },
      { type: "Radio" },
      { type: "Checkbox" }];

    fieldHelper.possibilities().forEach(function(possibility) {
      var view = new Promulgation.Views.PotentialFieldItem({model: possibility});
      this.addSubview('.add-field-index', view);
    }.bind(this) );
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    this.$el.add(this.$el.children).disableSelection();

    this.eachSubview(function(subview) {
      subview.onRender();
    });

    return this;
  }
});
