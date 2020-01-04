'use strict';

const Util = require('./../statics');
const Base = require('./../base');


/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) pattern,
 * "<pattern>", tag.  For additional info
 * refer to [MDN ... pattern](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern).
 */
class Pattern extends Base {

  /**
   * Static config method. Object returned defines the default properties of the class. This
   * also defines the properties that may be passed to the class constructor.
   *
   * @returns {{
   *          id: string,
   *          units: string,
   *          contentUnits: string,
   *          width: number,
   *          height: number,
   *          x: number,
   *          y: number,
   *          children: array,
   *          transform: string,
   *          preserveAspectRatio: string
   *          }}
   */
  static get config() {
    return {
      id: 'pattern1',
      units: null,
      contentUnits: null,
      width: null,
      height: null,
      x: null,
      y: null,
      children: [],
      transform: null,
      preserveAspectRatio: null
    };
  }

  /**
   * Static method that can be used to construct a new instance of the
   * class using a custom config or the default attributes (config).
   * @param {*} config
   */
  static factory(config) {
    return new Pattern(config || this.config);
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
   * Method called by the constructor to create and assign docElement based
   * on the properties exposed by the class.
   *
   * Note - if the autoBind flag is true, then it ends by invoking bind method.
   */
  init() {
    let i = 0,
      child = null,
      svg = '<pattern' +
      ' id="' + this.id + '"';

    if (this.x) {
      svg += ' x="' + this.x + '"';
    }
    if (this.y) {
      svg += ' y="' + this.y + '"';
    }

    if (this.transform) {
      svg += ' patternTransform="' + this.transform + '"';
    }

    if (this.units) {
      svg += ' patternUnits="' + this.units + '"';
    }

    if (this.contentUnits) {
      svg += ' patternContentUnits="' + this.contentUnits + '"';
    }

    if (this.width) {
      svg += ' width="' + this.width + '"';
    }

    if (this.height) {
      svg += ' height="' + this.height + '"';
    }

    if (this.preserveAspectRatio) {
      svg += ' preserveAspectRatio="' + this.preserveAspectRatio + '"';
    }

    svg += ' >';

    if (this.children.length > 0) {
      for (; i < this.children.length; i++) {
        child = this.children[i];
        if (child.innerHTML) {
          svg += child.innerHTML;
        }
      }
    }

    svg += '</pattern>';

    this.innerHTML = svg;
  }

}

module.exports = Pattern;
