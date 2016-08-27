(function (app, $, undefined) {
  "use strict";

  app.view = app.view || {
      render: function () {
        var canvas = new window.fabric.Canvas('fiddle');
        var rect = new fabric.Rect({
          left: 100,
          top: 100,
          fill: 'red',
          width: 20,
          height: 20,
          angle: 45
        });
        canvas.setWidth(window.innerWidth);
        canvas.setHeight(window.innerHeight);

        canvas.add(rect);
      },
      init: function () {
        this.render();
      }
    };
  $(document).ready(function () {
    app.view.init();
  });
})(window.app = window.app || {}, jQuery)
