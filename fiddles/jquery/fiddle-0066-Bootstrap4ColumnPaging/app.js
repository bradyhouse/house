(function (app, $, undefined) {
  "use strict";

  app.view = app.view || {
    paintBackground: function() {
      window.setTimeout(() => {
        var idx = Math.floor((new Date().getHours())),
          body = document.getElementsByTagName("body")[0];
        body.className = "heaven-" + idx;
      }, 500);
    },
  };

  $(document).ready(function () {
    app.view.paintBackground();
  });

})(window.app = window.app || {}, jQuery)
