app.controller = app.controller || {
    responseText: null,
    onDOMContentLoaded: function () {
      /**
       * (1) Load feed.json
       */

      $(document).load("feed.json");
      $(document).ajaxComplete(this.onAjaxComplete);


      /*var fiddleHook = document.getElementById('fiddleHook');
       app.view.Viewport = new Viewport({
       hook: fiddleHook
       });*/
    },
    onAjaxComplete: function (event, xhr, settings) {
      /**
       * (2) On Ajax complete, parse a list of image urls
       * (3) Iterate the list (2) and build a collection of Images
       */
      if (settings.url === "feed.json") {
        app.model.PhotoAlbum = new PhotoAlbum({
          json: JSON.parse(xhr.responseText)
        });
        app.controller.init();
      }
    },
    init: function () {
      /**
       * (4) Create an SVG element
       * (5) Inject the Image collection (3) into the SVG element
       * (6) Render (bind) the SVG element via shadow dom
       *
       *  cx: app.util.rand(0, $("#fiddleHook").width()),
       cy: app.util.rand(0, $("#fiddleHook").height()),
       */

      let fiddleHook = document.getElementById('fiddleHook'),
        objects = [],
        center = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        },
        quadrantWidth = window.innerWidth / 3.5,
        quadrantHeight = window.innerHeight / 3.5,
        quadrant1 = {
          range: {
            x1: center.x,
            y1: center.y,
            x2: center.x + quadrantWidth,
            y2: center.y + quadrantHeight
          }
        },
        quadrant2 = {
          range: {
            x1: center.x - quadrantWidth,
            y1: center.y,
            x2: center.x,
            y2: center.y + quadrantHeight
          }
        },
        quadrant3 = {
          range: {
            x1: center.x - quadrantWidth,
            y1: center.y,
            x2: center.x,
            y2: center.y - quadrantHeight
          }
        },
        quadrant4 = {
          range: {
            x1: center.x,
            y1: center.y,
            x2: center.x + quadrantWidth,
            y2: center.y - quadrantHeight
          }
        },

        pickQuadrant=function(arr) {
          if (arr.length % 4 === 0) {
            return quadrant4;
          } else if (arr.length % 3 === 0) {
            return quadrant3;
          } else if (arr.length % 2 === 0) {
            return quadrant2;
          } else {
            return quadrant1;
          }
        };

      objects.push(new Pattern({
        id: 'gridPattern',
        width: 10,
        height: 10,
        units: 'userSpaceOnUse',
        children: [
          new Path({
            data: 'M10 0 L0 0 L0 10',
            fill: null,
            stroke: 'yellow',
            strokeWidth: '0.25'
          })
        ]
      }));

      objects.push(new Rectangle({
        id: 'root',
        x: 0,
        y: 0,
        height: window.innerHeight,
        width: window.innerWidth,
        fill: 'url(#gridPattern)'
      }));

      app.model.PhotoAlbum.children.map((photo) => {
            let quad = pickQuadrant(objects);
            objects.push(new Image({
              id: photo.title,
              width: objects.length % 4 === 0 ? Math.floor((+photo.width) / 4) : Math.floor((+photo.width) / 6),
              height: objects.length % 4 === 0 ? Math.floor((+photo.height) / 4) : Math.floor((+photo.height) / 6),
              x: Util.rand(quad.range.x1, quad.range.x2),
              y: Util.rand(quad.range.y1, quad.range.y2),
              xlinkHref: photo.url
            }));
      });



      app.view.Viewport = new Viewport({
        hook: fiddleHook,
        children: objects
      });

      document.body.style.background = '#000000';

    },




  };

document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);



