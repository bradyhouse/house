
if ( !window.requestAnimationFrame ) {
  window.requestAnimationFrame = ( function() {
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element ) {
        window.setTimeout( callback, 1000 / 60 );
      };
  } )();
}

app.controller = app.controller || {
    topImage: null,
    onDOMContentLoaded: function () {
      try {
        console.log("%c" + app.metadata.consoleTag, 'font-style: italic; font-size: 20px;');
        console.log("%c" + app.metadata.gitHubUrl, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
        $(document).load(app.metadata.dataUrl);
        $(document).ajaxComplete(this.onAjaxComplete);
      } catch (err) {
        document.write(JSON.stringify(err));
      }
    },
    onAjaxComplete: function (event, xhr, settings) {
      if (settings.url === app.metadata.dataUrl) {
        app.model.PhotoAlbum = new PhotoAlbum({
          json: JSON.parse(xhr.responseText)
        });
        window.setTimeout(function() {
          app.controller.init();
        }, 500);
      }
    },
    init: function () {

      var objects = [],
        center = {
          x: $(document).width() / 2,
          y: $(document).height() / 2,
        };

      app.controller.canvas = new Canvas({
        hook: 'fiddle',
        width: window.innerWidth,
        height: window.innerHeight,
        onImageClick: app.controller.onImageClick
      });

      app.model.PhotoAlbum.children.map(function(photo, index) {
        var radius = $(document).width() < $(document).height() ? $(document).width() / 2 : $(document).height() / 2,
          randX = Util.rand(0, $(document).width()),
          randY = Util.rand(0, $(document).height()),
          dur = 5000,
          circularPathArr = Util.toCircularPointArray(randX, randY, radius),
          startingIndex = Util.rand(0, circularPathArr.length - 1),
          startingPoint = circularPathArr[startingIndex],
          reorderedPathArr = Util.reorderFrom(circularPathArr, startingIndex),
          x = Util.flattenToValues(reorderedPathArr, 'x'),
          y = Util.flattenToValues(reorderedPathArr, 'y');

        objects.push(new Image({
          id: photo.title,
          controller: app.controller,
          width: objects.length % 4 === 0 ? Math.floor((+photo.width) / 4) : Math.floor((+photo.width) / 6),
          height: objects.length % 4 === 0 ? Math.floor((+photo.height) / 4) : Math.floor((+photo.height) / 6),
          left: startingPoint.x,
          top: startingPoint.y,
          url: photo.url,
          onImageLoad: app.controller.onImageLoad
        }));
      });
    },

    onImageClick: function(image) {
      var topImage = app.controller.topImage ? app.controller.topImage : null;

      if (topImage) {
        image.setWidth(topImage.width);
        image.setHeight(topImage.height);
        image.setLeft(topImage.left);
        image.setTop(topImage.top);
        app.controller.canvas.fabric.remove(topImage);
        app.controller.topImage = null;
      } else {
        topImage = jQuery.extend(true, {}, image);
        topImage.scaleToHeight(window.innerHeight);
        app.controller.canvas.fabric.add(topImage);
        app.controller.canvas.fabric.setActiveObject(topImage);
        topImage.center();
        app.controller.topImage = topImage;
      }
    },

    onImageLoad: function(image) {
      if (app.controller.canvas) {
        app.controller.canvas.fabric.add(image);
      }
    }

  };

$(document).ready(function () {
  app.controller.onDOMContentLoaded();
});



