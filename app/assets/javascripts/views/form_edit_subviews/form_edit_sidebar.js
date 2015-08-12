Promulgation.Views.FormEditSidebar = Backbone.CompositeView.extend({
  template: JST['form_edit/form_edit_sidebar'],

  initialize: function () {
    var stdOpts = {model: this.model};

    this.tabs = [
      new Promulgation.Views.PotentialFields(stdOpts),
      new Promulgation.Views.FieldProperties(stdOpts),
      new Promulgation.Views.FormProperties(stdOpts)
    ];

    this.addSubview('.form-edit-sidebar', this.tabs[0]);
  },

  events: {
    'click .tabs .tab': "clickTab"
  },

  clickTab: function(e) {
    var target = $(e.currentTarget);
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  }
});
