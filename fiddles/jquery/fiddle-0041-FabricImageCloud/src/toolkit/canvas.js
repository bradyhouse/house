/**
 * Wrapper class for the fabric.Canvas.
 * @link {http://fabricjs.com/docs/fabric.Canvas.html}
 */

class Canvas extends Base {

  config() {
    return {
      hook: 'canvas1',
      children: null
    };
  }

  constructor(config) {
    super();
    if (config) {
      this.apply(this, config, this.config());
    }
    this.init();
  }

  /**
   * Method used to append the docElement to
   * configured hook element.
   */
  bind() {
    if (this.hook && this.docElementNS) {
      this.hook.appendChild(this.docElementNS);
    }
  }

  /**
   * Method called by the constructor to create
   * and assign docElement based
   * on the properties exposed by the class.
   *
   * Note - if the autoBind flag is true,
   * then it ends by invoking bind method.
   */
  init() {




    if (this.children && this.children.length) {
      this.children.map((child) => {
        child.parent = this;
        if (child.docElementNS) {
          this.docElementNS.appendChild(child.docElementNS);
        }
      });
    }

    if (this.autoBind) {
      this.bind();
    }
  }


}
