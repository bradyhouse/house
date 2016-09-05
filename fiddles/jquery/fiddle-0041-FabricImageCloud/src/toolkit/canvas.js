/**
 * Wrapper class for the fabric.Canvas.
 * @see http://fabricjs.com/docs/fabric.Canvas.html
 */

class Canvas extends Base {

  config() {
    return {
      hook: 'canvas1',
      children: [],
      backgroundColor: 'rgb(100,100,200)',
      width: 500,
      height: 500,
      onImageClick: null
    };
  }

  constructor(config) {
    super();
    if (config) {
      this.apply(this, config, this.config());
    }
    this._start = 0;
    this._stop = 0;
    this.init();
  }

  get start() {
    return this._start;
  }

  set start(value) {
    this._start = value;
  }

  get stop() {
    return this._stop;
  }

  set stop(value) {
    this._stop = value;
  }

  init() {
    var me = this,
      canvas = new fabric.Canvas(this.hook, {
        width: this.width,
        height: this.height
      });

    if (canvas) {
      if (this.children && this.children.length) {
        this.children.map(function (child) {
          if (child.fabric) {
            // ToDo: Report Bug
            child.fabric.setHeight(child.height);
            canvas.add(child.fabric);
          }
        }, canvas);
      }
      canvas.on('mouse:down', function(object) {
        var date = new Date();
        me.start = date.getTime();
      });

      canvas.on('mouse:up', function (object) {
        var date = new Date(),
            image = object && object.target && object.target.type && object.target.type === 'image' ? object.target : null,
            delta = 0;
        me.stop = date.getTime();
        delta = me.stop - me.start;
        if (delta < 200 && image) {
          if (me.hasOwnMethod('onImageClick')) {
            me['onImageClick'].call(me, image);
          }
        }
      });
      this.fabric = canvas;
    }
  }
}
