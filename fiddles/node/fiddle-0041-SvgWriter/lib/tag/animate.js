'use strict';

const Base = require('./../base');

/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG),=
 * "<animate>" tag.  For example --
 *
 * <animate attributeName="cy" dur="10s" values="0%;100%" repeatCount="indefinite"></animate>
 *
 * For additional info,
 * see [MDN ... Animate](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate).
 *
 */
class Animate extends Base {

  /**
   * Static config method. Object returned defines the default properties of the class.
   *
   * @returns {{ attributeName: string,
    *            attributeType: string,
    *            from: string,
    *            to: string,
    *            dur: string,
    *            value: string,
    *            repeatCount: string
    *          }}
    */
  static get config() {
    return {
      attributeName: 'cy',
      attributeType: null,
      from: null,
      to: null,
      dur: '10s',
      values: '0%;100%',
      repeatCount: 'indefinite'
    };
  }

  /**
   * Static method that can be used to construct a new instance of the
   * class using a custom config or the default attributes (config).
   * @param {*} config
   */
  static factory(config) {
    return new Animate(config || this.config);
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
    let svg = '<animate';

    if (this.attributeName) {
      svg += ' attributeName="' + this.attributeName +'"';
    }

    if (this.attributeType) {
      svg += ' attributeType="' + this.attributeType + '"';
    }

    if(this.from) {
      svg += ' from="' + this.from + '"';
    }

    if(this.to) {
      svg += ' to="' + this.to + '"';
    }

    if(this.dur) {
      svg += ' dur="' + this.dur +'"';
    }

    if(this.values) {
      svg += ' values="' + this.values + '"';
    }

    if(this.repeatCount) {
      svg += ' repeatCount="' + this.repeatCount + '"';
    }

    svg += '></animate>';

    this.innerHTML = svg;
  }

}

module.exports = Animate;
