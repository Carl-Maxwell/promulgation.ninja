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
        // TODO redirect to submissions page if user is logged in, else thank you page
        if (isGuest()) {
          window.location.assign('/thanks');
        } else {
          window.location.assign('/#/forms/' + this.model.get('slug') + '/submissions');
          // Backbone.history.navigate('#/forms/' + this.model.get('slug') + '/submissions', {trigger: true});
        }
      }.bind(this),
      error: function(errors) {
        for (var name in errors.responseJSON) {
          if (!errors.responseJSON[name].length) continue;

          var $messages = $('<ul></ul>').addClass('invalid-messages');

          errors.responseJSON[name].forEach(function(err) {
            var $message = $('<li></li>')
              .addClass('invalid-message')
              .html(err);

            $messages.append($message);
          } );

          $('[name="' + name + '"]')
            .addClass('invalid')
            .after($messages);

          _.defer(function() { $('.invalid-messages').addClass('animate-in'); });
        }
      }
    });
  }
});
