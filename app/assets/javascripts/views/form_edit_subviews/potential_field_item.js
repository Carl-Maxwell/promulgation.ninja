Promulgation.Views.PotentialFieldItem = Backbone.CompositeView.extend({
  template: JST['form_edit/potential_field_item'],
  tagName: 'li',

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  },

  onRender: function() {
    this.$el.draggable({
      helper: function(e) {
        var model = new Promulgation.Models.Field({
          key: 'Super Title! ' + Math.floor(Math.random() * 99),
          value: {type: 'text', value: 'boopboop'}
        });
        var view = new Promulgation.Views.ActualFieldItem({
          model: model
        });

        view.render();

        Promulgation.displacedViews[view.cid] = view;

        view.$el.data('view-cid', view.cid);

        return view.$el;
      },
      stop: function() {
        // $(this).removeClass('dragging');
      },
      connectToSortable: '.fields.fields-index'
    });
  }
});
