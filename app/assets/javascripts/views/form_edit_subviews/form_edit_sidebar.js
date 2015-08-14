Promulgation.Views.FormEditSidebar = Backbone.CompositeView.extend({
  template: JST['form_edit/form_edit_sidebar'],

  initialize: function () {
    var stdOpts = {model: this.model};

    this.tabs = [
      new Promulgation.Views.PotentialFields(stdOpts),
      new Promulgation.Views.FieldProperties(stdOpts),
      new Promulgation.Views.FormProperties(stdOpts)
    ];

    this.addSubview('.tabular-content', this.tabs[0]);
  },

  events: {
    'click .tabs .tab': 'clickTab'
  },

  clickTab: function(e) {
    this.$('.tabs .active').removeClass('active');

    var target = $(e.currentTarget).addClass('active');
    var tab = this.tabs[ target.index() ];

    var oldTab = this.subviews('.tabular-content').first();
    oldTab.remove();

    var content = this.subviews('.tabular-content');
    content.splice(0, 1);

    this.addSubview('.tabular-content', tab);

    this.$('[autofocus]').first().focus();
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  }
});
