app.controller = app.controller || {
    onDomContentLoaded: function () {
      let docElement = window.document.getElementById('fiddleHook');
      app.board = app.board || new Board({
        hook: docElement,
        isSolved: true,
        autoBind: true
      })
    }
  };

  /**
 * "Debug" Jasmine testing hooks.
 */
app.test = window.location.pathname.match('test') ? app.test || {
  board: function(config) {
    return new Board(config);
  },
  row: function (config) {
    return new Row(config);
  },
  rows: function (config) {
    return new Rows(config);
  },
  square: function (config) {
    return new Square(config);
  },
  util: function () {
    return Util;
  }
} : null;

if (!window.location.pathname.match('test')) {
  document.body.addEventListener('DOMContentLoaded', app.controller.onDomContentLoaded(), false);
}
