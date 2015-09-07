window.Promulgation = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  displacedViews: {},
  initialize: function() {
    Promulgation.formsCollection = new Promulgation.Collections.Forms();
    Promulgation.submissionsCollection = new Promulgation.Collections.Submissions();

    this.$el = $('.root');

    Promulgation.router = new Promulgation.Routers.Router();

    Promulgation.onViewRender(function() {
      Promulgation.shepherd.closeSteps();
      Promulgation.shepherd.addSteps();
    });

    Promulgation.router.on('route', function() {
      Promulgation.shepherd.closeSteps();
    });
  },

  _onPromulgate: [],
  onPromulgate: function(callback) {
    this._onPromulgate.push(callback);
  },
  triggerPromulgate: function() {
    this._onPromulgate.forEach(function(callback) {
      callback();
    });
  },

  //
  //
  //

  _view: undefined,
  swapView: function(view) {
    if (this.view) this.view.remove();
    this.view = view;
    this.$el.html(view.$el);
    view.render();
    view.onRender && view.onRender();

    this._callOnViewRender();
    this._bindOnViewRender();

    $('[autofocus]').first().focus();
  },

  _onViewRenderCallbacks: [],
  onViewRender: function(callback) {
    this._onViewRenderCallbacks.push(callback);
  },
  _callOnViewRender: function() {
    this._onViewRenderCallbacks.forEach(function(callback) {
      callback();
    });
  },
  _bindOnViewRender: function() {
    this._onViewRenderCallbacks.forEach(function(callback) {
      if (this.view._onViewRenderCallbacking) return;
      this.view.on('render subview:render', callback);
      this.view._onViewRenderCallbacking = true;
    }.bind(this));
  }
};
