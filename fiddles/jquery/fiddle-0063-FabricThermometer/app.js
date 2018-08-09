(function (app, $, undefined) {
  "use strict";


  /**
   * <path
   * d="m45.5,11c-9.8335,0 -17.75,7.9165 -17.75,17.75l0,412.999512c-10.610411,6.140503
   -17.75,17.617615 -17.75,30.750488c0,19.596008 15.903999,35.5 35.5,35.5c19.596001,0 35.5,
   -15.903992 35.5,-35.5c0,-13.132874 -7.13958,-24.609985 -17.75,-30.750488l0,-412.999512c0,-9.8335 -7.9165,-17.75 -17.75,-17.75z"
   * id="rect2968"
   * stroke-dashoffset="0" stroke-miterlimit="4" stroke-linejoin="round" stroke-linecap="round" stroke-width="4" stroke="black" fill-rule="nonzero" fill="none"/>
   */

  app.view = app.view || {
    render: function () {
      var canvas = new window.fabric.Canvas('fiddle'),
        manicus = new fabric.Rect({
          top: 436.75,
          left: 29.500002,
          width: 31.75,
          height: 6.25,
          strokeWidth: 4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          fill: '#c00'
        }),
        mercury = new fabric.Path('m81,474a35.5,35.5 0 1 1 -71,0a35.5,35.5 0 1 1 71,0z',
          {
            fill: '#c00',
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
          strokeWidth: 4,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          stroke: 'black'
        }),
        thermometer = new fabric.Group([glass, mercury, manicus], {
          left: 150,
          top: 100,
          angle: 0
        });

      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);

      canvas.add(thermometer);
      canvas.setZoom(.5);

    },
    init: function () {
      this.render();
    }
  };
  $(document).ready(function () {
    app.view.init();
  });
})(window.app = window.app || {}, jQuery)
