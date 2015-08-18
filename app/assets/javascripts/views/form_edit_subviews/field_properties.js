Promulgation.Views.FieldProperties = Backbone.CompositeView.extend({
  template: JST['form_edit/field_properties'],
  className: 'field-properties',
  subviewSelector: '.children-table',

  events: {
    'change input': 'changeProperty',
    'keyup input': 'changeProperty',
    'click .field-children .add-child': 'addChild',
    'click .toggle-advanced-settings': 'toggleAdvancedSettings'
  },

  initialize: function() {
    this.listenTo(this.model.fields(), "add", function(newField) {
      this.model = newField;
    }.bind(this));

    // here this.model is the _form_

    this.model = this.model.fields().first();

    // and now it's a field
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    this.attachSubviews();

    return this;
  },

  addSubfield: function(model) {
    var subview = new Promulgation.Views.FieldPropertiesItem({model: model});

    this.addSubview(this.subviewSelector, subview);

    return subview;
  },

  addSubfields: function() {
    this.removeSubviews();
    this._subviews = {};

    this.model.fields().each(function(subfield) {
      this.addSubfield(subfield);
    }.bind(this));
  },

  changeProperty: function(e) {
    var target = $(e.currentTarget);

    if (target.parents('.field-children').length) {
      return;
    }

    property = this.model.attributes;

    var parents = target.attr('name').replace(/\]/g, '').split('[');

    _(parents.slice(0, -1)).each(function(parent) {
      property = property[parent];
    });

    property[_(parents).last()] = target.val();

    this.model.set(parents[0], this.model.attributes[parents[0]]);

    this.model.save();

    // TODO delay the .save() call so it isn't fired for every keypress
    // TODO this calls change, but not change:name / change:whatever
  },

  addChild: function(e) {
    var model = new Promulgation.Models.Field({
      field_id: this.model.get('id'),
      field_type: this.model.get('field_type') + '-item',
      name: '',
      ord: this.model.fields().length,
    });

    this.model.fields().add(model);

    this.addSubfield(model).$el.find('[autofocus]').focus();

    model.save();
  },

  toggleAdvancedSettings: function(e) {
    this.$('.advanced-settings li').toggleClass('none');

    var target = $(e.currentTarget);
    if (target.is(':focus')) {
      this.$('.advanced-settings .toggle-advanced-settings:visible').focus();
    }
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

});
