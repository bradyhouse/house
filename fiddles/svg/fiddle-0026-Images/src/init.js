app.controller = app.controller || {
    onDOMContentLoaded: function () {
      var fiddle = document.getElementById('fiddleHook');
      document.body.style.background = '#ffffff';
      app.view.Viewport = new Viewport({
        hook: fiddle
      });
    }
  };

document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);



