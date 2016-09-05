/**
 * Class that virtualizes the options that can be passed to the
 * Fabric.Image.animate(...) method.
 * @see https://github.com/kangax/fabric.js/blob/master/src/util/animate.js
 *
 *   * @param {Object} [options] Animation options
 * @param {Function} [options.onChange] Callback; invoked on every value change
 * @param {Function} [options.onComplete] Callback; invoked when value change is completed
 * @param {Number} [options.startValue=0] Starting value
 * @param {Number} [options.endValue=100] Ending value
 * @param {Number} [options.byValue=100] Value to modify the property by
 * @param {Function} [options.easing] Easing function
 * @param {Number} [options.duration=500] Duration of change (in ms)
 *
 *
 */
class AnimateImageOptions extends Base {

  config() {
    return {
      attributeName: 'opacity',
      duration: 500,
      startValue: 0,
      endValue: 100,
      byValue: 100,
      values: [0,.5,1],
      repeat: true,
      image: null,
      onChange: null
    }
  }

  constructor(config) {
    super();
    if (config) {
      this.apply(this, config, this.config());
    }
    this._startIndex = 0;
    this._startTime = null;
    this._endIndex = this.values && this.values.length && this.values.length > 1 ? 1 : 0;
    this.init();
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(t) {
    this._startTime = t;
  }

  get startIndex() {
    return this._startIndex;
  }

  set startIndex(i) {
    this._startIndex = i;
  }

  get endIndex() {
    return this._endIndex;
  }

  set endIndex(i) {
    this._endIndex = i;
  }

  get canAnimate() {
    var me = this;
    return me.image &&
      !me.image.fabric.canvas.getActiveObject() &&
      !me.image.controller.topImage &&
      me.hasOwnMethod('onChange') &&
      me.values &&
      me.values.length &&
      me.startValue &&
      me.endValue &&
      me.byValue &&
      me.startValue != me.endValue &&
      me.byValue === (me.endValue - me.startValue) &&
      me.startIndex != me.endIndex &&
      me.endIndex < me.values.length ? true : false;
  }

  get options() {
    var me = this;
    if (me.canAnimate()) {
      return {
        onChange: me['onChange']
      };
    } else {
      return {};
    }
  }

  init() {
    var me = this;
    me.step = function(timestamp) {
      if (!me.startTime) {
        me.startTime = timestamp;
      }
      var progress = timestamp - me.startTime,
        a = me.startIndex++,
        b = me.endIndex++;

      if(me.canAnimate) {
        if (a < me.values.length) {
          me.startIndex = a;
        } else {
          me.startIndex = 0;
        }
        if (b < me.values.length) {
          me.endIndex = b;
        } else {
          me.endIndex = 0;
        }
        me.startValue = me.values[me.startIndex];
        me.endValue = me.values[me.endIndex];
        me.byValue = me.endValue - me.startValue;

        me.image.fabric.animate(me.attributeName, me.endValue, {
          onChange: me.image.fabric.canvas.renderAll.bind(me.image.fabric.canvas),
          from: me.startValue,
          duration: 10000,
          easing: fabric.util.ease.easeOutCubic,
          onComplete: function () {
            window.requestAnimationFrame(me.step);
          }
        });
      } else {
        window.requestAnimationFrame(me.step);
      }
    }
  }

}
