(function() {
  Promulgation.confirm = function(msg, success, failure) {
    if (window.confirm(msg)) {
      if (success) success(); 
    } else {
      if (failure) failure();
    }
  };
})();
