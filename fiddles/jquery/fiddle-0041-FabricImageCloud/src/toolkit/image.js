/**
 * Wrapper class for the fabric.Image.
 * @see http://fabricjs.com/docs/fabric.Image.html
 */
class Image extends Base {

  config() {
    return {
      controller: null,
      url: null,
      left: 100,
      top: 100,
      angle: 0,
      opacity: 1,
      autoBind: false,
      imageLoad: null
    }
  }

  constructor(config) {
    super();
    if (config) {
      this.apply(this, config, this.config());
    }
    this.init();
  }

  bind() {
    if (this.hook) {
      this.hook.add(this.fabric);
    }
  }

  init() {
    var me = this;
    if (me.url) {
      fabric.Image.fromURL(me.url, function(oImg) {
        oImg.setWidth(me.width);
        oImg.setHeight(me.height);
        oImg.setLeft(me.left);
        oImg.setTop(me.top);
        oImg.setOpacity(me.opacity);
        if (me.autoBind) {
          me.bind();
        }
        if (me.hasOwnMethod('onImageLoad')) {
          me['onImageLoad'].call(me, oImg);
        }

        me.fabric = oImg;


      });
    }
  }

}
