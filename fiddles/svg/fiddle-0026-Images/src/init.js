app.controller = app.controller || {
    onDOMContentLoaded: function () {
      var fiddle = document.getElementById('fiddleHook');
      app.view.Viewport = new Viewport({
        hook: fiddle
      });
    }
  };


/**
 * "Debug" Jasmine testing hooks.
 */
app.test = window.location.pathname.match('test') ? app.test || {
  group: (config) => {
    return new Group(config);
  },
  surface: (config) => {
    return new Surface(config);
  },
  path: (config) => {
    return new Path(config);
  },
  xmlNamespaces: () => {
    return Util.xmlNamespaces();
  },
  splitAttribute: (field, id, defVal) => {
    return Util.splitAttribute(field, id, defVal);
  },
  mapFromQueryString: (url, parameter) => {
    return Util.mapFromQueryString(url, parameter);
  },
  color: () => {
    return Util.color();
  },
  rectangle: (config) => {
    return new Rectangle(config);
  },
  text: (config) => {
    return new Text(config);
  },
  circle: (config) => {
    return new Circle(config);
  },
  image: (config) => {
    return new Image(config);
  }
} : null;

if (!window.location.pathname.match('test')) {
  document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
}


