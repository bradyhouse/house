'use strict';
const Base = require('../base');
const Util = require('./../statics');

/**
 * Class used to virtualize model a Scalar Vector
 * Graphics (SVG) html tag.
 */

class Surface extends Base {

  /**
   * Static config method. Object returned defines the default properties of the class. This
   * also defines the properties that may be passed to the class constructor.
   *
   * @returns {{ id: string,
   *            zoomAndPan: string,
   *            width: string,
   *             height: string,
   *            style: string,
   *            children: array,
   *            onLoad: function
   *          }}
   */
  static get config() {
    return {
      id: 'surface1',
      zoomAndPan: "disabled",
      width: '1024px',
      height: '768px',
      style: null,
      children: [],
      onLoad: null
    };
  }

  /**
   * Static method that can be used to construct a new instance of the
   * class using a custom config or the default attributes (config).
   * @param {*} config
   */
  static factory(config) {
    return new Surface(config || this.config);
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
   *  xmlns: Util.xmlNamespaces().xmlns,
      xmlnsEv: Util.xmlNamespaces().xmlnsEv,
      xmlnsXlink: Util.xmlNamespaces().xmlnsXLink,
   */
  init() {
    let svg = '<svg id="' + this.id + '"' +
      ' xmlns="' + Util.xmlNamespaces().xmlns + '"' +
      ' xmlns:xlink="' + Util.xmlNamespaces().xmlnsXLink + '"' +
      ' version="' + Util.xmlNamespaces().version + '"' +
      ' zoomAndPan="' + this.zoomAndPan + '"';
    if (this.width) {
      svg += ' width="' + this.width + '"';
    }
    if (this.height) {
      svg += ' height="' + this.height + '"';
    }
    if (this.style) {
      svg += ' style="' + this.style + '"';
    }
    if (this.onload) {
      svg += ' onload="' + this.onLoad + '"';
    }
    svg += '>';
    if (this.children.length > 0) {
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.parent = this;
        if (child.innerHTML) {
          svg += ' ' + child.innerHTML;
        }
      }
    }
    svg += '</svg>';
    this.innerHTML = svg;
  }

}

module.exports = Surface;
