Promulgation.Views.FieldProperties = Backbone.CompositeView.extend({
  template: JST['form_edit/field_properties'],
  className: 'field-properties',
  subviewSelector: '.children-table',

  events: {
    'change input, textarea': 'changeProperty',
    'keyup input, textarea': 'changeProperty',
    'click .field-children .add-child': 'addChild',
    'keydown .field-children .child-name': 'checkForEnterKey',
    'click .toggle-advanced-settings': 'toggleAdvancedSettings'
  },

  initialize: function() {
    this._delayedSave = {};
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
    this.removeSubviews(true);

    this.model.fields().each(function(subfield) {
      this.addSubfield(subfield);
    }.bind(this));
  },

  changeProperty: function(e) {
    var target = $(e.currentTarget);
    var id = this.model.get('id');

    if (target.parents('.field-children').length) {
      return;
    }

    if (this._delayedSave[id]) {
      clearTimeout(this._delayedSave[id]);
      delete this._delayedSave[id];
    }

    var formData = target
      .closest('.field-properties')
      .find('[name]')
      .not('.field-children *')
      .serializeJSON();

    this.model.set(formData);

    this._delayedSave[id] = setTimeout(this.saveProperty.bind(this, formData, this.model), 200);
  },

  saveProperty: function(formData, model) {
    $('.loading-icon').css({opacity: 1});

    model.save(formData, {
      success: function() {
        $('.loading-icon').css({opacity: 0});
      }
    });

    delete this._delayedSave[model.get('id')];

    // TODO this calls change, but not change:label / change:whatever
    // TODO force any scheduled saves if the user leaves the page
  },

  addChild: function(e) {
    var model = new Promulgation.Models.Field({
      field_id: this.model.get('id'),
      field_type: this.model.get('field_type') + '-item',
      label: '',
      ord: this.model.fields().length,
    });

    this.model.fields().add(model);

    this.addSubfield(model).$el.find('[autofocus]').focus();

    model.save();
  },

  checkForEnterKey: function(e) {
    if (e.which == 13) {
      e.preventDefault();
      this.addChild();
    }
  },

  toggleAdvancedSettings: function(e) {
    this.$('.advanced-settings .toggle-advanced-settings').toggleClass('none');
    this.$('.advanced-settings .advanced-settings-controls').slideToggle();

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

  prepareToBeATab: function(form) {
    if (form.fields().length) {
      if (!this.model) {
        this.model = form.fields().first();
      }

      return true;
    }

    return false;
  }

});
