'use strict';

const Base = require('./../base');

/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) path,
 * "<path>", tag.
 */

class Path extends Base {

  /**
   * Static config method. Object returned defines the default properties of the class. This
   * also defines the properties that may be passed to the class constructor.
   *
   * @returns {{id: string,
   *            stroke: string,
   *            strokeWidth: string,
   *            opacity: string,
   *            data: string,
   *            onMouseDown: function,
   *            onMouseOver: function,
   *            onMouseOut: function
   *          }}
   */
  static get config() {
    return {
      id: 'path1',
      stroke: null,
      strokeWidth: null,
      opacity: null,
      data: null,
      onMouseDown: null,
      onMouseOver: null,
      onMouseOut: null
    };
  }

  /**
   * Static method that can be used to construct a new instance of the
   * class using a custom config or the default attributes (config).
   * @param {*} config
   */
  static factory(config) {
    return new Path(config || this.config);
  }


    /**
     * Class constructor
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
        let svg = '<path' +
                  ' id="' + this.id +'"';

        if (this.stroke) {
            svg += ' stroke="' + this.stroke + '"';
        }
        if (this.strokeWidth) {
            svg += ' stroke-width="' + this.strokeWidth + '"';
        }
        if (this.opacity) {
            svg += ' opacity="' + this.opacity + '"';
        }
        if (this.data) {
            svg += ' d="' + this.data + '"';
        }
        svg+= '></path>'
        this.innerHTML = svg;
    }
}

module.exports = Path;
