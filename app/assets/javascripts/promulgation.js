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
  }
};
