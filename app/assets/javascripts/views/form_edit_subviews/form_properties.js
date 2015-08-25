Promulgation.Views.FormProperties = Backbone.View.extend({
  template: JST['form_edit/form_properties'],

  initialize: function () {
    
  },

  events: {
    'keyup input': 'setAndSave',
    'change input': 'setAndSave'
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));

    return this;
  },

  setAndSave: function(e) {
    var target = $(e.currentTarget);

    this.model.set(target.serializeJSON());

    if (this._delayedSave) clearTimeout(this._delayedSave);

    this._delayedSave = setTimeout(function() {
      this.model.save(target.serializeJSON());

      this._delayedSave = undefined;
    }.bind(this), 200);

  }
});
