(function (app, $, undefined) {
  "use strict";
  app.model = function () {
    return [
      'a',
      'A',
      'd',
      'do',
      'dd',
      'ddd',
      'dddd',
      'D',
      'Do',
      'DD',
      'DDD',
      'DDDo',
      'DDDD',
      'e',
      'E',
      'gg',
      'gggg',
      'GG',
      'GGGG',
      'h',
      'hh',
      'H',
      'HH',
      'mm',
      'M',
      'Mo',
      'MMM',
      'MMMM',
      'MM',
      's',
      'ss',
      'S',
      'SS',
      'SSS',
      'W',
      'Wo',
      'WW',
      'YY',
      'YYYY',
      'MM/DD/YYYY',
      'YYYY-MM-DD',
      'YYYY-MM-DD HH:mm:ss',
      'YYYY-MM-DD HH:mm ZZ',
      'YYYY-MM-DD HH:mm Z'
    ]
  };
  app.view = app.view || {
      render: function (hook) {
        let date = new Date();
        hook.append('date &#9;=&#9;' + date);
        hook.append('<br />');
        hook.append('<hr />');
        app.model().map((format) => {
          hook.append('<i>' + format + '</i> = ' + moment(date).format(format));
          hook.append('<br />');
        });
      },
      init: function () {
        var hook = $('#fiddleHook');
        this.render(hook);
      }
    };
  $(document).ready(function () {
    app.view.init();
  });
})(window.app = window.app || {}, jQuery)
