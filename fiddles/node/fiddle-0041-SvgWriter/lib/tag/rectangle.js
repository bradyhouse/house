'use strict';

const Util = require('./../statics');
const Base = require('./../base');

/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) rectangle,
 * "<rect>", tag.  This tag
 * is used to create a rectangular
 * shape or border on screen. Depending on the configuration
 * of the class should inject a <rect/> element into the
 * target DOM (aka hook).  For example --
 *
 * <rect xmlns="http://www.w3.org/2000/svg" id="toolButton" x="40" y="0" width="65" height="20"
 *      onmousedown="ToolsView()"
 *      onmouseover="document.getElementById('toolButton').setAttribute('fill','#ffff88')"
 *      onmouseout="document.getElementById('toolButton').setAttribute('fill','#88ffff')"
 *      fill="#88ffff"
 *      stroke="black"
 *      stroke-width="2"/>
 *
 * Or
 *
 * <rect xmlns="http://www.w3.org/2000/svg"
 *       id="toolRectOuter" x="0" y="0"
 *       width="94"
 *       height="164"
 *       stroke="black"
 *       stroke-width="1"
 *       fill="#ddd"
 *       onmouseout="hide(toolM)"/>
 *
 *
 */
class Rectangle extends Base {

  /**
   * Static config method. Object returned defines the default properties of the class. This
   * also defines the properties that may be passed to the class constructor.
   *
   * @returns {{
   *            id: string,
   *            title: string,
   *            cssClass: string,
   *            stroke: string,
   *            strokeWidth: number,
   *            fill: string,
   *            opacity: string,
   *            height: number,
   *            width: number,
   *            x: number,
   *            y: number,
   *            cornerRadius: number,
   *            cursor: string,
   *            children: array,
   *            xmlns: string,
   *            onClick: function,
   *            onMouseOver: function,
   *            onMouseOut: function,
   *            onMouseDown: function
   *          }}
   */
  static get config() {
    return {
      id: 'rect1',
      title: 'rectangle',
      cssClass: null,
      stroke: null,
      strokeWidth: null,
      fill: null,
      opacity: null,
      height: null,
      width: null,
      x: null,
      y: null,
      cornerRadius: null,
      cursor: null,
      xmlns: Util.xmlNamespaces().xmlns,
      children: [],
      onClick: null,
      onMouseOver: null,
      onMouseOut: null,
      onMouseDown: null,
    };

  }

  static factory(config) {
    return new Rectangle(config || this.config);
  }

  /**
   * Class constructor.
   *
   * @param config (optional)
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
    let svg = '<rect';


    if (this.id) {
      svg += ' id="' + this.id + '"';
    }

    if (this.title) {
      svg += ' title="' + this.title + '"';
    }

    if (this.cssClass) {
      svg += ' class="' + this.cssClass + '"';
    }

    if (this.x) {
      svg += ' x="' + this.x + '"';
    }

    if (this.y) {
      svg += ' y="' + this.y + '"';
    }

    if (this.width) {
      svg += ' width="' + this.width + '"';
    }

    if (this.height) {
      svg += ' height="' + this.height + '"';
    }

    if (this.fill) {
      svg += ' fill="' + this.fill + '"';
    }

    if (this.opacity) {
      svg += ' opacity="' + this.opacity + '"';
    }

    if (this.stroke) {
      svg += ' stroke="' + this.stroke + '"';
    }

    if (this.strokeWidth) {
      svg += ' stroke-width="' + this.strokeWidth + '"';
    }

    if (this.onMouseOut) {
      svg += ' onmouseout="' + this.onMouseOut + '"';
    }
    if (this.onMouseOver) {
      svg += ' onmouseover="' + this.onMouseOver + '"';
    }
    if (this.onMouseDown) {
      svg += ' onmousedown="' + this.onMouseDown + '"';
    }

    if (this.cursor) {
      svg += ' style="cursor: ' + this.cursor + ';"';
    }

    if (this.cornerRadius) {
      svg += ' rx="' + this.cornerRadius + '"';
      svg += ' ry="' + this.cornerRadius + '"';
    }

    svg += '>';

    if (this.children && this.children.length > 0) {
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child.innerHTML) {
          svg += child.innerHTML;
        }
      }
    }

    svg += '</rect>';
    this.innerHTML = svg;

  }

}

module.exports = Rectangle;
