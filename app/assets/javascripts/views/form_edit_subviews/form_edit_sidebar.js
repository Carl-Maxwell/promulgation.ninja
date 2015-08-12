Promulgation.Views.FormEditSidebar = Backbone.CompositeView.extend({
  initialize: function () {
    var stdOpts = {model: this.model};

    this.tabs = [
      new Promulgation.Views.PotentialFields(stdOpts),
      new Promulgation.Views.FieldProperties(stdOpts),
      new Promulgation.Views.FormProperties(stdOpts)
    ];

    // this.tabs.each(this.addSubView.bind(undefined, '.form-edit-sidebar'));
  },

  events: {
    'click .tabs .tab': "clickTab"
  },

  clickTab: function(e) {
    var target = $(e.currentTarget);
  }
});
