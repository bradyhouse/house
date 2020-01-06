'use strict';

const Util = require('./../statics');
const Base = require('./../base');

/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) circle,
 * "<image>", tag.  For additional info,
 * see [MDN ... Image](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image).
 *
 */
class Image extends Base {

   /**
   * Static config method. Object returned defines the default properties of the class.
   *
   * @returns {{ id: string,
    *            width: string,
    *            height: string,
    *            xlinkHref: string,
    *            x: number,
    *            y: number,
    *            opacity: number,
    *            children: array,
    *            onClick: function,
    *
    *          }}
    */
  static get config() {
    return {
      id: 'img1',
      width: '100%',
      height: '100%',
      xlinkHref: '',
      x: '0',
      y: '0',
      opacity: 1,
      children: [],
      onClick: null,
      class: 'imageTag',
      style: 'clip-path: inset(12%, 0, 12%, 0);'
    }
  }

  /**
   * Static method that can be used to construct a new instance of the
   * class using a custom config or the default attributes (config).
   * @param {*} config
   */
  static factory(config) {
    return new Image(config || this.config);
  }

  /**
   * Class constructor.
   *
   * @param config
   */
  constructor(config) {
    super();
    this.apply(this, config || this.config, this.config);
    this.init();
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
    let svg = '<image' +
              ' id="' + this.id + '"' +
              ' xlink:href="' + this.xlinkHref + '"' +
              ' width="' + this.width + '"' +
              ' height="' + this.height + '"' +
              ' x="' + this.x + '"' +
              ' y="' + this.y + '"' +
              ' opacity="' + this.opacity + '"';

    if (this.style) {
      svg += ' style="' + this.style + '"';
    }

    if (this.class) {
      svg += ' class="' + this.class + '"';
    }

    if (this.onClick) {
      svg += ' onclick="' + this.onClick + '"';
    }
    svg += ' >';

    if (this.children && this.children.length) {
      this.children.map((child) => {
        child.parent = this;
        if (child.innerHTML) {
          svg += child.innerHTML;
        }
      });
    }

    svg += '</image>';
    this.innerHTML = svg;

  }

}

module.exports = Image;
