window.Promulgation = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  displacedViews: {},
  _onPromulgate: [],
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
      Promulgation.shepherd.closeSteps();
    });
  },

  view: undefined,
  swapView: function() {
    
  },

  onPromulgate: function(callback) {
    this._onPromulgate.push(callback);
  },
  triggerPromulgate: function() {
    this._onPromulgate.forEach(function(callback) {
      callback();
    });
  },
  formHasTextarea: function() {

    Promulgation.router.

    return Promulgation.router.formHasTextarea();
  }
};
