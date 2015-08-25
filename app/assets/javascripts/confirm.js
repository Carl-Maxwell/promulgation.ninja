(function() {
  Promulgation.confirm = function(msg, callback) {
    if (window.confirm(msg)) callback();
  };
})();
