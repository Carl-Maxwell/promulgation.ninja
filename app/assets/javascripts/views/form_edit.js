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
    'click .form-edit-actual-item': 'openFieldProperties'
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  openFieldProperties: function(e) {
    var model = this.actualFields.getModelFor(e.currentTarget);

    this.sidebar.tabs[1].model = model;

    this.sidebar.openTab(1);
  }
});
