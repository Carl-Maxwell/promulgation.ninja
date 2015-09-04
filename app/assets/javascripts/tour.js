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

    tour.steps = [];

    [
      {
        id: 'guest-login',
        words: 'Click here and allow me to walk you through some features!',
        attachTo: '.guest-button left'
      },
      {
        id: 'add-form',
        words: 'Let\'s add a new form!',
        attachTo: '.add-form left'
      },
      {
        id: 'textarea-button',
        words: 'Add a textarea to your form!',
        attachTo: '.textarea-button right'
      },
      {
        id: 'name-textarea',
        words: 'Give your textarea a name',
        attachTo: '[name="label"] right'
      },
      {
        id: 'textarea-properties',
        words: 'Click on your textarea to give it a name!',
        attachTo: '.form-edit-actuals textarea left'
      }
    ].forEach(function(step) {
      if (shepherd.markedSteps.indexOf(step.id) != -1) return;

      var selector = step.attachTo.split(' ').slice(0, -1).join(' ');

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
    });

    setTimeout(function() {
      tour.start();
    }, 0);
  };

  var closeSteps = Promulgation.shepherd.closeSteps = function() {
    var step = tour.getCurrentStep();

    debugger

    if (step) step.cancel();
  };

  $(addSteps);
})();
