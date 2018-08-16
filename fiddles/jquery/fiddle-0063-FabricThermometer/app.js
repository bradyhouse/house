(function (app, $, undefined) {
  "use strict";

  class level {
    constructor (top, height) {
      this.top = top;
      this.height = height;
    }
  }

  app.view = app.view || {

    header: '2018 November',
    goal: 50000,
    donations: 0,
    baseColor: 'black',
    fontFamily: 'Quicksand',
    canvas: null,
    renderThermometer: function () {

      this.canvas = this.canvas || new window.fabric.Canvas('fiddle');

      var canvas = this.canvas,
        header = new fabric.Text(this.header, {
          fontFamily: this.fontFamily,
          left: 10,
          fill: this.baseColor,
          top: 0,
          width: 150,
          fontSize: 50
        }),
        goalHeader = new fabric.Text('Goal: ' + this.formatDollarAmt(this.goal), {
          fontFamily: this.fontFamily,
          left: 10,
          top: 75,
          fill: this.baseColor,
          width: 150,
          fontSize: 40
        }),
        manicusLevel = this.calcLevel(),
        manicusLabel = new fabric.Text(this.formatDollarAmt(this.donations), {
          fontFamily: this.fontFamily,
          left: 101.25,
          top: manicusLevel.top,
          fill: this.baseColor,
          width: 150,
          fontSize: 40,
          id: 'manicusLabel'
        }),
        manicus = new fabric.Rect({
          top: manicusLevel.top,
          left: 29.500002,
          width: 31.75,
          height: manicusLevel.height,
          strokeWidth: 4,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          fill: this.baseColor,
          id: 'manicus'
        }),
        mercury = new fabric.Path('m81,474a35.5,35.5 0 1 1 -71,0a35.5,35.5 0 1 1 71,0z',
          {
            fill: this.baseColor,
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
          stroke: this.baseColor
        }),
        thermometer = new fabric.Group([glass, mercury, manicus, manicusLabel], {
                                        left: 10,
                                        top: 150,
                                        angle: 0,
                                        selectable: false
          }),
          control = new fabric.Group([header, goalHeader, thermometer], {
            left: 100,
            top: 0,
            angle: 0,
            selectable: false
          });
      canvas.setWidth(Math.floor(window.innerWidth * .3));
      canvas.setHeight(Math.floor(window.innerHeight * .5));
      canvas.add(control);
      canvas.setZoom(window.innerWidth / window.innerHeight);
      canvas.deactivateAll();
    },
    calcLevel: function() {
      let _donations = +this.donations,
        _goal = +this.goal,
        scale = _donations / _goal,
        delta = scale * 400,
        deltaTop = 436.75 - delta,
        deltaHeight = 6.25 + delta;

      if (_donations <= 0) {
        return new level(436.75, 6.25);
      }
      if (_donations >= _goal) {
        return new level(36.75, 406.25);
      }
      return new level(deltaTop, deltaHeight);
    },
    donationsChange: function () {
      var value = document.getElementById('donationTxt').value,
        amt = value && !isNaN((+value)) ? (+value) : null;
      if (amt) {
        this.donations = amt;
        return true;
      } else {
        alert('Enter a valid Donation Amount');
        document.getElementById('donationTxt').focus();
        return false;
      }
    },
    goalChange: function() {
      var value = document.getElementById('goalTxt').value,
        amt = value && !isNaN((+value)) ? (+value) : null;
      if (amt) {
        this.goal = amt;
        return true;
      } else {
        alert('Enter a valid Goal Amount');
        document.getElementById('goalTxt').focus();
        return false;
      }
    },
    formatDollarAmt: function (amt) {
      return '$' + (+amt).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },

    configureObservers: function() {
      var donationTxt = document.getElementById('donationTxt'),
        goalTxt = document.getElementById('goalTxt');
      if (donationTxt) {
        donationTxt.addEventListener('change', () => {
          if(this.donationsChange()) {
            this.canvas.clear();
            this.renderThermometer();
          }
      }, false);
      }
      if (goalTxt) {
        goalTxt.addEventListener('change', () => {
          if (this.goalChange()) {
            this.canvas.clear();
            this.renderThermometer();
          }
        });
      }
    },
    init: function () {
      this.configureObservers();
      window.setTimeout(() => {
        this.renderThermometer();
      }, 500);
    }
  };
  $(document).ready(function () {
    app.view.init();
  });
})(window.app = window.app || {}, jQuery)
