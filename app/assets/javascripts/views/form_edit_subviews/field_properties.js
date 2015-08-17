Promulgation.Views.FieldProperties = Backbone.CompositeView.extend({
  template: JST['form_edit/field_properties'],

  events: {
    'change input': 'changeProperty',
    'keyup input': 'changeProperty',
    'click .field-children .add-child': 'addChild'
  },

  initialize: function() {
    this.listenTo(this.model.fields(), "add", function(newField) {
      this.model = newField;
    }.bind(this));
    this.model = this.model.fields().first();
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    this.attachSubviews();

    return this;
  },

  addSubfield: function(model) {
    var subview = new Promulgation.Views.FieldPropertiesItem({model: model});

    this.addSubview('.children-table tbody', subview);
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
      field_type: this.model.get('type') + '-item',
      name: '',
      ord: this.model.fields().length,
    });

    this.model.fields().add(model);

    this.addSubfield(model);

    model.save();
  }
});
