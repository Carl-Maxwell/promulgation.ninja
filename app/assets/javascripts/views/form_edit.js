Promulgation.Views.FormEdit = Backbone.CompositeView.extend({
  template: JST['form_edit'],

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
    'click .delete-button': 'deleteField'
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  openFieldProperties: function(e) {
    var model = this.actualFields.getModelForElement(e.currentTarget);

    this.sidebar.tabs[1].model = model;

    this.sidebar.openTab(1);
  },

  deleteField: function(e) {
    var target = $(e.currentTarget);

    var model = this.sidebar.tabs[1].model;

    var itemView = this.actualFields.getViewForModel(model);

    itemView.$el.next().click();

    model.destroy();
  }
});
