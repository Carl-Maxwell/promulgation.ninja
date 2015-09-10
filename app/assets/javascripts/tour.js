(function() {
  var shepherd = Promulgation.shepherd = {};

  var tour = shepherd.tour = new Shepherd.Tour({
    defaults: {
      classes: 'shepherd-theme-arrows'
    }
  });

  shepherd.markedSteps = [];

  var markStep = shepherd.markStep = function(stepId) {
    shepherd.markedSteps.push(stepId);
  };

  var addSteps = shepherd.addSteps = function() {
    tour.steps.forEach(function(step) {
      if (step.tether) step.destroy();
    });

    //
    // helper functions for the step conditionals
    //

    var hasTextarea = function() {
      return Promulgation.viewQuery(function(classNames) {
        return classNames.indexOf('form-edit-actual-item') != -1 &&
          this.model.get('field_type') == 'textarea';
      });
    };

    var textareaHasDefaultName = function() {
      return Promulgation.viewQuery(function(classNames) {
        return classNames.indexOf('field-properties') != -1 &&
          this.model.get('field_type') == 'textarea' &&
          this.model.get('label') == 'Textarea';
      });
    };

    var isPromulgated = function() {
      return Promulgation.viewQuery(function(classNames) {
        return classNames.indexOf('form-properties') != -1 &&
          this.model.get('slug');
      });
    };

    var isGuest = function() {
      return $('meta[name="is-guest"]').length;
    };

    //
    //
    //

    tour.steps = [];

    [
      {
        id: 'guest-login',
        words: 'Click here and I\'ll walk you through some features!',
        attachTo: '.guest-button left'
      },
      {
        id: 'add-form',
        words: 'Let\'s add a new form!',
        attachTo: '.add-form left',
        conditional: function(callback) {
          if (isGuest()) {
            callback();
          }
        }
      },
      {
        id: 'textarea-button',
        words: 'Add a textarea to your form!',
        attachTo: '.textarea-button right',
        conditional: function(callback) {
          if (isGuest() && !hasTextarea()) {
            callback();
          }
        }
      },
      {
        id: 'name-textarea',
        words: 'Give your textarea a name',
        attachTo: '[name="label"] right',
        conditional: function(callback) {
          if (isGuest() && textareaHasDefaultName()) {
            callback();
          }
        }
      },
      {
        id: 'textarea-properties',
        words: 'Click on your textarea to give it a name!',
        attachTo: '.form-edit-actuals textarea left',
        conditional: function(callback) {
          if (isGuest() && textareaHasDefaultName()) {
            callback();
          }
        }
      },
      {
        id: 'promulgate',
        words: 'Now promulgate to publish your form to the web!',
        attachTo: '.promulgate top',
        conditional: function(callback) {
          if (isGuest() && hasTextarea() && !isPromulgated()) {
            callback();
          }
        }
      },
      {
        id: 'open-form-properties',
        words: 'Click here to view your form',
        attachTo: '.tabs:last-child bottom',
        conditional: function(callback) {
          if (isGuest() && isPromulgated()) {
            callback();
          }
        }
      },
      {
        id: 'view-form',
        words: 'Click here to see your form live',
        attachTo: {element: '.view-form', on: 'top left'},
        conditional: function(callback) {
          if (isGuest()) {
            callback();
          }
        }
      },
    ].forEach(function(step) {
      var fn = function() {
        if (shepherd.markedSteps.indexOf(step.id) != -1) return;

        var selector;

        if (step.attachTo.element) {
          selector = step.attachTo.element;
        } else {
          selector = step.attachTo.split(' ').slice(0, -1).join(' ');
        }


        if ($(selector).length) {
          tour.addStep(step.id, {
            text: step.words,
            attachTo: step.attachTo,
            buttons: [
              {
                text: 'Next',
                action: function() {
                  shepherd.markStep(step.id);
                  shepherd.addSteps();
                }
              }
            ]
          });
        }
      };

      return; // turning off shepherd tour while I present it to people

      if (step.conditional) {
        step.conditional(fn.bind(this));
      } else {
        fn.apply(this);
      }
    });

    setTimeout(function() {
      tour.start();
    }, 0);
  };

  var closeSteps = Promulgation.shepherd.closeSteps = function() {
    tour.cancel();
  };

  $(addSteps);
})();
