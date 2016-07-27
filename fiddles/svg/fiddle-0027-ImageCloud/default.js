(function(app) {

  class Util {
    /**
     * Static Method that can used to generate a
     * random html color code.
     *
     * @returns {string}
     */
    static color() {
      var hex = "#",
        i = 0;
      for (; i < 6; i++) {
        hex += Math.floor(Math.random() * 16).toString(16);
      }
      return hex;
    }

    /**
     * Static method that can be used to generate a random
     * number within a given range.
     *
     * @param lbound
     * @param ubound
     * @returns {number}
     */
    static rand(lbound, ubound) {
      return Math.floor(Math.random() * (ubound - lbound + 1)) + lbound;
    }

    /**
     * Collection of namespace strings used in the
     * creation of svg elements.
     *
     * @returns {{xmlns: string, xmlnsXLink: string, xmlnsEv: string}}
     */
    static xmlNamespaces() {
      return {
        xmlns: 'http://www.w3.org/2000/svg',
        xmlnsXLink: 'http://www.w3.org/1999/xlink',
        xmlnsEv: 'http://www.w3.org/2001/xml-events'
      }
    }

    /**
     * Utility method that can be used to get a given attribute (field) from a given doc
     * element and split its value into a string array. If
     * the element does not have the requested attribute, then
     * the provided default value (valDef) is split and returned.
     *
     * @param field
     * @param id
     * @param valDef
     * @returns {Array}
     */
    static splitAttribute(field, id, valDef) {
      var docElement = document.getElementById(id);
      if (docElement && docElement.getAttribute(field)) {
        return docElement.getAttribute(field).split(/[,\(\)]/);
      }
      return valDef.split(/[,\(\)]/);
    }

    /**
     * Utility method that can be used to "pop" a given parameter from
     * a given url.  NOTE - To get a query string parameter value, pass
     * in "location.search".
     *
     * @param parameter
     * @param url
     * @returns {string}
     */
    static mapFromQueryString(url, parameter) {
      var name = parameter.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
        regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        value = regex.exec(url);
      return value === null ? "" : decodeURIComponent(value[1].replace(/\+/g, " "));
    }

    /**
     * Utility method that can be used to hide a given object.
     *
     * @param obj
     */
    static hide(obj) {
      obj.setAttribute('visibility', 'hidden');
    }

    /**
     * Utility method that can be used to darken a given hex color by
     * given percentage ("lum").  This method was
     * lifted from http://www.sitepoint.com/javascript-generate-lighter-darker-color/.
     *
     * @param hex
     * @param lum
     * @returns {string}
     */
    static darkenColor(hex, lum) {

      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;

      // convert to decimal and change luminosity
      var rgb = "#", c, i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
      }

      return rgb;
    }

    /**
     * Utility method that can be used to calculate a point
     * along the circumference of a circle. The method is based
     * on the established parametric equations (below).  It
     * returns an object containing the calculated x,y coordinates.
     *
     *  x = cx + r * cos(a)
     *  y = cy + r * sin(a)
     *
     * @param centerX
     * @param centerY
     * @param radius
     * @param angle
     * @returns {{x: number, y: number}}
     */
    static mapCircularPoint(centerX, centerY, radius, angle) {
      var coorX = 0,
        coorY = 0;

      try {
        coorX = Math.round(centerX + (radius * Math.cos(Util.convertToRadians(angle))));
        coorY = Math.round(centerY + (radius * Math.sin(Util.convertToRadians(angle))));

      } catch (err) {
        console.log(err.stackTrace);
      }

      return {
        x: coorX,
        y: coorY
      }
    }

    static mapCircularPath(centerX, centerY, radius, axis) {
      let _coor3pm = Util.mapCircularPoint(centerX, centerY, radius,0),
        _coor4pm = Util.mapCircularPoint(centerX, centerY, radius, 30),
        _coor5pm = Util.mapCircularPoint(centerX, centerY, radius, 60),
        _coor6pm = Util.mapCircularPoint(centerX, centerY, radius, 90),
        _coor7pm = Util.mapCircularPoint(centerX, centerY, radius, 120),
        _coor8pm = Util.mapCircularPoint(centerX, centerY, radius, 150),
        _coor9pm = Util.mapCircularPoint(centerX, centerY, radius, 180),
        _coor10pm =Util.mapCircularPoint(centerX, centerY, radius, 210),
        _coor11pm =Util.mapCircularPoint(centerX, centerY, radius, 240),
        _coor12am = Util.mapCircularPoint(centerX, centerY, radius, 270),
        _coor1am = Util.mapCircularPoint(centerX, centerY, radius, 300),
        _coor2am = Util.mapCircularPoint(centerX, centerY, radius, 330);

      return axis === 'x' || axis === 'y' ? _coor3pm[axis] + ';' +
      _coor4pm[axis] + ';' +
      _coor5pm[axis] + ';' +
      _coor6pm[axis] + ';' +
      _coor7pm[axis] + ';' +
      _coor8pm[axis] + ';' +
      _coor9pm[axis] + ';' +
      _coor10pm[axis] + ';' +
      _coor11pm[axis]  + ';' +
      _coor12am[axis] + ';' +
      _coor1am[axis]+ ';' +
      _coor2am[axis] + ';' +
      _coor3pm[axis]: '';

    }

    /**
     * Utility Method that can be used to convert an angle
     * to it's radian equivalent.
     * @param angle
     * @returns {number}
     */
    static convertToRadians(angle) {
      return angle * (Math.PI / 180);
    }

  }

  class Base {
    apply(object, config, defaults) {
      if (defaults) {
        this.apply(object, defaults);
      }
      if (object && config && typeof config === 'object') {
        let property;
        for (property in config) {
          object[property] = config[property];
        }
      }
      return object;
    }
  }

  class Image extends Base {

    config() {
      return {
        id: 'img1',
        width: '100%',
        height: '100%',
        xlinkHref: '',
        xmlns: Util.xmlNamespaces().xmlns,
        hook: null,
        docElementNS: null,
        autoBind: false,
        x: '0',
        y: '0',
        children: [],
        onclick: null
      }
    }

    /**
     * Class constructor.
     *
     * @param config
     */
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
      this.docElementNS = document.createElementNS(this.xmlns, 'image');
      this.docElementNS.setAttribute('id', this.id);
      this.docElementNS.setAttribute('xlink:href', this.xlinkHref);
      this.docElementNS.setAttribute('width', this.width);
      this.docElementNS.setAttribute('height', this.height);
      this.docElementNS.setAttribute('x', this.x);
      this.docElementNS.setAttribute('y', this.y);

      if (this.onclick) {
        this.docElementNS.setAttribute('onclick', this.onclick);
      }

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

  app.topImage = null;

  app.onImageClick = function(image) {

    /**
     * new Image({
              id: photo.title,
              width: objects.length % 4 === 0 ? Math.floor((+photo.width) / 4) : Math.floor((+photo.width) / 6),
              height: objects.length % 4 === 0 ? Math.floor((+photo.height) / 4) : Math.floor((+photo.height) / 6),
              x: Util.rand(quad.range.x1, quad.range.x2),
              y: Util.rand(quad.range.y1, quad.range.y2),
              xlinkHref: photo.url,
              children: [animate1, animate2]
            })
     * @type {*|jQuery|HTMLElement}
     */

    let svg = document.getElementById('fiddle'),
        topImage = new Image({
            id: image.getAttribute('id') + '_topImage',
            width: window.innerWidth,
            height: window.innerHeight,
            x: 0,
            y: 0,
            xlinkHref: image.getAttribute('xlink:href'),
            onclick: 'app.onImageRestore(this)'
        });
    app.topImage = topImage;

    svg.innerHTML += topImage.docElementNS.outerHTML;

  }

  app.onImageRestore=function(image) {
    let svg = document.getElementById('fiddle');
    svg.removeChild(image);
  }



})(window.app = window.app || {})