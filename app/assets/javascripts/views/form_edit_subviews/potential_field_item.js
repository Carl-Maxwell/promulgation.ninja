Promulgation.Views.PotentialFieldItem = Backbone.CompositeView.extend({
  template: JST['form_edit/potential_field_item'],
  tagName: 'li',

  render: function() {
    this.$el.html(this.template({model: this.model}));

    this.trigger('render');

    return this;
  },

  onRender: function() {
    this.trigger('onRender');

    this.$el.draggable({
      helper: function(e) {
        var model = new Promulgation.Models.Field({
          name: 'Super Title! ' + Math.floor(Math.random() * 99),
          fieldType: 'text'
        });
        var view = new Promulgation.Views.ActualFieldItem({
          model: model
        });

        view.render();

        Promulgation.displacedViews[view.cid] = view;

        view.$el.data('view-cid', view.cid);

        return view.$el;
      },
      connectToSortable: '.fields.fields-index'
    });
  }
});
