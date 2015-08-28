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

    var tour;

    tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
        scrollTo: true
      }
    });

    

  }
};
