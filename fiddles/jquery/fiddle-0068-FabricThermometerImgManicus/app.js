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
    deltaDonations: 0,
    lineColor: '#fff',
    textColor: '#fff',
    innerColor: 'hotpink',
    fontFamily: 'Cabin Sketch',
    manicusImg: 'data:image/png;base64,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',
    manicusImgScaleX: 0,
    manicusImgScaleY: 0,
    manicusImgLeft: 0,
    isManicusImgChanged: false,
    manicusLoadedImg: null,
    canvas: null,
    manicusLevel: null,
    loader: null,

    parseImage: function (files, view) {
      for (var i = 0; i < files.length; i++) {
        let file = files[i],
          reader = new FileReader();
        reader.onload = ((txt) => {
          return (e) =>  {
            view.manicusImg = e.target.result;
            view.deltaDonations = 0;
            view.canvas.clear();
            view.renderLoop();
          };
        })(view);
        reader.readAsDataURL(file);
      }
    },

    renderThermometer: function () {

      this.canvas = this.canvas || new window.fabric.Canvas('fiddle');
      //fabric.Object.prototype.transparentCorners = false;

      this.canvas.clear();
      this.manicusLevel = this.calcLevel();
      let canvas = this.canvas,
        header = new fabric.Text(this.header, {
          fontFamily: this.fontFamily,
          left: 10,
          fill: this.textColor,
          top: 0,
          width: 150,
          fontSize: 50
        }),
        goalHeader = new fabric.Text('Goal: ' + this.formatDollarAmt(this.goal), {
          fontFamily: this.fontFamily,
          left: 10,
          top: 75,
          fill: this.textColor,
          width: 150,
          fontSize: 40
        }),
        manicusLabel = new fabric.Text(this.formatDollarAmt(this.deltaDonations), {
          fontFamily: this.fontFamily,
          left: 110.25,
          top: this.manicusLevel.top,
          fill: this.textColor,
          width: 150,
          fontSize: 40,
          id: 'manicusLabel'
        }),
        manicus = new fabric.Rect({
          top: this.manicusLevel.top,
          left: 29.500002,
          width: 31.75,
          height: this.manicusLevel.height,
          strokeDashoffset: 10,
          strokeMiterlimit: 10,
          strokeWidth: 10,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          fill: this.innerColor,
          id: 'manicus'
        }),
        mercury = new fabric.Path('m81,474a35.5,35.5 0 1 1 -71,0a35.5,35.5 0 1 1 71,0z',
          {
            fill: this.innerColor,
            fillRule: 'nonzero',
            strokeDashoffset: 10,
            strokeMiterlimit: 10,
            strokeWidth: 10,
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          }),
        glass = new fabric.Path('m45.5,11c-9.8335,0 -17.75,7.9165 -17.75,17.75l0,412.999512c-10.610411,6.140503' +
          '-17.75,17.617615 -17.75,30.750488c0,19.596008 15.903999,35.5 35.5,35.5c19.596001,0 35.5,' +
          '-15.903992 35.5,-35.5c0,-13.132874 -7.13958,-24.609985 -17.75,-30.750488l0,-412.999512c0,-9.8335' +
          '-7.9165,-17.75 -17.75,-17.75z', {
          fill: 'white',
          fillRule: 'nonzero',
          strokeDashoffset: 10,
          strokeMiterlimit: 10,
          strokeWidth: 10,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          stroke: this.lineColor
        });


      fabric.Image.fromURL(this.manicusImg, (img) => {
        let imageTop = this.manicusLevel.top;

        img.scale(.8).set({
          left: canvas.width * .5,
          top: canvas.height *.5,
          selectable: true,
          id: 'manicus'
        });

        canvas.on('object:scaling', function(opt){
          var imgScaleX = document.getElementById('imgScaleX'),
            imgScaleY = document.getElementById('imgScaleY'),
            scaleX = opt.target.scaleX,
            scaleY = opt.target.scaleY;
          imgScaleX.value = scaleX;
          imgScaleY.value = scaleY;
        });

        canvas.on('object:moving', function(opt){
          var imgLeft = document.getElementById('imgLeft'),
              left = opt.target.left;
          imgLeft.value = left;
        });

        let thermometer = new fabric.Group([glass, mercury, manicus, manicusLabel], {
            left: 10,
            top: 150,
            angle: 0
          }),
          control = new fabric.Group([header, goalHeader, thermometer]);

        control.set({
          top: 0,
          left: 0,
          scaleY: canvas.height / control.height,
          scaleX: canvas.width / control.width,
          selectable: false
        });

        canvas.add(control);
        canvas.add(img);
        canvas.renderAll();
      });

    },
    renderLoop: function() {
      if (this.donations === 0) {
        this.renderThermometer();
      } else {
        if((this.deltaDonations + 1000) < this.donations) {
          this.renderThermometer();
          window.setTimeout(() => {
            this.deltaDonations = this.deltaDonations + 1000;
            this.renderLoop();
          },25);
        } else {
          this.deltaDonations = this.donations;
          this.renderThermometer();
        }
      }
    },
    calcLevel: function() {
      let _donations = +this.deltaDonations,
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
    titleChange: function() {
      var title = document.getElementById('titleTxt').value;
      if (title) {
        this.header = title;
        return true;
      } else {
        return false;
      }
    },
    formatDollarAmt: function (amt) {
      return '$' + (+amt).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },
    configureObservers: function() {
      var donationTxt = document.getElementById('donationTxt'),
        goalTxt = document.getElementById('goalTxt'),
        titleTxt = document.getElementById('titleTxt'),
        imageUpload = document.getElementById('imageUpload');
      if (donationTxt) {
        donationTxt.addEventListener('change', () => {
          if(this.donationsChange()) {
            this.deltaDonations = 0;
            this.canvas.clear();
            this.renderLoop();
          }
        });
      }
      if (goalTxt) {
        goalTxt.addEventListener('change', () => {
          if (this.goalChange()) {
            this.deltaDonations = 0;
            this.canvas.clear();
            this.renderLoop();
          }
        });
      }
      if (titleTxt) {
        titleTxt.addEventListener('change', () => {
          if (this.titleChange()) {
            this.deltaDonations = 0;
            this.canvas.clear();
            this.renderLoop();
          }
        });
      }
      if (imageUpload) {
        imageUpload.addEventListener('change', () => {
          let files = imageUpload.files;
          if (files && files.length) {
            this.parseImage(files, this);
          }
        });
      }

    },
    init: function () {
      this.configureObservers();
      window.setTimeout(() => {
        this.renderLoop();
      }, 1000);
    }
  };
  $(document).ready(function () {
    app.view.init();
  });
})(window.app = window.app || {}, jQuery)
