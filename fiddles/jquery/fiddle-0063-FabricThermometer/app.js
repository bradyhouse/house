(function (app, $, undefined) {
  "use strict";

  app.view = app.view || {
    render: function () {
      var
        baseColor = 'skyblue',
        canvas = new window.fabric.Canvas('fiddle'),
        manicus = new fabric.Rect({
          top: 436.75,
          left: 29.500002,
          width: 31.75,
          height: 6.25,
          strokeWidth: 4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          fill: baseColor
        }),
        scale = this.buildScale(baseColor),
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
          strokeWidth: 4,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          stroke: baseColor
        }),
        thermometer = new fabric.Group([glass, mercury, manicus,
                                        scale[18], scale[17],
                                        scale[16], scale[15], scale[14],
                                        scale[13], scale[12], scale[11],
                                        scale[10], scale[9], scale[8],
                                        scale[7], scale[6], scale[5],
                                        scale[4], scale[3], scale[2],
                                        scale[1], scale[0]], {
                                        left: 150,
                                        top: 100,
                                        angle: 0
        });

      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);

      canvas.add(thermometer);
      canvas.setZoom(.5);

    },
    buildScale: function(baseColor) {
      return [
        new fabric.Line([67.200002,425.5,91.200001, 425.5], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick19'
        }),
        new fabric.Line([114.950011,406.949995,67.249038, 406.949995], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick18'
        }),
        new fabric.Line([67.350392,388.800781,91.350391, 388.800781], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick17'
        }),
        new fabric.Line([115.100402,370.250776,67.399429, 370.250776], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick16'
        }),
        new fabric.Line([67.350392,351.550781,91.350391, 351.550781], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick15'
        }),
        new fabric.Line([115.100402,333.000776,67.399429, 333.000776], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick14'
        }),
        new fabric.Line([67.27422,314.525391,91.274219, 314.525391], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick13'
        }),
        new fabric.Line([115.02423,295.975385,67.323257, 295.975385], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick12'
        }),
        new fabric.Line([67.424611,277.826172,91.42461, 277.826172], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick11'
        }),
        new fabric.Line([67.424611,277.826172,91.42461, 277.826172], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick11'
        }),
        new fabric.Line([115.174621,259.276166,67.473647, 259.276166], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick10'
        }),
        new fabric.Line([67.424611,240.576172,91.42461, 240.576172], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick9'
        }),
        new fabric.Line([115.174621,222.026166,67.473647, 222.026166], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick8'
        }),
        new fabric.Line([67.27422,203.525391,91.274219, 203.525391], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick7'
        }),
        new fabric.Line([115.02423,184.975385,67.323257, 184.975385], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick6'
        }),
        new fabric.Line([67.424611,166.826172,91.42461, 166.826172], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick5'
        }),
        new fabric.Line([115.174621,148.276166,67.473647, 148.276166], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick4'
        }),
        new fabric.Line([67.424611,129.576172,91.42461, 129.576172], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick3'
        }),
        new fabric.Line([115.174621,111.026166,67.473647, 111.026166], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick2'
        }),
        new fabric.Line([67.350392,92.548828,91.350391, 92.548828], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick1'
        }),
        new fabric.Line([115.100402, 73.998823, 67.399429, 73.998823], {
          fill: 'none',
          stroke: baseColor,
          strokeWidth: 4,
          fillOpacity: '0.75',
          id: 'tick0'
        })
      ];
    },
    init: function () {
      this.render();
    }
  };
  $(document).ready(function () {
    app.view.init();
  });
})(window.app = window.app || {}, jQuery)
