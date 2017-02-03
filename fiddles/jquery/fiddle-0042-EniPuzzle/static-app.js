(function (app, $, undefined) {
  "use strict";

  app.generateGuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  app.onDragStart = function (event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.dropEffect = 'none';
  };

  app.onDragOver = function (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'
  };

  app.onDrop = function (event) {
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(data));
    app.view.createDraggableLink(app.hook);
  };

  app.view = app.view || {
      createDraggableLink: function (hookEl) {
        let el = window.document.createElement('div');
        el.setAttribute('id', app.generateGuid());
        el.setAttribute('draggable', 'true');
        el.setAttribute('ondragstart', 'app.onDragStart(event)');
        el.setAttribute('style', 'background-color: black; color: white; width: 100%;');
        el.innerHTML = 'drag to drop - ' + el.id + '<br/>';
        hookEl.appendChild(el);
      },
      createDropZone: function (hookEl) {
        let elTitle = window.document.createElement('div'),
          el = window.document.createElement('div');
        el.setAttribute('ondrop', 'app.onDrop(event)');
        el.setAttribute('ondragover', 'app.onDragOver(event)');
        el.setAttribute('style', 'position: absolute; bottom: 10%; width: 100%; background-color: black; color: white; vertical-align: top; padding: 1%;');
        el.innerHTML = 'drop<br/>';
        hookEl.appendChild(el);
        hookEl.appendChild(elTitle);

      },
      init: function () {
        let hook = document.getElementById('fiddleHook');
        app.hook = hook;
        app.view.createDropZone(hook);
        app.view.createDraggableLink(hook);
      }
    };

  $(document).ready(function () {
    app.view.init();
  });

})(window.app = window.app || {}, jQuery)
