(function() {
  var tour;

  tour = new Shepherd.Tour({
    defaults: {
      classes: 'shepherd-theme-arrows'
      // scrollTo: true
    }
  });

  var addSteps = function() {
    [
      {
        words: 'Click here and allow me to walk you through some features!',
        attachTo: '.guest-button left'
      },
      {
        words: 'Now let us add a new form!',
        attachTo: '.add-form left'
      }
    ].forEach(function(step) {
      var selector = step.attachTo.split(' ').slice(0, -1).join(' ');
      if ($(selector).length) {
        tour.addStep({
          text: step.words,
          attachTo: step.attachTo,
          buttons: [
            {
              text: 'Next',
              action: tour.next
            }
          ]
        });
      }
    });

    setTimeout(function() {
      tour.start();
    }, 0);
  };

  $(addSteps);

  setTimeout(function() {
    Promulgation.router.on('route', addSteps);
  }, 1000);
})();
