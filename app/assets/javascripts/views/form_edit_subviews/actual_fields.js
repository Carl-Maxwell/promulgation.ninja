Promulgation.Views.ActualFields = Backbone.CompositeView.extend({
  template: JST['form_edit/actual_fields'],
  subviewSelector: '.fields',
  className: 'actual-fields',

  events: {
    'sortstop': 'saveOrds'
  },

  saveOrds: function() {
    this.$(this.subviewSelector + ' > li').trigger('saveOrd');

    this.model.fields().sort();
    this.resortSubviews();
  },

  resortSubviews: function() {
    var subviews = this.subviews(this.subviewSelector);
    subviews.sort(function(a, b) {
      return Math.sign(a.model.get('ord') - b.model.get('ord'));
    });
  },

  initialize: function () {
    this.listenTo(this.model.fields(), 'sync', this.render);
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.model.fields(), 'remove', this.removeItemView);

    this.listenTo(this.model.fields(), 'add', this.addItemView);

    this.listenTo(this, 'subview:render', this.resetScrollTop);
    this.model.fields().each(this.addItemView.bind(this));
    this.resortSubviews();
  },

  addItemView: function(model) {
    if (typeof model.attributes.ord == "undefined") {
      model.set('ord', this.model.fields().length);
    }

    var subview = new Promulgation.Views.ActualFieldItem({model: model});
    this.addSubview(this.subviewSelector, subview);
  },

  removeItemView: function(model) {
    var subview = this.getViewForModel(model);

    subview.animateRemoval(function() {
      this.removeModelSubview(this.subviewSelector, model);
    }.bind(this));
  },

  resetScrollTop: function() {
    _.defer(function() {
        this.$(this.subviewSelector).scrollTop(this.scrollTop);
    }.bind(this) );
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    this.attachSubviews();

    this.$(this.subviewSelector).sortable({
      axis: 'y',
      placeholder: 'drop-placeholder',
      forcePlaceholderSize: true,
      delay: 110,
      receive: function(e, ui) {
        this.scrollTop = this.$(this.subviewSelector).scrollTop();

        var helper = ui.helper;
        var view = Promulgation.displacedViews[helper.data('view-cid')];

        view.$el.css("height", "initial");

        view.model.set('form_id', this.model.get('id'));

        this.model.fields().add(view.model, { silent: true });

        this.addSubview(this.subviewSelector, view);
        this.saveOrds();

        delete Promulgation.displacedViews[helper.data('view-cid')];

        helper.data('view-cid', undefined);
      }.bind(this)
    }).disableSelection();

    return this;
  }
});
