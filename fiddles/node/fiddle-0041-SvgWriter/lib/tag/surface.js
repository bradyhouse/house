'use strict';

/**
 * Class used to virtualize model a Scalar Vector
 * Graphics (SVG) html tag.
 */

class Surface {

  /**
   * Static config method. Object returned defines the default properties of the class. This
   * also defines the properties that may be passed to the class constructor.
   *
   * @returns {{id: string, xmlns: string, xmlnsEv: string, xmlnsXlink: string, zoomAndPan: string, coorWidth: string, coorHeight: string, hook: HTMLElement, autoBind: boolean, children: Array}}
   */
  config() {
    return {
      id: 'surface1',
      xmlns: Util.xmlNamespaces().xmlns,
      xmlnsEv: Util.xmlNamespaces().xmlnsEv,
      xmlnsXlink: Util.xmlNamespaces().xmlnsXLink,
      zoomAndPan: "disabled",
      width: '500px',
      height: '500px',
      hook: window.document.body,
      style: null,
      autoBind: false,
      children: [],
      onLoad: null
    };
  }

  /**
   * Class constructor.
   *
   * @param config
   */
  constructor(config) {

    this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
    this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
    this._xmlnsXlink = config && config.hasOwnProperty('xmlnsXlink') ? config.xmlnsXlink : this.config().xmlnsXlink;
    this._xmlnsEv = config && config.hasOwnProperty('xmlnsEv') ? config.xmlnsEv : this.config().xmlnsEv;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
    this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
    this._zoomAndPan = config && config.hasOwnProperty('zoomAndPan') ? config.zoomAndPan : this.config().zoomAndPan;
    this._coorWidth = config && config.hasOwnProperty('width') ? config.width : this.config().width;
    this._coorHeight = config && config.hasOwnProperty('height') ? config.height : this.config().height;
    this._style = config && config.hasOwnProperty('style') ? config.style : this.config().style;
    this._onLoad = config && config.hasOwnProperty('onLoad') ? config.onLoad : this.config().onLoad;
    this._children = config && config.hasOwnProperty('children') ? config.children : this.config().children;
    this.init();
  }

  /**
   * Horizontal length in the svg coordinate system.
   *
   * See `MDN > Web technology for developers > SVG > SVG Attribute reference > `
   * [width](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/width).
   *
   * @returns {string}
   */
  get coorWidth() {
    return this._coorWidth;
  }

  /**
   * Vertical length in the user coordinate system.
   *
   * See `MDN > Web technology for developers > SVG > SVG Attribute reference > `
   * [height](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/height).
   *
   * @returns {string|*}
   */
  get coorHeight() {
    return this._coorHeight;
  }

  /**
   * String value assigned to the id attribute of the
   * docElementNS object.
   *
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * The namespace uri attribute of the svg doc element.
   *
   * See [http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/glossary.html#dt-namespaceURI].
   *
   * @returns {string}
   */
  get xmlns() {
    return this._xmlns;
  }

  get xmlnsXlink() {
    return this._xmlnsXlink;
  }

  get xmlnsEv() {
    return this._xmlnsEv;
  }

  get docElementNS() {
    return this._docElementNS;
  }

  get hook() {
    return this._hook;
  }

  get autoBind() {
    return this._autoBind;
  }

  get zoomAndPan() {
    return this._zoomAndPan;
  }

  get onLoad() {
    return this._onLoad;
  }

  get group() {
    return this._group;
  }

  /**
   * Getter used to access the optional "style" tag attribute.
   * @returns {*}
   */
  get style() {
    return this._style;
  }

  /**
   * Getter for children collection.
   * @returns {*}
   */
  get children() {
    return this._children;
  }

  /**
   * Method used to append the docElement to configured hook element.
   */
  bind() {
    if (this.hook) {
      this.hook.createShadowRoot();
      this.hook.shadowRoot.innerHTML = this.docElementNS.outerHTML;
    }
  }

  /**
   * Method called by the constructor to create and assign docElement based
   * on the properties exposed by the class.
   *
   * Note - if the autoBind flag is true, then it ends by invoking bind method.
   */
  init() {
    var me = this,
      svg = document.createElementNS(this.xmlns, 'svg');

    svg.setAttribute('id', this.id);
    svg.setAttribute('width', this.coorWidth);
    svg.setAttribute('height', this.coorHeight);
    svg.setAttribute('zoomAndPan', this.zoomAndPan);

    if (this.style) {
      svg.setAttribute('style', this.style);
    }

    if (this.onload) {
      svg.setAttribute('onload', this.onLoad);
    }

    me._docElementNS = svg;

    if (this.children.length > 0) {
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.parent = this;
        if (child.docElementNS) {
          this.docElementNS.appendChild(child.docElementNS);
        }
      }
    }

    if (me.autoBind) {
      me.bind();
    }

  }

}

module.exports = Surface;
