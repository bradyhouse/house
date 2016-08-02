app.controller = app.controller || {
    responseText: null,
    onDOMContentLoaded: function () {

      $('#fiddleHook').width($(document).width());
      $('#fiddleHook').height($(document).height());

      $(document).load("feed.json");
      $(document).ajaxComplete(this.onAjaxComplete);

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
        window.setTimeout(() => {
          app.controller.init();
        }, 500);
      }
    },
    topImage: null,
    onImageClick: function (image) {
      let fiddleHook = document.getElementById('fiddleHook'),
        svg = fiddleHook ? fiddleHook.shadowRoot.getElementById('fiddle') : null,
        topImage = new Image({
          id: image.getAttribute('id') + '_topImage',
          width: window.innerWidth,
          height: window.innerHeight,
          x: 0,
          y: 0,
          xlinkHref: image.getAttribute('xlink:href'),
          onclick: 'app.controller.onImageRestore(this)'
        });
      app.controller.topImage = topImage;
      if (svg) {
        svg.innerHTML += topImage.docElementNS.outerHTML;
      }
    },
    onImageRestore: function (image) {
      let fiddleHook = document.getElementById('fiddleHook'),
        svg = fiddleHook ? fiddleHook.shadowRoot.getElementById('fiddle') : null;
      if (svg) {
        svg.removeChild(image);
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
          x: $(document).width() / 2,
          y: $(document).height() / 2,
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
        height: $(document).height(),
        width: $(document).width(),
        fill: 'url(#gridPattern)'
      }));

      app.model.PhotoAlbum.children.map((photo, index) => {
        let radius = $(document).width() < $(document).height() ? $(document).width() / 2 : $(document).height() / 2,
        randX = Util.rand(0, $(document).width()),
        randY = Util.rand(0, $(document).height()),
        dur = Util.rand(120, 240) + 's',
        circularPathArr = Util.toCircularPointArray(randX, randY, radius),
        startingIndex = Util.rand(0, circularPathArr.length-1),
        startingPoint = circularPathArr[startingIndex],
        reorderedPathArr = Util.reorderFrom(circularPathArr, startingIndex),
        animatedValues1 = Util.flattenToValues(reorderedPathArr, 'x'),
        animatedValues2 = Util.flattenToValues(reorderedPathArr, 'y'),
        animateX = new Animate({
          attributeName: 'x',
          dur: dur,
          values: animatedValues1,
          repeatCount: 'indefinite'
        }),
        animateY = new Animate({
          attributeName: 'y',
          dur: dur,
          values: animatedValues2,
          repeatCount: 'indefinite'
        }),
        animateOpacity = new Animate({
          attributeName: 'opacity',
          values: '1;.9;.8;.7;.6;.5;.6;.7;.8;.9',
          dur: dur,
          repeatCount: 'indefinite'
        });

      if (index === 10) {
        console.log(startingPoint.x + ', ' + animatedValues1);
        console.log(startingPoint.y + ', ' + animatedValues2);
      }

      objects.push(new Image({
        id: photo.title,
        width: objects.length % 4 === 0 ? Math.floor((+photo.width) / 4) : Math.floor((+photo.width) / 6),
        height: objects.length % 4 === 0 ? Math.floor((+photo.height) / 4) : Math.floor((+photo.height) / 6),
        x: startingPoint.x,
        y: startingPoint.y,
        xlinkHref: photo.url,
        opacity: '.5',
        onclick: 'app.controller.onImageClick(this)',
        children: [animateOpacity, animateX, animateY]
      }));

    });



      app.view.Viewport = new Viewport({
        hook: fiddleHook,
        children: objects
      });

      document.body.style.background = '#000000';

    }
  };

document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);



