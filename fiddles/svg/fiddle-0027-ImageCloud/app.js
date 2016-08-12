(function(app) {
    "use strict";


    app.metadata = app.metadata || {
        consoleTag: 'H O U S E ~ f i d d l e s',
        gitHubUrl: 'https://github.com/bradyhouse/house/tree/master/fiddles/svg/fiddle-0027-ImageCloud',
        dataUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/photo-album.json'
    };


    app.view = app.view || {};
    app.model = app.model || {};


    class Base {
        apply(object, config, defaults) {
            if (defaults) {
                this.apply(object, defaults);
            }
            if (object && config && typeof config === 'object') {
                let property;
                for (property in config) {
                    if (config[property]) {
                        object[property] = config[property];
                    }
                }
            }
            return object;
        }
    }


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
                var rgb = "#",
                    c, i;
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
            /**
             * Utility method used generate a "values" string containing
             * points along the circumference of a circle given the
             * coordinates points and the radius.
             *
             * @param centerX
             * @param centerY
             * @param radius
             * @param axis
             * @returns {string}
             */
        static mapCircularPath(centerX, centerY, radius, axis) {
                let _coor3pm = Util.mapCircularPoint(centerX, centerY, radius, 0),
                    _coor4pm = Util.mapCircularPoint(centerX, centerY, radius, 30),
                    _coor5pm = Util.mapCircularPoint(centerX, centerY, radius, 60),
                    _coor6pm = Util.mapCircularPoint(centerX, centerY, radius, 90),
                    _coor7pm = Util.mapCircularPoint(centerX, centerY, radius, 120),
                    _coor8pm = Util.mapCircularPoint(centerX, centerY, radius, 150),
                    _coor9pm = Util.mapCircularPoint(centerX, centerY, radius, 180),
                    _coor10pm = Util.mapCircularPoint(centerX, centerY, radius, 210),
                    _coor11pm = Util.mapCircularPoint(centerX, centerY, radius, 240),
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
                    _coor11pm[axis] + ';' +
                    _coor12am[axis] + ';' +
                    _coor1am[axis] + ';' +
                    _coor2am[axis] + ';' +
                    _coor3pm[axis] : '';
            }
            /**
             * Utility method used generate an array containing
             * points along the circumference of a circle given the
             * center coordinates and radius. The optional degrees
             * parameter can be used to set degree offset between
             * each point.  By default, it uses 30 degrees.
             *
             * @param centerX
             * @param centerY
             * @param radius
             * @param degrees (optional)
             * @returns {Array}
             */
        static toCircularPointArray(centerX, centerY, radius, degrees) {
                let coors = [],
                    angle = 0,
                    delta = degrees ? degrees : 30;
                while (angle <= 360) {
                    coors.push(Util.mapCircularPoint(centerX, centerY, radius, angle));
                    angle += delta;
                }
                return coors;
            }
            /**
             * Utility method that can be used to convert an Array {x,y} points
             * to a semicolon delimited string of either x or y values based
             * on the value of the axis parameter.
             * @param pointArray
             * @param axis
             * @returns {string}
             */
        static flattenToValues(pointArray, axis) {
            let path = '';
            if (pointArray.constructor === Array && pointArray.length) {
                if (pointArray[0].hasOwnProperty(axis)) {
                    pointArray.map((point, index) => {
                        path += point[axis];
                        if (index < (pointArray.length - 1)) {
                            path += ';';
                        }
                    });
                }
            }
            return path;
        }
        static reorderFrom(pointArray, startIndex) {
                var newArray = [],
                    startingPoint = {};
                if (pointArray.constructor === Array && startIndex < pointArray.length) {
                    startingPoint.x = pointArray[startIndex].x;
                    startingPoint.y = pointArray[startIndex].y;
                    newArray.push({
                        x: startingPoint.x,
                        y: startingPoint.y
                    });
                    // top
                    pointArray.map((point, index) => {
                        if (index > startIndex) {
                            newArray.push({
                                x: point.x,
                                y: point.y
                            })
                        }
                    });
                    // bottom
                    pointArray.map((point, index) => {
                        if (index < startIndex) {
                            newArray.push({
                                x: point.x,
                                y: point.y
                            })
                        }
                    });
                }
                return newArray;
            }
            /**
             * Utility method that can be used to pick a random
             * point along a circle given array of the points
             * that define its circumference.
             *
             * NOTE - This function was written to be used
             * in concert with the toCircularPointArray method.
             *
             * @param circularPointArr
             * @returns {{x: number, y: number}}
             */
        static pickRandomPoint(circularPointArr) {
                let coor = {
                        x: 0,
                        y: 0
                    },
                    index = 0;
                if (circularPointArr.constructor === Array) {
                    index = Util.rand(0, circularPointArr.length - 1);
                    coor = circularPointArr[index];
                }
                return coor;
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


    /**
     * Class used to wrap (or model)
     * an Scalar Vector Graphic (SVG) pattern,
     * "<pattern>", tag.  For additional info
     * refer to [MDN ... pattern](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern).
     */
    class Pattern {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{id: string, stroke: null, strokeWidth: null, opacity: null, xmlns: string, hook: null, autoBind: boolean, onMouseDown: string, onKeyUp: string, children: Array, transform: null, visibility: null, zIndex: null}}
         */
        config() {
                return {
                    id: 'pattern1',
                    units: null,
                    contentUnits: null,
                    width: null,
                    height: null,
                    x: null,
                    y: null,
                    xmlns: Util.xmlNamespaces().xmlns,
                    hook: null,
                    autoBind: false,
                    children: [],
                    transform: null,
                    preserveAspectRatio: null,
                    link: null
                }
            }
            /**
             * Class constructor.
             *
             * @param config
             */
        constructor(config) {
                this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
                this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
                this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
                this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
                this._children = config && config.hasOwnProperty('children') ? config.children : this.config().children;
                this._transform = config && config.hasOwnProperty('transform') ? config.transform : this.config().transform;
                this._width = config && config.hasOwnProperty('width') ? config.width : this.config().width;
                this._height = config && config.hasOwnProperty('height') ? config.height : this.config().height;
                this._x = config && config.hasOwnProperty('x') ? config.x : this.config().x;
                this._y = config && config.hasOwnProperty('y') ? config.y : this.config().y;
                this._units = config && config.hasOwnProperty('units') ? config.units : this.config().units;
                this._contentUnits = config && config.hasOwnProperty('contentUnits') ? config.contentUnits : this.config().contentUnits;
                this._preserveAspectRatio = config && config.hasOwnProperty('preserveAspectRatio') ? config.preserveAspectRatio : this.config().preserveAspectRatio;
                this._link = config && config.hasOwnProperty('link') ? config.link : this.config().link;
                this.init();
            }
            /**
             * Document element object.  This property is populated
             * during init using the document.createElementNS()
             * method.
             *
             * @returns {object}
             */
        get docElementNS() {
                return this._docElementNS;
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
             * XML Namespace URI.  Property required by the
             * init method in order to create and populate
             * the documentNS attribute.
             *
             * @returns {string}
             */
        get xmlns() {
                return this._xmlns;
            }
            /**
             * Reference to the document element that the
             * docElementNS attribute will be added too.
             *
             * @returns {object}
             */
        get hook() {
                return this._hook;
            }
            /**
             * Flag that can be passed to class constructor
             * to automatically add the docElementNS attribute
             * to the configured hook attribute.
             *
             * @returns {boolean}
             */
        get autoBind() {
                return this._autoBind;
            }
            /**
             * Getter for children objects.
             * @returns {*}
             */
        get children() {
                return this._children;
            }
            /**
             * Getter for the optional pattern transform, "patternTransform", tag attribute.
             *
             * @returns {*}
             */
        get transform() {
                return this._transform;
            }
            /**
             * Getter for width attribute.
             *
             * @returns {*}
             */
        get width() {
                return this._width;
            }
            /**
             * Getter for height attribute.
             *
             * @returns {*}
             */
        get height() {
                return this._height;
            }
            /**
             * Getter for  x attribute.
             * @returns {*}
             */
        get x() {
                return this._x;
            }
            /**
             * Getter for y attribute.
             * @returns {*}
             */
        get y() {
                return this._y;
            }
            /**
             * Getter for the optional pattern units, "patternUnits", tag attribute.
             *
             * @returns {*}
             */
        get units() {
                return this._units;
            }
            /**
             * Getter for the optional pattern content units "patternContentUnits", tag attribute.
             *
             * @returns {*}
             */
        get contentUnits() {
                return this._contentUnits;
            }
            /**
             * Getter for the optional preserve aspect ratio, "preserveAspectRatio", tag attribute.
             *
             * @returns {*}
             */
        get preserveAspectRatio() {
                return this._preserveAspectRatio;
            }
            /**
             * Getter for the optional link, "xlink:href", tag attribute.
             *
             * @returns {*}
             */
        get link() {
                return this._link;
            }
            /**
             * Method used to append the docElement to configured hook element.
             */
        bind() {
                this.hook.appendChild(this.docElementNS);
            }
            /**
             * Method called by the constructor to create and assign docElement based
             * on the properties exposed by the class.
             *
             * Note - if the autoBind flag is true, then it ends by invoking bind method.
             */
        init() {
            var i = 0,
                child = null,
                docElement = document.createElementNS(this.xmlns, 'pattern');
            docElement.setAttribute('id', this.id);
            if (this.x) {
                docElement.setAttribute('x', this.x);
            }
            if (this.y) {
                docElement.setAttribute('y', this.y);
            }
            if (this.transform) {
                docElement.setAttribute('patternTransform', this.transform);
            }
            if (this.units) {
                docElement.setAttribute('patternUnits', this.units);
            }
            if (this.contentUnits) {
                docElement.setAttribute('patternContentUnits', this.contentUnits);
            }
            if (this.link) {
                docElement.setAttributeNS(Util.xmlNamespaces().xmlnsXLink, 'href', this.link);
            }
            if (this.width) {
                docElement.setAttribute('width', this.width);
            }
            if (this.height) {
                docElement.setAttribute('height', this.height);
            }
            if (this.preserveAspectRatio) {
                docElement.setAttribute('preserveAspectRatio', this.preserveAspectRatio);
            }
            this._docElementNS = docElement;
            if (this.children.length > 0) {
                for (; i < this.children.length; i++) {
                    child = this.children[i];
                    if (child.docElementNS) {
                        this.docElementNS.appendChild(child.docElementNS);
                    }
                }
            }
            if (this.autoBind) {
                this.bind();
            }
        }
    }


    /**
     * Class used to wrap (or model)
     * an Scalar Vector Graphic (SVG) definitions,
     * "<defs>", tag.  For additional info refer
     * to [MDN ... defs](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs).
     */
    class Definitions {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{xmlns: string, hook: null, autoBind: boolean, children: Array, transform: boolean}}
         */
        config() {
                return {
                    xmlns: Util.xmlNamespaces().xmlns,
                    hook: null,
                    autoBind: false,
                    children: []
                }
            }
            /**
             * Class constructor.
             *
             * @param config
             */
        constructor(config) {
                this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
                this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
                this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
                this._children = config && config.hasOwnProperty('children') ? config.children : this.config().children;
                this.init();
            }
            /**
             * Document element object.  This property is populated
             * during init using the document.createElementNS()
             * method.
             *
             * @returns {object}
             */
        get docElementNS() {
                return this._docElementNS;
            }
            /**
             * XML Namespace URI.  Property required by the
             * init method in order to create and populate
             * the documentNS attribute.
             *
             * @returns {string}
             */
        get xmlns() {
                return this._xmlns;
            }
            /**
             * Reference to the document element that the
             * docElementNS attribute will be added too.
             *
             * @returns {object}
             */
        get hook() {
                return this._hook;
            }
            /**
             * Flag that can be passed to class constructor
             * to automatically add the docElementNS attribute
             * to the configured hook attribute.
             *
             * @returns {boolean}
             */
        get autoBind() {
                return this._autoBind;
            }
            /**
             * Getter for children objects.
             * @returns {*}
             */
        get children() {
                return this._children;
            }
            /**
             * Method used to append the docElement to configured hook element.
             */
        bind() {
                this.hook.appendChild(this.docElementNS);
            }
            /**
             * Method called by the constructor to create and assign docElement based
             * on the properties exposed by the class.
             *
             * Note - if the autoBind flag is true, then it ends by invoking bind method.
             */
        init() {
            var i = 0,
                child = null,
                docElement = document.createElementNS(this.xmlns, 'defs');
            this._docElementNS = docElement;
            if (this.autoBind) {
                this.bind();
            }
            if (this.children.length > 0) {
                for (; i < this.children.length; i++) {
                    child = this.children[i];
                    if (child.docElementNS) {
                        this.docElementNS.appendChild(child.docElementNS);
                    }
                }
            }
        }
    }


    /**
     * Class used to wrap (or model)
     * an Scalar Vector Graphic (SVG) path,
     * "<path>", tag.
     */
    class Path {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{id: string, stroke: string, strokeWidth: string, opacity: string, xmlns: string}}
         */
        config() {
                return {
                    id: 'path1',
                    stroke: null,
                    strokeWidth: null,
                    opacity: null,
                    xmlns: Util.xmlNamespaces().xmlns,
                    data: null,
                    hook: null,
                    autoBind: false,
                    onMouseDown: null,
                    onMouseOver: null,
                    onMouseOut: null
                }
            }
            /**
             * Class constructor
             *
             * @param config
             */
        constructor(config) {
            this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
            this._stroke = config && config.hasOwnProperty('stroke') ? config.stroke : this.config().stroke;
            this._strokeWidth = config && config.hasOwnProperty('strokeWidth') ? config.strokeWidth : this.config().strokeWidth;
            this._opacity = config && config.hasOwnProperty('opacity') ? config.opacity : this.config().opacity;
            this._data = config && config.hasOwnProperty('data') ? config.data : this.config().data;
            this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
            this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
            this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
            this.init();
        }
        get xmlns() {
                return this._xmlns;
            }
            /**
             * Document element object.  This property is populated
             * during constructor using the document.createElementNS()
             * method.
             */
        get docElementNS() {
                return this._docElementNS;
            }
            /**
             * Document element id getter.
             * @returns {string|*|string|string|string|string}
             */
        get id() {
            return this._id;
        }
        get stroke() {
            return this._stroke;
        }
        get strokeWidth() {
            return this._strokeWidth;
        }
        get opacity() {
            return this._opacity;
        }
        get data() {
            return this._data;
        }
        get xmlns() {
            return this._xmlns;
        }
        get hook() {
            return this._hook;
        }
        get autoBind() {
                return this._autoBind;
            }
            /**
             * Method used to append the docElement to configured hook element.
             */
        bind() {
                this.hook.appendChild(this.docElement);
            }
            /**
             * Method called by the constructor to create and assign docElement based
             * on the properties exposed by the class.
             *
             * Note - if the autoBind flag is true, then it ends by invoking bind method.
             */
        init() {
            var docElement = document.createElementNS(this.xmlns, 'path');
            docElement.setAttribute('id', this.id);
            if (this.stroke) {
                docElement.setAttribute('stroke', this.stroke);
            }
            if (this.strokeWidth) {
                docElement.setAttribute('stroke-width', this.strokeWidth);
            }
            if (this.opacity) {
                docElement.setAttribute('opacity', this.opacity);
            }
            if (this.data) {
                docElement.setAttribute('d', this.data);
            }
            this._docElementNS = docElement;
            if (this.autoBind) {
                this.bind();
            }
        }
    }


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
         * @returns {{id: string, stroke: string, strokeWidth: number, fill: string, height: number, width: number, x: number, y: number, xmlns: string, hook: null, autoBind: boolean, onMouseOver: null, onMouseOut: null, onMouseDown: null}}
         */
        config() {
                return {
                    id: 'rect1',
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
                    hook: null,
                    autoBind: false,
                    children: [],
                    onClick: null,
                    onMouseOver: null,
                    onMouseOut: null,
                    onMouseDown: null,
                }
            }
            /**
             * Class constructor.
             *
             * @param config (optional)
             */
        constructor(config) {
                super();
                this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
                this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
                this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
                this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
                this._cssClass = config && config.hasOwnProperty('cssClass') ? config.cssClass : this.config().cssClass;
                this._opacity = config && config.hasOwnProperty('opacity') ? config.opacity : this.config().opacity;
                this._x = config && config.hasOwnProperty('x') ? config.x : this.config().x;
                this._y = config && config.hasOwnProperty('y') ? config.y : this.config().y;
                this._cornerRadius = config && config.hasOwnProperty('cornerRadius') ? config.cornerRadius : this.config().cornerRadius;
                this._width = config && config.hasOwnProperty('width') ? config.width : this.config().width;
                this._height = config && config.hasOwnProperty('height') ? config.height : this.config().height;
                this._fill = config && config.hasOwnProperty('fill') ? config.fill : this.config().fill;
                this._stroke = config && config.hasOwnProperty('stroke') ? config.stroke : this.config().stroke;
                this._strokeWidth = config && config.hasOwnProperty('strokeWidth') ? config.strokeWidth : this.config().strokeWidth;
                this._onClick = config && config.hasOwnProperty('onClick') ? config.onClick : this.config().onClick;
                this._onMouseDown = config && config.hasOwnProperty('onMouseDown') ? config.onMouseDown : this.config().onMouseDown;
                this._onMouseOut = config && config.hasOwnProperty('onMouseOut') ? config.onMouseOut : this.config().onMouseOut;
                this._onMouseOver = config && config.hasOwnProperty('onMouseOver') ? config.onMouseOver : this.config().onMouseOver;
                this._cursor = config && config.hasOwnProperty('cursor') ? config.cursor : this.config().cursor;
                this._children = config && config.hasOwnProperty('children') ? config.children : this.config().children;
                this.init();
            }
            /**
             * Document element object.  This property is populated
             * during init using the document.createElementNS()
             * method.
             *
             * @returns {object}
             */
        get docElementNS() {
            return this._docElementNS;
        }
        get id() {
            return this._id;
        }
        get cssClass() {
            return this._cssClass;
        }
        get xmlns() {
            return this._xmlns;
        }
        get hook() {
            return this._hook;
        }
        get autoBind() {
            return this._autoBind;
        }
        get onClick() {
            return this._onClick;
        }
        get onMouseOut() {
            return this._onMouseOut;
        }
        get onMouseDown() {
            return this._onMouseDown;
        }
        get onMouseOver() {
            return this._onMouseOver;
        }
        get stroke() {
            return this._stroke;
        }
        get strokeWidth() {
            return this._strokeWidth;
        }
        get fill() {
            return this._fill;
        }
        get x() {
            return this._x;
        }
        get y() {
            return this._y;
        }
        get width() {
            return this._width;
        }
        get height() {
            return this._height;
        }
        get cursor() {
            return this._cursor;
        }
        get cornerRadius() {
            return this._cornerRadius;
        }
        get opacity() {
                return this._opacity;
            }
            /**
             * Getter for children objects.
             * @returns {*}
             */
        get children() {
                return this._children;
            }
            /**
             * Method used to append the docElement to configured hook element.
             */
        bind() {
                this.hook.appendChild(this.docElementNS);
            }
            /**
             * Method called by the constructor to create and assign docElement based
             * on the properties exposed by the class.
             *
             * Note - if the autoBind flag is true, then it ends by invoking bind method.
             */
        init() {
            var docElement = document.createElementNS(this.xmlns, 'rect');
            if (this.id) {
                docElement.setAttribute('id', this.id);
            }
            if (this.cssClass) {
                docElement.setAttribute('class', this.cssClass);
            }
            if (this.x) {
                docElement.setAttribute('x', this.x);
            }
            if (this.y) {
                docElement.setAttribute('y', this.y);
            }
            if (this.width) {
                docElement.setAttribute('width', this.width);
            }
            if (this.height) {
                docElement.setAttribute('height', this.height);
            }
            if (this.fill) {
                docElement.setAttribute('fill', this.fill);
            }
            if (this.opacity) {
                docElement.setAttribute('opacity', this.opacity);
            }
            if (this.stroke) {
                docElement.setAttribute('stroke', this.stroke);
            }
            if (this.strokeWidth) {
                docElement.setAttribute('stroke-width', this.strokeWidth);
            }
            if (this.onMouseOut) {
                docElement.setAttribute('onmouseout', this.onMouseOut);
            }
            if (this.onMouseOver) {
                docElement.setAttribute('onmouseover', this.onMouseOver);
            }
            if (this.onMouseDown) {
                docElement.setAttribute('onmousedown', this)
            }
            if (this.cursor) {
                docElement.setAttribute('style', 'cursor: ' + this.cursor + ';');
            }
            if (this.cornerRadius) {
                docElement.setAttribute('rx', this.cornerRadius);
                docElement.setAttribute('ry', this.cornerRadius);
            }
            docElement.setAttribute('title', 'this is a rectangle');
            this._docElementNS = docElement;
            if (this.children.length > 0) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    if (child.docElementNS) {
                        this.docElementNS.appendChild(child.docElementNS);
                    }
                }
            }
            if (this.autoBind) {
                this.bind();
            }
        }
    }


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
        config() {
                return {
                    attributeName: 'cy',
                    attributeType: null,
                    from: null,
                    to: null,
                    dur: '10s',
                    values: '0%;100%',
                    repeatCount: 'indefinite',
                    autoBind: false
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
            this.docElementNS = document.createElementNS(this.xmlns, 'animate');
            if (this.attributeName) {
                this.docElementNS.setAttribute('attributeName', this.attributeName);
            }
            if (this.attributeType) {
                this.docElementNS.setAttribute('attributeType', this.attributeType);
            }
            if (this.from) {
                this.docElementNS.setAttribute('from', this.from);
            }
            if (this.to) {
                this.docElementNS.setAttribute('to', this.to);
            }
            if (this.dur) {
                this.docElementNS.setAttribute('dur', this.dur);
            }
            if (this.values) {
                this.docElementNS.setAttribute('values', this.values);
            }
            if (this.repeatCount) {
                this.docElementNS.setAttribute('repeatCount', this.repeatCount);
            }
            if (this.autoBind) {
                this.bind();
            }
        }
    }


    /**
     * Class used to wrap (or model)
     * an Scalar Vector Graphic (SVG) circle,
     * "<image>", tag.  For additional info,
     * see [MDN ... Image](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image).
     *
     */
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
                    opacity: 1,
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
            this.docElementNS.setAttribute('opacity', this.opacity)
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


    class Photo extends Base {
        get config() {
            return {
                url: '',
                title: '',
                width: '0',
                height: '0',
                json: null
            }
        }
        constructor(config) {
            super();
            if (config) {
                this.apply(this, config, this.config);
            }
            this.init();
        }
        init() {
            let title = this.json && this.json.hasOwnProperty('title') ? this.json.title : '',
                mediaGroup = this.json && this.json.hasOwnProperty('media:group') ? this.json['media:group'] : null,
                mediaContent = mediaGroup && mediaGroup.hasOwnProperty('media:content') ? mediaGroup['media:content'] : null,
                content = mediaContent && mediaContent.hasOwnProperty('$') ? mediaContent['$'] : null;
            if (content) {
                this.title = title;
                this.url = content.hasOwnProperty('url') ? content.url : '';
                this.width = content.hasOwnProperty('width') ? content.width : '0';
                this.height = content.hasOwnProperty('height') ? content.height : '0';
            }
        }
    }


    class PhotoAlbum extends Base {
        get config() {
            return {
                json: null,
                children: []
            }
        }
        constructor(config) {
            super();
            if (config) {
                this.apply(this, config, this.config);
                this.init();
            }
        }
        init() {
            if (this.json) {
                if (this.json.rss) {
                    if (this.json.rss.channel) {
                        if (this.json.rss.channel.item) {
                            this.json.rss.channel.item.map((item) => {
                                this.children.push(new Photo({
                                    json: item
                                }))
                            });
                        }
                    }
                }
            }
        }
    }


    class Viewport extends Surface {
        constructor(config) {
            super({
                id: 'fiddle',
                hook: config && config.hasOwnProperty('hook') ? config.hook : window.document.body,
                height: $('#fiddleHook').height(),
                width: $('#fiddleHook').width(),
                autoBind: true,
                children: config && config.hasOwnProperty('children') ? config.children : []
            });
        }
    }


    app.controller = app.controller || {
        responseText: null,
        onDOMContentLoaded: function() {
            console.log("%c" + app.metadata.consoleTag, 'font-style: italic; font-size: 20px;');
            console.log("%c" + app.metadata.gitHubUrl, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
            $('#fiddleHook').width($(document).width());
            $('#fiddleHook').height($(document).height());
            $(document).load(app.metadata.dataUrl);
            $(document).ajaxComplete(this.onAjaxComplete);
        },
        onAjaxComplete: function(event, xhr, settings) {
            /**
             * (2) On Ajax complete, parse a list of image urls
             * (3) Iterate the list (2) and build a collection of Images
             */
            if (settings.url === app.metadata.dataUrl) {
                app.model.PhotoAlbum = new PhotoAlbum({
                    json: JSON.parse(xhr.responseText)
                });
                window.setTimeout(() => {
                    app.controller.init();
                }, 500);
            }
        },
        topImage: null,
        onImageClick: function(image) {
            let fiddleHook = document.getElementById('fiddleHook'),
                svg = fiddleHook ? fiddleHook.shadowRoot.getElementById('fiddle') : null,
                topImage = new Image({
                    id: image.getAttribute('id') + '_topImage',
                    width: window.innerWidth,
                    height: window.innerHeight,
                    x: 0,
                    y: 0,
                    xlinkHref: image.getAttribute('xlink:href'),
                    onclick: 'app.controller.onImageRestore(this)'
                });
            app.controller.topImage = topImage;
            if (svg) {
                svg.innerHTML += topImage.docElementNS.outerHTML;
            }
        },
        onImageRestore: function(image) {
            let fiddleHook = document.getElementById('fiddleHook'),
                svg = fiddleHook ? fiddleHook.shadowRoot.getElementById('fiddle') : null;
            if (svg) {
                svg.removeChild(image);
            }
        },
        init: function() {
            /**
             * (4) Create an SVG element
             * (5) Inject the Image collection (3) into the SVG element
             * (6) Render (bind) the SVG element via shadow dom
             *
             *  cx: app.util.rand(0, $("#fiddleHook").width()),
             cy: app.util.rand(0, $("#fiddleHook").height()),
             */
            let fiddleHook = document.getElementById('fiddleHook'),
                objects = [],
                center = {
                    x: $(document).width() / 2,
                    y: $(document).height() / 2,
                };
            objects.push(new Pattern({
                id: 'gridPattern',
                width: 10,
                height: 10,
                units: 'userSpaceOnUse',
                children: [
                    new Path({
                        data: 'M10 0 L0 0 L0 10',
                        fill: null,
                        stroke: 'yellow',
                        strokeWidth: '0.25'
                    })
                ]
            }));
            objects.push(new Rectangle({
                id: 'root',
                x: 0,
                y: 0,
                height: $(document).height(),
                width: $(document).width(),
                fill: 'url(#gridPattern)'
            }));
            app.model.PhotoAlbum.children.map((photo, index) => {
                let radius = $(document).width() < $(document).height() ? $(document).width() / 2 : $(document).height() / 2,
                    randX = Util.rand(0, $(document).width()),
                    randY = Util.rand(0, $(document).height()),
                    dur = Util.rand(120, 240) + 's',
                    circularPathArr = Util.toCircularPointArray(randX, randY, radius),
                    startingIndex = Util.rand(0, circularPathArr.length - 1),
                    startingPoint = circularPathArr[startingIndex],
                    reorderedPathArr = Util.reorderFrom(circularPathArr, startingIndex),
                    animatedValues1 = Util.flattenToValues(reorderedPathArr, 'x'),
                    animatedValues2 = Util.flattenToValues(reorderedPathArr, 'y'),
                    animateX = new Animate({
                        attributeName: 'x',
                        dur: dur,
                        values: animatedValues1,
                        repeatCount: 'indefinite'
                    }),
                    animateY = new Animate({
                        attributeName: 'y',
                        dur: dur,
                        values: animatedValues2,
                        repeatCount: 'indefinite'
                    }),
                    animateOpacity = new Animate({
                        attributeName: 'opacity',
                        values: '1;.9;.8;.7;.6;.5;.6;.7;.8;.9',
                        dur: dur,
                        repeatCount: 'indefinite'
                    });
                objects.push(new Image({
                    id: photo.title,
                    width: objects.length % 4 === 0 ? Math.floor((+photo.width) / 4) : Math.floor((+photo.width) / 6),
                    height: objects.length % 4 === 0 ? Math.floor((+photo.height) / 4) : Math.floor((+photo.height) / 6),
                    x: startingPoint.x,
                    y: startingPoint.y,
                    xlinkHref: photo.url,
                    opacity: '.5',
                    onclick: 'app.controller.onImageClick(this)',
                    children: [animateOpacity, animateX, animateY]
                }));
            });
            app.view.Viewport = new Viewport({
                hook: fiddleHook,
                children: objects
            });
            document.body.style.background = '#000000';
        }
    };
    document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
})(window.app = window.app || {})
