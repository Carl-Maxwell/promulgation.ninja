Promulgation.Views.FormEditSidebar = Backbone.CompositeView.extend({
  template: JST['form_edit/form_edit_sidebar'],

  initialize: function () {
    var stdOpts = {model: this.model};

    this.tabs = [
      new Promulgation.Views.PotentialFields(stdOpts),
      new Promulgation.Views.FieldProperties(),
      new Promulgation.Views.FormProperties(stdOpts)
    ];

    this.addSubview('.tabular-content', this.tabs[0]);
  },

  events: {
    'click .tabs .tab': 'clickTab'
  },

  openTab: function(newTabIndex) {
    var tab = this.tabs[ newTabIndex ];

    if (tab.prepareToBeATab) {
      if (!tab.prepareToBeATab(this.model)) {
        this.$('.tabs .tab').eq(newTabIndex).addClass('grey');

        return;
      }
    }

    this.$('.tabs .active').removeClass('active');

    this.removeSubviews(true);

    this.$('.tabs .tab').eq(newTabIndex).addClass('active').removeClass('grey');

    this.addSubview('.tabular-content', tab);

    this.$('[autofocus]').first().focus();
  },

  clickTab: function(e) {
    var target = $(e.currentTarget);

    this.openTab(target.index());
  },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  }
});
