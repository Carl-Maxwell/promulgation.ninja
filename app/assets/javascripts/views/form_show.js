Promulgation.Views.FormShow = Backbone.CompositeView.extend({
  template: JST['form_show'],
  tagName: 'form',
  className: 'form-show',

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addField);

    this.collection.each(function(field) {
      this.addField(field);
    }.bind(this));
  },

  events: {
    'submit': 'submit'
  },

  addField: function(field) {
     var view = new Promulgation.Views.FormShowItem({
       model: field
     });
     this.addSubview('.main-form', view);
   },

  render: function() {
    this.$el.html(this.template());
    this.attachSubviews();

    return this;
  },

  submit: function(e) {
    e.preventDefault();

    var formData = this.$el.serializeJSON();

    $('.invalid').removeClass('invalid');
    $('.invalid-message').remove();

    $.ajax({
      url: 'api/submissions/' + this.model.get('slug'),
      method: 'post',
      data: formData,
      success: function() {
        alert('Thanks for submitting the form, user!');
      },
      error: function(errors) {
        for (var name in errors.responseJSON) {
          var $message = $('<span></span>')
            .addClass('invalid-message')
            .html(errors.responseJSON[name]);

          $('[name="' + name + '"]')
            .addClass('invalid')
            .after($message);
        }
      }
    });
  }
});
