window.Promulgation = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Promulgation.formsCollection = new Promulgation.Collections.Forms();

    Promulgation.router = new Promulgation.Routers.Router({
      $el: $('.root')
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Promulgation.initialize();
});
