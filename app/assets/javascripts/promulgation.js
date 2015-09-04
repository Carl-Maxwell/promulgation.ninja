window.Promulgation = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  displacedViews: {},
  initialize: function() {
    Promulgation.formsCollection = new Promulgation.Collections.Forms();
    Promulgation.submissionsCollection = new Promulgation.Collections.Submissions();

    Promulgation.router = new Promulgation.Routers.Router({
      $el: $('.root')
    });

    Promulgation.router.onViewRender(function() {
      Promulgation.shepherd.closeSteps();
      Promulgation.shepherd.addSteps();
    });

    Promulgation.router.on('route', function() {
      tour.cancel();
    });
  }
};
