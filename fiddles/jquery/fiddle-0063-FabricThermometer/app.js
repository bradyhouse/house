(function (app, $, undefined) {
  "use strict";

  app.view = app.view || {
    render: function () {
      var
        baseColor = '#0195e7',
        canvas = new window.fabric.Canvas('fiddle'),
        header = new fabric.Text('2017 Movember', {
          fontFamily: 'Quicksand',
          left: 10,
          fill: baseColor,
          top: 0,
          width: 150,
          fontSize: 50
        }),

        goalHeader = new fabric.Text('Goal: $50,000', {
          fontFamily: 'Quicksand',
          left: 10,
          top: 75,
          fill: baseColor,
          width: 150,
          fontSize: 40
        }),

        manicusLabel = new fabric.Text('$0', {
          fontFamily: 'Quicksand',
          left: 101.25,
          top: 436.75,
          fill: baseColor,
          width: 150,
          fontSize: 40,
          id: 'manicusLabel'
        }),


        manicus = new fabric.Rect({
          top: 436.75,
          left: 29.500002,
          width: 31.75,
          height: 6.25,
          strokeWidth: 4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          fill: baseColor,
          id: 'manicus'
        }),
        mercury = new fabric.Path('m81,474a35.5,35.5 0 1 1 -71,0a35.5,35.5 0 1 1 71,0z',
          {
            fill: baseColor,
            fillRule: 'nonzero',
            strokeDashoffset: 0,
            strokeMiterlimit: 4,
            strokeWidth: 4,
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          }),
        glass = new fabric.Path('m45.5,11c-9.8335,0 -17.75,7.9165 -17.75,17.75l0,412.999512c-10.610411,6.140503' +
          '-17.75,17.617615 -17.75,30.750488c0,19.596008 15.903999,35.5 35.5,35.5c19.596001,0 35.5,' +
          '-15.903992 35.5,-35.5c0,-13.132874 -7.13958,-24.609985 -17.75,-30.750488l0,-412.999512c0,-9.8335' +
          '-7.9165,-17.75 -17.75,-17.75z', {
          fill: 'white',
          fillRule: 'nonzero',
          strokeDashoffset: 0,
          strokeMiterlimit: 4,
          strokeWidth: 10,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          stroke: baseColor
        }),
        thermometer = new fabric.Group([glass, mercury, manicus, manicusLabel], {
                                        left: 10,
                                        top: 150,
                                        angle: 0
        }),
        control = new fabric.Group([header, goalHeader, thermometer], {
          left: 0,
          top: 0,
          angle: 0
        });


      canvas.setWidth(Math.floor(window.innerWidth * .5));
      canvas.setHeight(Math.floor(window.innerHeight * .5));
      canvas.add(control);
      canvas.setZoom(.5);

    },
    add: function() {
      console.log('add');
      var manicus = document.getElementById('manicus');
      
    },

    subtract: function() {
      console.log('subtract');

    },

    init: function () {
      var addBtn = document.getElementById('addBtn'),
        subtractBtn = document.getElementById('subtractBtn');
      addBtn.onclick = this.add;
      subtractBtn.onclick = this.subtract;

      this.render();
    }
  };
  $(document).ready(function () {
    app.view.init();
  });
})(window.app = window.app || {}, jQuery)
