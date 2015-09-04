Promulgation.Views.PotentialFields = Backbone.CompositeView.extend({
  template: JST['form_edit/potential_fields'],

  initialize: function () {
    fieldHelper.possibilities().forEach(function(possibility) {
      var view;

      if (possibility) {
        view = new Promulgation.Views.PotentialFieldItem({model: possibility});
      } else {
        view = new Promulgation.Views.PotentialFieldSeperator({model: possibility});
      }

      this.addSubview('.add-field-index', view);
    }.bind(this) );
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    this.$el.disableSelection();
    this.$el.find('*').disableSelection();

    this.eachSubview(function(subview) {
      subview.onRender && subview.onRender();
    });

    this.trigger('render');

    return this;
  }
});
