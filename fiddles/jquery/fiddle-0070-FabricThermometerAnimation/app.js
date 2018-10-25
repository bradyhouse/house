(function (app, $, undefined) {
  "use strict";

  class Level {
    constructor(top, height) {
      this.top = top;
      this.height = height;
    }
  }

  class Coordinates {
    constructor(scaleX, scaleY, top, left) {
      this.scaleX = scaleX;
      this.scaleY = scaleY;
      this.top = top;
      this.left = left;
    }
  }

  class Frame {
    constructor(level, coordinates, amount) {
      this.level = level;
      this.coordinates = coordinates;
      this.amount = amount;
    }
  }

  class Scene {

    constructor() {
      this.frames = [];
    }

    add(frame) {
      this.frames.push(frame);
    }

  }

  class Thermometer {
    static mercury(innerColor) {
      return new fabric.Path('m81,474a35.5,35.5 0 1 1 -71,0a35.5,35.5 0 1 1 71,0z',
        {
          fill: innerColor,
          fillRule: 'nonzero',
          strokeDashoffset: 10,
          strokeMiterlimit: 10,
          strokeWidth: 10,
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        })
    }

    static header(text, fontFamily, textColor) {
      return new fabric.Text(text, {
        fontFamily: fontFamily,
        left: 10,
        fill: '#000',
        top: 0,
        width: 150,
        fontSize: 50,
        fontWeight: 200
      });
    }

    static goalHeader(text, fontFamily, textColor) {
      return new fabric.Text('Goal: ' + text, {
        fontFamily: fontFamily,
        left: 10,
        top: 75,
        fill: textColor,
        width: 150,
        fontSize: 40,
        fontWeight: 200
      });
    }

    static manicus(top, height, innerColor) {
      return new fabric.Rect({
        top: top,
        left: 29.500002,
        width: 31.75,
        height: height,
        strokeDashoffset: 10,
        strokeMiterlimit: 10,
        strokeWidth: 10,
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
        fill: innerColor,
        id: 'manicus'
      });
    }

    static manicusLabel(isEditMode, fontFamily, top, textColor, text) {
      if (isEditMode) {
        return new fabric.Text('$0', {
          fontFamily: fontFamily,
          left: 110.25,
          top: top,
          fill: textColor,
          width: 150,
          fontSize: 40,
          fontWeight: 200,
          id: 'manicusLabel'
        });
      }
      return new fabric.Text(text, {
        fontFamily: fontFamily,
        left: 110.25,
        top: top,
        fill: textColor,
        width: 150,
        fontSize: 40,
        fontWeight: 200,
        id: 'manicusLabel'
      });
    }

    static glass(lineColor) {
      return new fabric.Path('m45.5,11c-9.8335,0 -17.75,7.9165 -17.75,17.75l0,412.999512c-10.610411,6.140503' +
        '-17.75,17.617615 -17.75,30.750488c0,19.596008 15.903999,35.5 35.5,35.5c19.596001,0 35.5,' +
        '-15.903992 35.5,-35.5c0,-13.132874 -7.13958,-24.609985 -17.75,-30.750488l0,-412.999512c0,-9.8335' +
        '-7.9165,-17.75 -17.75,-17.75z', {
        fill: '#e5e5e5',
        fillRule: 'nonzero',
        strokeDashoffset: 10,
        strokeMiterlimit: 10,
        strokeWidth: 10,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        stroke: lineColor
      });
    }
  }

  app.view = app.view || {

    header: '2018 November',
    goal: 50000,
    donations: 30000,
    deltaDonations: 0,
    lineColor: '#e5e5e5',
    textColor: '#648baf',
    innerColor: '#0079C1',
    fontFamily: 'helvetica neue',
    manicusImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAABHppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDo1RjJFRjNFRTI5MjA2ODExODIyQUEyMzE4OTE4MURDQjwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDo1RjJFRjNFRTI5MjA2ODExODIyQUEyMzE4OTE4MURDQjwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDo4NEM0QjI5MDY3RTkxMUU2OTY4MjgzNDg1Qzc2REFBNTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo4NEM0QjI4RjY3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',
    manicusCoords: null,
    isNewManicusImg: false,
    isEditMode: false,
    manicusLoadedImg: null,
    canvas: null,
    manicusLevel: null,
    loader: null,
    scene: null,
    meniscusObject: null,
    meniscusLabelObject: null,
    meniscusImageObject: null,
    controlScaleX: 1.0,
    controlScaleY: 1.0,
    control: null,

    parseImage: function (files, view) {
      for (var i = 0; i < files.length; i++) {
        let file = files[i],
          reader = new FileReader();
        reader.onload = ((txt) => {
          return (e) => {
            view.manicusImg = e.target.result;
            view.deltaDonations = 0;
            view.isNewManicusImg = true;
            view.canvas.clear();
            view.renderThermometer();
          };
        })(view);
        reader.readAsDataURL(file);
      }
    },

    renderThermometer: function () {
      this.canvas = this.canvas || new window.fabric.Canvas('fiddle');
      this.canvas.clear();
      this.manicusCoords = this.scene.frames[0].coordinates;
      this.manicusLevel = this.scene.frames[0].level;
      let canvas = this.canvas,
        donations = this.scene.frames[0].amount,
        header = Thermometer.header(this.header, this.fontFamily, this.textColor),
        goalHeader = Thermometer.goalHeader(this.formatDollarAmt(this.goal), this.fontFamily, this.textColor),
        mercury = Thermometer.mercury(this.innerColor),
        glass = Thermometer.glass(this.lineColor);

      this.meniscusLabelObject = Thermometer.manicusLabel(this.isEditMode, this.fontFamily, this.manicusLevel.top, this.textColor,
        this.formatDollarAmt(donations));

      this.meniscusObject = Thermometer.manicus(this.manicusLevel.top, this.manicusLevel.height, this.innerColor);

      fabric.Image.fromURL(this.manicusImg, (img) => {

        canvas.on('object:scaling', (opt) => this.onObjectScale(opt));
        canvas.on('object:moving', (opt) => this.onObjectMove(opt));

        let thermometer = new fabric.Group([glass, mercury, this.meniscusObject, this.meniscusLabelObject], {
          left: 10,
          top: 150,
          angle: 0
        });

        this.control = new fabric.Group([header, goalHeader, thermometer]);

        this.control.set({
          top: 0,
          left: 0,
          scaleY: canvas.height / this.control.height,
          scaleX: canvas.width / this.control.width,
          selectable: false
        });

        this.controlScaleX = canvas.width / this.control.width;
        this.controlScaleY = canvas.height / this.control.height;

        this.meniscusImageObject = img;

        if (!this.isNewManicusImg) {
          let delta = this.manicusLevel.height === 6.25 ? 0 : this.manicusLevel.height * control.scaleY;

          img.set({
            left: this.manicusCoords.left,
            top: this.manicusCoords.top - delta,
            scaleX: this.manicusCoords.scaleX,
            scaleY: this.manicusCoords.scaleY,
            selectable: this.isEditMode,
            id: 'manicus'
          });
        } else {
          img.scale(.8).set({
            left: canvas.width * .5,
            top: canvas.height * .5,
            selectable: this.isEditMode,
            id: 'manicus'
          });
        }
        canvas.add(this.control);
        canvas.add(this.meniscusImageObject);
        canvas.renderAll();
        if (this.isEditMode) {
          canvas.setActiveObject(img);

        } else {
          canvas.deactivateAll();
        }
      });

    },
    buildScene: function () {
      let step = this.donations / 10;
      this.scene = new Scene();
      this.deltaDonations = 0;
      for (var i = 0; i <= 10; i++) {
        let level = this.calcLevel(),
          coordinates = this.calcCoors(),
          frame = new Frame(level, coordinates, this.deltaDonations);
        this.scene.add(frame);
        this.deltaDonations += step;
      }
    },
    renderScene: function () {
      let x = 0,
        i = 0;
      if (this.donations > 0) {
        fabric.util.animate({
          byValue: 1,
          duration: 1000,
          onChange: (value) => {
            if (x % 6 === 0) {

              if (this.scene.frames[i]) {
                if (i > 0) {
                  let frame = this.scene.frames[i],
                    deltaT = frame.level.height * this.controlScaleY,
                    top;

                  switch(i) {
                    case 1:
                      top = this.meniscusObject.getTop() - frame.level.height;
                      this.meniscusObject.set({
                        top: top,
                        height: frame.level.height + 16.25
                      });
                      break;
                    case 2:
                      top = this.meniscusObject.getTop() - frame.level.height;
                      this.meniscusObject.set({
                        top: top,
                        height: frame.level.height * 2 + 16.25
                      });
                      break;
                    case 3:
                      top = this.meniscusObject.getTop() - frame.level.height + 16.25;
                      this.meniscusObject.set({
                        top: top,
                        height: frame.level.height * 2 + 16.25
                      });
                      break;
                    case 4:
                      top = this.meniscusObject.getTop() - 20 + 16.25;
                      this.meniscusObject.set({
                        top: top,
                        height: frame.level.height * 1.6
                      });
                      break;
                    case 5:
                      top = this.meniscusObject.getTop() - 20 + 11.25;
                      this.meniscusObject.set({
                        top: top,
                        height: frame.level.height * 1.6
                      });
                      break;
                    case 7:
                      top = this.meniscusObject.getTop() - deltaT + 16.25;
                      this.meniscusObject.set({
                        top: top,
                        height: frame.level.height * 1.6
                      });
                      break;

                  }

                  this.meniscusLabelObject.setTop(frame.level.top - deltaT);
                  this.meniscusLabelObject.setText(this.formatDollarAmt(frame.amount));
                  this.meniscusImageObject.setTop(frame.coordinates.top - deltaT);
                  this.canvas.renderAll();

                }

                i++;
              }


            }
            x++;
          },
          onComplete: () => {
            let frame = this.scene.frames[10],
              deltaT = frame.level.height === 6.25 ? 0 : frame.level.height * this.controlScaleY;

            this.meniscusLabelObject.setTop(frame.level.top - deltaT);
            this.meniscusLabelObject.setText(this.formatDollarAmt(frame.amount));
            this.meniscusImageObject.setTop(frame.coordinates.top - deltaT);
            this.canvas.renderAll();

          }
        });
      }
    },

    calcLevel: function () {
      let _donations = +this.deltaDonations,
        _goal = +this.goal,
        scale = _donations / _goal,
        delta = scale * 400,
        deltaTop = 436.75 - delta,
        deltaHeight = 6.25 + delta;

      if (this.isEditMode || _donations <= 0) {
        return new Level(436.75, 6.25);
      }
      if (_donations >= _goal) {
        return new Level(36.75, 406.25);
      }
      return new Level(deltaTop, deltaHeight);
    },
    calcCoors: function () {
      let imgScaleX = document.getElementById('imgScaleX'),
        imgScaleY = document.getElementById('imgScaleY'),
        imgLeft = document.getElementById('imgLeft'),
        imgTop = document.getElementById('imgTop'),
        top = 277.80999611801246,
        left = -11.240003881987555,
        scaleX = 1.6512499999999997,
        scaleY = 1.6512499999999997;

      if (imgScaleX && imgScaleX.value && !isNaN(imgScaleX.value)) {
        scaleX = +imgScaleX.value;
      }
      if (imgScaleY && imgScaleY.value && !isNaN(imgScaleY.value)) {
        scaleY = +imgScaleY.value;
      }
      if (imgLeft && imgLeft.value && !isNaN(imgLeft.value)) {
        left = +imgLeft.value;
      }
      if (imgTop && imgTop.value && !isNaN(imgTop.value)) {
        top = +imgTop.value;
      }
      return new Coordinates(scaleX, scaleY, top, left);
    },

    onObjectScale: function (opt) {
      var imgScaleX = document.getElementById('imgScaleX'),
        imgScaleY = document.getElementById('imgScaleY'),
        scaleX = opt.target.scaleX,
        scaleY = opt.target.scaleY;
      imgScaleX.value = scaleX;
      imgScaleY.value = scaleY;
    },
    onObjectMove: function (opt) {
      var imgLeft = document.getElementById('imgLeft'),
        imgTop = document.getElementById('imgTop'),
        left = opt.target.left,
        top = opt.target.top;
      imgLeft.value = left;
      imgTop.value = top;
    },

    onStaticInputChange: function (callback, args) {
      if (callback.apply(this, args)) {
        this.deltaDonations = 0;
      }
    },
    onRefreshClick: function () {
      this.deltaDonations = 0;
      this.renderThermometer();
      this.renderScene();
    },
    onEditImgClick: function () {
      this.configureMode(1);
      this.renderThermometer();
    },
    onCancelImgEditClick: function () {
      this.configureMode(0);
      this.renderThermometer();
      this.renderScene();
    },
    onSaveImgEditClick: function () {
      this.configureMode(0);
      this.buildScene();
      this.renderThermometer();
      this.renderScene();
    },

    donationsChange: function () {
      var value = document.getElementById('donationTxt').value,
        amt = value && !isNaN((+value)) ? (+value) : 0;
      if (amt) {
        this.donations = amt;
      } else {
        this.donations = 0;
      }
      this.buildScene();
      return true;

    },
    goalChange: function () {
      var value = document.getElementById('goalTxt').value,
        amt = value && !isNaN((+value)) ? (+value) : null;
      if (amt) {
        this.goal = amt;
        this.buildScene();
        return true;
      } else {
        alert('Enter a valid Goal Amount');
        document.getElementById('goalTxt').focus();
        return false;
      }
    },
    titleChange: function () {
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

    configureMode: function (mode) {
      let donationTxt = document.getElementById('donationTxt'),
        goalTxt = document.getElementById('goalTxt'),
        titleTxt = document.getElementById('titleTxt'),
        imageUpload = document.getElementById('imageUpload'),
        imgScaleX = document.getElementById('imgScaleX'),
        imgScaleY = document.getElementById('imgScaleY'),
        imgLeft = document.getElementById('imgLeft'),
        imgTop = document.getElementById('imgTop'),
        manicusEditModeBtns = document.getElementById('manicusEditModeBtns'),
        manicusNormalModeBtns = document.getElementById('manicusNormalModeBtns'),
        editModeMessage = document.getElementById('editModeMessage'),
        refreshBtn = document.getElementById('refreshBtn');

      switch (mode) {
        case 1: // edit image mode
          imageUpload.disabled = false;
          imgScaleY.disabled = false;
          imgScaleX.disabled = false;
          imgLeft.disabled = false;
          imgTop.disabled = false;
          goalTxt.disabled = true;
          donationTxt.disabled = true;
          titleTxt.disabled = true;
          refreshBtn.disabled = true;
          manicusEditModeBtns.setAttribute('style', 'display: block;');
          manicusNormalModeBtns.setAttribute('style', 'display: none;');
          editModeMessage.setAttribute('style', 'display: block;');
          this.isEditMode = true;
          break;
        default: // normal
          imageUpload.disabled = true;
          imgScaleY.disabled = true;
          imgScaleX.disabled = true;
          imgLeft.disabled = true;
          imgTop.disabled = true;
          goalTxt.disabled = false;
          donationTxt.disabled = false;
          titleTxt.disabled = false;
          refreshBtn.disabled = false;
          manicusEditModeBtns.setAttribute('style', 'display: none;');
          manicusNormalModeBtns.setAttribute('style', 'display: block;');
          editModeMessage.setAttribute('style', 'display: none;');

          this.isEditMode = false;
          this.isNewManicusImg = false;
          break;
      }
    },
    configureObservers: function () {
      let donationTxt = document.getElementById('donationTxt'),
        goalTxt = document.getElementById('goalTxt'),
        titleTxt = document.getElementById('titleTxt'),
        imageUpload = document.getElementById('imageUpload'),
        refreshBtn = document.getElementById('refreshBtn'),
        editImgBtn = document.getElementById('editImgBtn'),
        cancelImgEditBtn = document.getElementById('cancelImgEditBtn'),
        saveImgEditBtn = document.getElementById('saveImgEditBtn');

      if (donationTxt) {
        donationTxt.addEventListener('change', () => this.onStaticInputChange(this.donationsChange, null));
      }
      if (goalTxt) {
        goalTxt.addEventListener('change', () => this.onStaticInputChange(this.goalChange, null));
      }
      if (titleTxt) {
        titleTxt.addEventListener('change', () => this.onStaticInputChange(this.titleChange, null));
      }
      if (imageUpload) {
        imageUpload.addEventListener('change', () => {
          let files = imageUpload.files;
          if (files && files.length) {
            this.parseImage(files, this);
          }
        });
      }
      if (refreshBtn) {
        refreshBtn.addEventListener('click', () => this.onRefreshClick());
      }
      if (editImgBtn) {
        editImgBtn.addEventListener('click', () => this.onEditImgClick());
      }
      if (cancelImgEditBtn) {
        cancelImgEditBtn.addEventListener('click', () => this.onCancelImgEditClick());
      }
      if (saveImgEditBtn) {
        saveImgEditBtn.addEventListener('click', () => this.onSaveImgEditClick());
      }

    },
    configureFields: function () {
      let coors = this.calcCoors(),
        imgScaleX = document.getElementById('imgScaleX'),
        imgScaleY = document.getElementById('imgScaleY'),
        imgLeft = document.getElementById('imgLeft'),
        imgTop = document.getElementById('imgTop');

      imgScaleX.value = coors.scaleX;
      imgScaleY.value = coors.scaleY;
      imgLeft.value = coors.left;
      imgTop.value = coors.top;
    },

    init: function () {
      this.configureObservers();
      this.configureFields();
      window.setTimeout(() => {
        this.buildScene();
        this.renderThermometer();
        this.renderScene();
      }, 1000);
    }
  };
  $(document).ready(function () {
    app.view.init();
  });
})(window.app = window.app || {}, jQuery)
