Promulgation.Views.FormEdit = Backbone.CompositeView.extend({
  template: JST['form_edit'],
  className: 'form-edit clearfix',

  initialize: function() {
    this.sidebar = new Promulgation.Views.FormEditSidebar({
      model: this.model
    });
    this.actualFields = new Promulgation.Views.ActualFields({
      model: this.model
    });

    this.addSubview('.form-edit-sidebar', this.sidebar);
    this.addSubview('.form-edit-actuals', this.actualFields);
  },

  events: {
    'click .form-edit-actual-item': 'openFieldProperties',
    'click .delete-button': 'deleteField',
    'click .potential-item-button': 'appendField'
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  openFieldProperties: function(e) {
    $('.properties-open').removeClass('properties-open');
    $(e.currentTarget).addClass('properties-open');

    var model = this.actualFields.getModelForElement(e.currentTarget);

    var propertiesView = this.sidebar.tabs[1];

    propertiesView.model = model;

    propertiesView.addSubfields();

    this.sidebar.openTab(1);
  },

  deleteField: function(e) {
    var target = $(e.currentTarget);

    if (target.is('.nope-nope')) return;

    Promulgation.confirm('Are you sure you want to delete this field?', function() {
      target.addClass('nope-nope');

      var model = this.sidebar.tabs[1].model;
      var itemView = this.actualFields.getViewForModel(model);

      if (itemView) {
        var $el = itemView.$el;

        if ($el.next().length){
          $el.next().click();
        } else {
          $el.prev().click();
        }

        model.destroy();
      }

      if (!this.model.fields().length) {
        this.sidebar.openTab(1);
        this.sidebar.openTab(0);
      }
    }.bind(this));
  },

  appendField: function(e) {
    var target = $(e.currentTarget);

    // debugger;

    var potentialModel = this.sidebar.tabs[0].getModelForElement(target[0]);

    // debugger;

    potentialModel.form_id = this.model.get('id');

    var model = new Promulgation.Models.Field(potentialModel);

    // var view = new Promulgation.Views.ActualFieldItem({
    //   model: model
    // });

    // view.render();

    this.model.fields().add(model);
    model.save();
  }
});
