(function(app) {
    "use strict";


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
     * an Scalar Vector Graphic (SVG) stop,
     * "<stop>", tag.  This tag
     * is used as a child element of either
     * the linear gradient, "lineargradient",
     * or radial gradient, "radialgradient" tags.
     * For additional info refer to
     * [MDN ... stop](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop).
     *
     */
    class Stop {
        config() {
            return {
                hook: null,
                autoBind: false,
                offset: "0%",
                color: "#000",
                opacity: null,
                xmlns: Util.xmlNamespaces().xmlns
            };
        }
        constructor(config) {
                this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
                this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
                this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
                this._offset = config && config.hasOwnProperty('offset') ? config.offset : this.config().offset;
                this._color = config && config.hasOwnProperty('color') ? config.color : this.config().color;
                this._opacity = config && config.hasOwnProperty('opacity') ? config.opacity : this.config().opacity;
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
             * Getter for the offset, "offset", tag attribute.
             *
             * @returns {*}
             */
        get offset() {
                return this._offset;
            }
            /**
             * Getter for the color, "stop-color", tag attribute.
             *
             * @returns {*}
             */
        get color() {
                return this._color;
            }
            /**
             * Getter for the optional opacity, "stop-opacity", tag attribute.
             *
             * @returns {*}
             */
        get opacity() {
                return this._opacity;
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
            var docElement = document.createElementNS(this.xmlns, 'stop');
            docElement.setAttribute('offset', this.offset);
            if (this.color) {
                docElement.setAttribute('stop-color', this.color);
            }
            if (this.opacity) {
                docElement.setAttribute('stop-opacity', this.opacity);
            }
            this._docElementNS = docElement;
            if (this.autoBind) {
                this.bind();
            }
        }
    }


    /**
     * Class used to wrap (or model)
     * an Scalar Vector Graphic (SVG) animate transform,
     * "<animatetransform>", tag.  This tag
     * is used as a child element to create a property transition effect
     * for the parent element.  By default, the class can be used
     * to render the following example (or "test") animateTransform svg markup:
     *
     *      var animateTransform = new AnimateTransform();
     *
     *      =
     *
     *      <animateTransform
     *          id="animateTransform1"
     *          attributeName="transform"
     *          type="rotate"
     *          begin="0s"
     *          dur="43200s"
     *          repeatCount="indefinite"
     *          from="272,550,250"
     *          to="632,550,250">
     *      </animateTransform>
     *
     * For additional info refer to
     * [MDN ... animatetransform](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateTransform).
     *
     */
    class AnimateTransform {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{id: string, hook: null, autoBind: boolean, attributeName: string, from: string, to: string, begin: string, duration: string, repeat: string, xmlns: string}}
         */
        config() {
                return {
                    id: 'animateTransform1',
                    hook: null,
                    autoBind: false,
                    attributeName: "transform",
                    type: "rotate",
                    by: null,
                    from: "272,550,250",
                    to: "632,550,250",
                    begin: "0s",
                    duration: "43200s",
                    repeat: "indefinite",
                    xmlns: Util.xmlNamespaces().xmlns
                };
            }
            /**
             * Class Constructor.
             *
             * @param config
             */
        constructor(config) {
                this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
                this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
                this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
                this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
                this._attributeName = config && config.hasOwnProperty('attributeName') ? config.attributeName : this.config().attributeName;
                this._type = config && config.hasOwnProperty('type') ? config.type : this.config().type;
                this._from = config && config.hasOwnProperty('from') ? config.from : this.config().from;
                this._to = config && config.hasOwnProperty('to') ? config.to : this.config().to;
                this._by = config && config.hasOwnProperty('by') ? config.by : this.config().by;
                this._begin = config && config.hasOwnProperty('begin') ? config.begin : this.config().begin;
                this._duration = config && config.hasOwnProperty('duration') ? config.duration : this.config().duration;
                this._repeat = config && config.hasOwnProperty('repeat') ? config.repeat : this.config().repeat;
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
             * Getter used to access the attribute name, "attributeName", tag attribute.
             * @returns {*}
             */
        get attributeName() {
                return this._attributeName;
            }
            /**
             * Getter used to access the type tag attribute.
             *
             * @returns {*}
             */
        get type() {
                return this._type;
            }
            /**
             * Getter used to access the "from" tag attribute.
             *
             * @returns {*}
             */
        get from() {
                return this._from;
            }
            /**
             * Getter used to access the "to" tag attribute.
             * @returns {*}
             */
        get to() {
                return this._to;
            }
            /**
             * Getter used to access the "begin" tag attribute.
             *
             * @returns {*}
             */
        get begin() {
                return this._begin;
            }
            /**
             * Getter used to access the duration, "dur", tag attribute.
             *
             * @returns {*}
             */
        get duration() {
                return this._duration;
            }
            /**
             * Getter used to access the repeat count, "repeatCount", tag attribute.
             *
             * @returns {*}
             */
        get repeat() {
                return this._repeat;
            }
            /**
             * Getter used to access the optional "by" tag attribute.
             *
             * @returns {*}
             */
        get by() {
                return this._by;
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
            var docElement = document.createElementNS(this.xmlns, 'animateTransform');
            if (this.id) {
                docElement.setAttribute('id', this.id);
            }
            if (this.attributeName) {
                docElement.setAttribute('attributeName', this.attributeName);
            }
            if (this.type) {
                docElement.setAttribute('type', this.type);
            }
            if (this.from) {
                docElement.setAttribute('from', this.from);
            }
            if (this.to) {
                docElement.setAttribute('to', this.to);
            }
            if (this.begin) {
                docElement.setAttribute('begin', this.begin);
            }
            if (this.duration) {
                docElement.setAttribute('dur', this.duration);
            }
            if (this.by) {
                docElement.setAttribute('by', this.by);
            }
            if (this.repeat) {
                docElement.setAttribute('repeatCount', this.repeat);
            }
            this._docElementNS = docElement;
            if (this.autoBind) {
                this.bind();
            }
        }
    }


    /**
     * Class used to wrap (or model)
     * an Scalar Vector Graphic (SVG) radial gradient,
     * "<radialgradient>", tag.  For additional info
     * refer to [MDN ... radialgradient](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient).
     */
    class RadialGradient {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{id: string, xmlns: string, hook: null, autoBind: boolean, xFrequency: null, yFrequency: null, children: Array}}
         */
        config() {
                return {
                    id: 'radialgradient1',
                    xmlns: Util.xmlNamespaces().xmlns,
                    hook: null,
                    autoBind: false,
                    xFrequency: null,
                    yFrequency: null,
                    children: []
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
                this._xFrequency = config && config.hasOwnProperty('xFrequency') ? config.xFrequency : this.config().xFrequency;
                this._yFrequency = config && config.hasOwnProperty('yFrequency') ? config.yFrequency : this.config().yFrequency;
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
             * Getter for the optional frequency X, "fx", tag attribute.
             *
             * @returns {*}
             */
        get xFrequency() {
                return this._xFrequency;
            }
            /**
             * Getter for the optional frequency Y, "fy", tag attribute.
             *
             * @returns {*}
             */
        get yFrequency() {
                return this._yFrequency;
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
                docElement = document.createElementNS(this.xmlns, 'radialGradient');
            docElement.setAttribute('id', this.id);
            if (this.xFrequency) {
                docElement.setAttribute('fx', this.xFrequency);
            }
            if (this.yFrequency) {
                docElement.setAttribute('fy', this.yFrequency);
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
     * an Scalar Vector Graphic (SVG) radial gradient,
     * "<lineargradient>", tag.  For additional info
     * refer to [MDN ... lineargradient](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient).
     */
    class LinearGradient {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{id: string, xmlns: string, hook: null, autoBind: boolean, start: {x: string, y: string}, end: {x: string, y: string}, spreadMethod: null, link: null, children: Array}}
         */
        config() {
                return {
                    id: 'lineargradient1',
                    xmlns: Util.xmlNamespaces().xmlns,
                    hook: null,
                    autoBind: false,
                    units: null,
                    transform: null,
                    startCoordinates: {
                        x: '0%',
                        y: '0%'
                    },
                    endCoordinates: {
                        x: '100%',
                        y: '100%'
                    },
                    xFrequency: null,
                    yFrequency: null,
                    spreadMethod: null,
                    link: null,
                    children: []
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
                this._units = config && config.hasOwnProperty('units') ? config.units : this.config().units;
                this._startCoordinates = config && config.hasOwnProperty('startCoordinates') ? config.startCoordinates : this.config().startCoordinates;
                this._endCoordinates = config && config.hasOwnProperty('endCoordinates') ? config.endCoordinates : this.config().endCoordinates;
                this._link = config && config.hasOwnProperty('link') ? config.link : this.config().link;
                this._xFrequency = config && config.hasOwnProperty('xFrequency') ? config.xFrequency : this.config().xFrequency;
                this._yFrequency = config && config.hasOwnProperty('yFrequency') ? config.yFrequency : this.config().yFrequency;
                this._spreadMethod = config && config.hasOwnProperty('spreadMethod') ? config.spreadMethod : this.config().spreadMethod;
                this._transform = config && config.hasOwnProperty('transform') ? config.transform : this.config().transform;
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
             * Getter for the optional start coordinate pair. When present, the values are used to assign the "x1" and "y1" tag attributes.
             *
             * @returns {x: *, y: *}
             */
        get startCoordinates() {
                return this._startCoordinates;
            }
            /**
             * Getter for the optional end coordinate pair. When present, the values are used to assign the "x2" and "y2" tag attributes.
             *
             * @returns {*}
             */
        get endCoordinates() {
                return this._endCoordinates;
            }
            /**
             * Getter for the optional frequency X, "fx", tag attribute.
             *
             * @returns {*}
             */
        get xFrequency() {
                return this._xFrequency;
            }
            /**
             * Getter for the optional frequency Y, "fy", tag attribute.
             *
             * @returns {*}
             */
        get yFrequency() {
                return this._yFrequency;
            }
            /**
             * Getter for the optional gradient transform, "gradientTransform", tag attribute.
             *
             * @returns {*}
             */
        get transform() {
                return this._transform;
            }
            /**
             * Getter for the optional gradient units, "gradientUnits", tag attribute.
             *
             * @returns {*}
             */
        get units() {
                return this._units;
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
             * Getter for the optional spread method, "spreadMethod", tag attribute.
             *
             * @returns {*}
             */
        get spreadMethod() {
                return this._spreadMethod;
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
                docElement = document.createElementNS(this.xmlns, 'linearGradient');
            docElement.setAttribute('id', this.id);
            if (this.startCoordinates) {
                docElement.setAttribute('x1', this.startCoordinates.x);
                docElement.setAttribute('y1', this.startCoordinates.y);
            }
            if (this.endCoordinates) {
                docElement.setAttribute('x2', this.endCoordinates.x);
                docElement.setAttribute('y2', this.endCoordinates.y);
            }
            if (this.link) {
                docElement.setAttributeNS(Util.xmlNamespaces().xmlnsXLink, 'href', this.link);
            }
            if (this.spreadMethod) {
                docElement.setAttribute('spreadMethod', this.spreadMethod);
            }
            if (this.transform) {
                docElement.setAttribute('gradientTransform', this.transform);
            }
            if (this.units) {
                docElement.setAttribute('gradientUnits', this.units);
            }
            if (this.xFrequency) {
                docElement.setAttribute('fx', this.xFrequency);
            }
            if (this.yFrequency) {
                docElement.setAttribute('fy', this.yFrequency);
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
     * an Scalar Vector Graphic (SVG) circle,
     * "<g>", tag.  This tag
     * is used to "group" elements within
     * a given SVG block.  For additional info,
     * see [MDN ... Circle](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle).
     *
     */
    class Circle {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{id: string, stroke: string, strokeWidth: number, centerX: string, centerY: string, radius: string, fill: null, xmlns: string, hook: null, children: Array, autoBind: boolean}}
         */
        config() {
                return {
                    id: 'circle1',
                    stroke: null,
                    strokeWidth: null,
                    centerX: null,
                    centerY: null,
                    radius: 0,
                    fill: null,
                    fillOpacity: null,
                    strokeDash: null,
                    strokeOpacity: null,
                    transform: null,
                    xmlns: Util.xmlNamespaces().xmlns,
                    hook: null,
                    children: [],
                    autoBind: false
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
                this._stroke = config && config.hasOwnProperty('stroke') ? config.stroke : this.config().stroke;
                this._strokeWidth = config && config.hasOwnProperty('strokeWidth') ? config.strokeWidth : this.config().strokeWidth;
                this._strokeOpacity = config && config.hasOwnProperty('strokeOpacity') ? config.strokeOpacity : this.config().strokeOpacity;
                this._strokeDash = config && config.hasOwnProperty('strokeDash') ? config.strokeDash : this.config().strokeDash;
                this._fill = config && config.hasOwnProperty('fill') ? config.fill : this.config().fill;
                this._fillOpacity = config && config.hasOwnProperty('fillOpacity') ? config.fillOpacity : this.config().fillOpacity;
                this._centerX = config && config.hasOwnProperty('centerX') ? config.centerX : this.config().centerX;
                this._centerY = config && config.hasOwnProperty('centerY') ? config.centerY : this.config().centerY;
                this._radius = config && config.hasOwnProperty('radius') ? config.radius : this.config().radius;
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
             * Getter for stroke attribute.
             * @returns {*}
             */
        get stroke() {
                return this._stroke;
            }
            /**
             * Getter for strokeWidth attribute.
             * @returns {*}
             */
        get strokeWidth() {
                return this._strokeWidth;
            }
            /**
             * Getter for opational stroke opacity, "stroke-opacity" tag attribute.
             *
             * @returns {*}
             */
        get strokeOpacity() {
                return this._strokeOpacity;
            }
            /**
             * Getter for optional stroke dash array, "stroke-dasharray" tag attribute.
             *
             * @returns {*}
             */
        get strokeDash() {
                return this._strokeDash;
            }
            /**
             * Getter for the optional pattern transform tag attribute.
             *
             * @returns {*}
             */
        get transform() {
                return this._transform;
            }
            /**
             * Getter for the fill attribute.
             *
             * @returns {*}
             */
        get fill() {
                return this._fill;
            }
            /**
             * Getter for the optional fill opacity, "fill-opacity", tag attribute.
             *
             * @returns {*}
             */
        get fillOpacity() {
                return this._fillOpacity;
            }
            /**
             * Getter for the radius, "r", attribute.
             *
             * @returns {*}
             */
        get radius() {
                return this._radius;
            }
            /**
             * Getter for the center X, "cx", attribute.
             *
             * @returns {*}
             */
        get centerX() {
                return this._centerX;
            }
            /**
             * Getter for the center Y, "cy", attribute.
             *
             * @returns {*}
             */
        get centerY() {
                return this._centerY;
            }
            /**
             * Getter for children objects.
             * @returns {*}
             */
        get children() {
                return this._children;
            }
            /**
             * Getter for the circle's diameter.
             *
             * @returns {*}
             */
        get diameter() {
                if (this.radius && typeof this.radius === 'number') {
                    return parseInt(this.radius);
                }
                return 0;
            }
            /**
             * Getter used to get the circumference of the circle.
             *
             * @returns {number}
             */
        get circumference() {
                return Math.floor(this.diameter * Math.PI);
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
                docElement = document.createElementNS(this.xmlns, 'circle');
            if (this.radius) {
                docElement.setAttribute('r', this.radius);
            }
            if (this.centerX) {
                docElement.setAttribute('cx', this.centerX);
            }
            if (this.centerY) {
                docElement.setAttribute('cy', this.centerY);
            }
            if (this.id) {
                docElement.setAttribute('id', this.id);
            }
            if (this.fill) {
                docElement.setAttribute('fill', this.fill);
            }
            if (this.fillOpacity) {
                docElement.setAttribute('fill-opacity', this.fillOpacity);
            }
            if (this.stroke) {
                docElement.setAttribute('stroke', this.stroke);
            }
            if (this.strokeWidth) {
                docElement.setAttribute('stroke-width', this.strokeWidth);
            }
            if (this.strokeDash) {
                docElement.setAttribute('stroke-dasharray', this.strokeDash);
            }
            if (this.strokeOpacity) {
                docElement.setAttribute('stroke-opacity', this.strokeOpacity);
            }
            if (this.transform) {
                docElement.setAttribute('transform', this.transform);
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
    class Rectangle {
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
     * Class used to wrap (or model)
     * an Scalar Vector Graphic (SVG) group,
     * "<g>", tag.  This tag
     * is used to "group" elements within
     * a given SVG block.
     */
    class Group {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{id: string, stroke: null, strokeWidth: null, opacity: null, xmlns: string, hook: null, autoBind: boolean, onMouseDown: string, onKeyUp: string, children: Array, transform: null, visibility: null, zIndex: null}}
         */
        config() {
                return {
                    id: 'group1',
                    stroke: null,
                    controller: null,
                    strokeWidth: null,
                    opacity: null,
                    width: null,
                    height: null,
                    x: 0,
                    y: 0,
                    xmlns: Util.xmlNamespaces().xmlns,
                    hook: null,
                    autoBind: false,
                    onMouseDown: null,
                    onKeyUp: null,
                    onRender: null,
                    children: [],
                    transform: null,
                    visibility: null,
                    zIndex: null,
                    cursor: null,
                    parent: null
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
                this._onKeyUp = config && config.hasOwnProperty('onKeyUp') ? config.onKeyUp : this.config().onKeyUp;
                this._onMouseDown = config && config.hasOwnProperty('onMouseDown') ? config.onMouseDown : this.config().onMouseDown;
                this._onRender = config && config.hasOwnProperty('onRender') ? config.onRender : this.config().onRender;
                this._children = config && config.hasOwnProperty('children') ? config.children : this.config().children;
                this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
                this._transform = config && config.hasOwnProperty('transform') ? config.transform : this.config().transform;
                this._visibility = config && config.hasOwnProperty('visibility') ? config.visibility : this.config().visibility;
                this._zIndex = config && config.hasOwnProperty('zIndex') ? config.zIndex : this.config().zIndex;
                this._opacity = config && config.hasOwnProperty('opacity') ? config.opacity : this.config().opacity;
                this._strokeWidth = config && config.hasOwnProperty('strokeWidth') ? config.strokeWidth : this.config().strokeWidth;
                this._stroke = config && config.hasOwnProperty('stroke') ? config.stroke : this.config().stroke;
                this._controller = config && config.hasOwnProperty('controller') ? config.controller : this.config().controller;
                this._width = config && config.hasOwnProperty('width') ? config.width : this.config().width;
                this._height = config && config.hasOwnProperty('height') ? config.height : this.config().height;
                this._x = config && config.hasOwnProperty('x') ? config.x : this.config().x;
                this._y = config && config.hasOwnProperty('y') ? config.y : this.config().y;
                this.init();
            }
            /**
             * Getter for the component controller class.
             * @returns {*}
             */
        get controller() {
                return this._controller;
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
             * Getter for the onKeyUp event handler.
             *
             * @returns {string}
             */
        get onKeyUp() {
                return this._onKeyUp;
            }
            /**
             * Getter for the onMouseDown event handler.
             *
             * @returns {*}
             */
        get onMouseDown() {
                return this._onMouseDown;
            }
            /**
             * Getter for the optional render event handler.  This
             * handler can be used to delay event from firing
             * until the parent has been assigned.
             *
             * @returns {*}
             */
        get onRender() {
                return this._onRender;
            }
            /**
             * Setter for the optional render event handler.
             *
             * @param fn
             */
        set onRender(fn) {
                this._onRender = fn;
            }
            /**
             * Setter that can be used to assign the parent attribute
             * after the class is initialized.
             *
             * @param obj
             */
        set parent(obj) {
                this._parent = obj;
                if (this.onRender) {
                    this.onRender(this);
                }
            }
            /**
             * Getter used to access the parent element (or class) attribute.
             * @returns {*}
             */
        get parent() {
                return this._parent;
            }
            /**
             * Getter for children objects.
             * @returns {*}
             */
        get children() {
                return this._children;
            }
            /**
             * Getter for transform attribute.
             * @returns {*}
             */
        get transform() {
                return this._transform;
            }
            /**
             * Getter for opacity attribute.
             * @returns {*}
             */
        get opacity() {
                return this._opacity;
            }
            /**
             * Getter for stroke attribute.
             * @returns {*}
             */
        get stroke() {
                return this._stroke;
            }
            /**
             * Getter for strokeWidth attribute.
             * @returns {*}
             */
        get strokeWidth() {
                return this._strokeWidth;
            }
            /**
             * Getter for visibility attribute.
             *
             * @returns {*}
             */
        get visibility() {
                return this._visibility;
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
             * Getter for zIndex attribute.
             *
             * @returns {*}
             */
        get zIndex() {
                return this._zIndex;
            }
            /**
             * Method used to append the docElement to configured hook element.
             */
        bind() {
                this.hook.appendChild(this.docElementNS);
            }
            /**
             * Method used to construct ("initialize") the configured controller class.
             */
        initController() {
                var className = this.controller,
                    initCmd = 'new ' + className + '({ view: this });';
                this._controller = eval(initCmd);
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
                docElement = document.createElementNS(this.xmlns, 'g');
            docElement.setAttribute('id', this.id);
            if (this.x) {
                docElement.setAttribute('x', this.x);
            }
            if (this.y) {
                docElement.setAttribute('y', this.y);
            }
            if (this.onMouseDown) {
                docElement.setAttribute('onmousedown', this.onMouseDown);
            }
            if (this.onKeyUp) {
                docElement.setAttribute('onkeyup', this.onKeyUp);
            }
            if (this.transform) {
                docElement.setAttribute('transform', this.transform);
            }
            if (this.stroke) {
                docElement.setAttribute('stroke', this.stroke);
            }
            if (this.strokeWidth) {
                docElement.setAttribute('stroke-width', this.strokeWidth);
            }
            if (this.visibility) {
                docElement.setAttribute('visibility', this.visibility);
            }
            if (this.opacity) {
                docElement.setAttribute('opacity', this.opacity);
            }
            if (this.zIndex) {
                docElement.setAttribute('z-index', this.zIndex);
            }
            if (this.width) {
                docElement.setAttribute('width', this.width);
            }
            if (this.height) {
                docElement.setAttribute('height', this.height);
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
            if (this.controller) {
                this.initController();
            }
            if (this.autoBind) {
                this.bind();
            }
        }
    }


    /**
     * Class used to wrap (or model)
     * an Scalar Vector Graphic (SVG) text,
     * "<text>", tag.  This tag
     * is used to add text blocks on
     * screen. For additional info
     * refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text).
     */
    class Text {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{id: string, x: number, y: number, xmlns: string, hook: null, autoBind: boolean, text: string, onMouseOver: string, onMouseOut: string, onMouseDown: string, onClick: string}}
         */
        config() {
                return {
                    id: 'text1',
                    x: 0,
                    y: 0,
                    xmlns: Util.xmlNamespaces().xmlns,
                    hook: null,
                    autoBind: false,
                    cursor: null,
                    text: null,
                    style: null,
                    fontFamily: null,
                    fontSize: null,
                    children: [],
                    onMouseOver: null,
                    onMouseOut: null,
                    onMouseDown: null,
                    onClick: null,
                    textAlign: 'start'
                }
            }
            /**
             * Class constructor
             * @param config (optional)
             */
        constructor(config) {
                this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
                this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
                this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
                this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
                this._onMouseDown = config && config.hasOwnProperty('onMouseDown') ? config.onMouseDown : this.config().onMouseDown;
                this._onMouseOut = config && config.hasOwnProperty('onMouseOut') ? config.onMouseOut : this.config().onMouseOut;
                this._onMouseOver = config && config.hasOwnProperty('onMouseOver') ? config.onMouseOver : this.config().onMouseOver;
                this._onClick = config && config.hasOwnProperty('onClick') ? config.onClick : this.config().onClick;
                this._x = config && config.hasOwnProperty('x') ? config.x : this.config().x;
                this._y = config && config.hasOwnProperty('y') ? config.y : this.config().y;
                this._text = config && config.hasOwnProperty('text') ? config.text : this.config().text;
                this._cursor = config && config.hasOwnProperty('cursor') ? config.cursor : this.config().cursor;
                this._textAlign = config && config.hasOwnProperty('textAlign') ? config.textAlign : this.config().textAlign;
                this._fontSize = config && config.hasOwnProperty('fontSize') ? config.fontSize : this.config().fontSize;
                this._fontFamily = config && config.hasOwnProperty('fontFamily') ? config.fontFamily : this.config().fontFamily;
                this._style = config && config.hasOwnProperty('style') ? config.style : this.config().style;
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
        get xmlns() {
            return this._xmlns;
        }
        get hook() {
            return this._hook;
        }
        get autoBind() {
            return this._autoBind;
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
        get onClick() {
            return this._onClick;
        }
        get x() {
            return this._x;
        }
        get y() {
            return this._y;
        }
        get text() {
            return this._text;
        }
        get fontSize() {
            return this._fontSize;
        }
        get fontFamily() {
                return this._fontFamily;
            }
            /**
             * Getter used to access the optional "style" tag attribute.
             * @returns {*}
             */
        get style() {
            return this._style;
        }
        get cursor() {
            return this._cursor;
        }
        get textAlign() {
                return this._textAlign;
            }
            /**
             * Getter for children objects.
             * @returns {*}
             */
        get children() {
            return this._children;
        }
        init() {
            var docElement = document.createElementNS(this.xmlns, 'text'),
                textNode = this.text ? document.createTextNode(this.text) : null,
                style = 'text-anchor: ' + this.textAlign + ';';
            if (this.id) {
                docElement.setAttribute('id', this.id);
            }
            if (this.onMouseOut) {
                docElement.setAttribute('onmouseout', this.onMouseOut);
            }
            if (this.onMouseDown) {
                docElement.setAttribute('onmousedown', this.onMouseDown);
            }
            if (this.onMouseOver) {
                docElement.setAttribute('onmouseover', this.onMouseOver);
            }
            if (this.onClick) {
                docElement.setAttribute('onclick', this.onClick);
            }
            if (this.cursor) {
                style += ' cursor: ' + this.cursor + ';'
            }
            if (this.style) {
                style += ' ' + this.style;
            }
            docElement.setAttribute('style', style);
            docElement.setAttribute('x', this.x);
            docElement.setAttribute('y', this.y);
            if (this.fontFamily) {
                docElement.setAttribute('font-family', this.fontFamily);
            } else {
                docElement.setAttribute('font-family', "arial");
            }
            if (this.fontSize) {
                docElement.setAttribute('font-size', this.fontSize);
            } else {
                docElement.setAttribute('font-size', '12');
            }
            if (textNode) {
                docElement.appendChild(textNode);
            }
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
        bind() {
            if (this.hook) {
                this.hook.appendChild(this.docElementNS);
            }
        }
    }


    /**
     * Class used to wrap (or model)
     * an Scalar Vector Graphic (SVG) text path,
     * "<textpath>", tag.  This tag
     * is used to add text blocks on
     * screen.
     */
    class TextPath {
        config() {
            return {
                id: 'textpath1',
                link: null,
                xmlns: Util.xmlNamespaces().xmlns,
                hook: null,
                autoBind: false,
                cursor: null,
                text: '&nbsp;'
            }
        }
        constructor(config) {
                this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
                this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
                this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
                this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
                this._text = config && config.hasOwnProperty('text') ? config.text : this.config().text;
                this._cursor = config && config.hasOwnProperty('cursor') ? config.cursor : this.config().cursor;
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
        get id() {
            return this._id;
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
        get text() {
            return this._text;
        }
        get cursor() {
            return this._cursor;
        }
        get link() {
            return this._link;
        }
        init() {
            var docElement = document.createElementNS(this.xmlns, 'textPath'),
                textNode = this.text ? document.createTextNode(this.text) : null;
            if (this.id) {
                docElement.setAttribute('id', this.id);
            }
            if (this.cursor) {
                style += ' cursor: ' + this.cursor + ';'
            }
            if (this.link) {
                docElement.setAttributeNS(Util.xmlNamespaces().xmlnsXLink, 'href', this.link);
            }
            if (textNode) {
                docElement.appendChild(textNode);
            }
            this._docElementNS = docElement;
            if (this.autoBind) {
                this.bind();
            }
        }
        bind() {
            if (this.hook) {
                this.hook.appendChild(this.docElementNS);
            }
        }
    }


    class ViewController {
        config() {
            return {
                name: 'ViewController1',
                mixins: [],
                view: null
            }
        }
        constructor(config) {
            this._prototype = new Object();
            this._mixins = config && config.hasOwnProperty('mixins') ? this._mixins = config.mixins : this.config().mixins;
            this._name = config && config.hasOwnProperty('name') ? this._name = config.name : this.config().name;
            this._view = config && config.hasOwnProperty('view') ? this._view = config.view : this.config().view;
            this.init();
        }
        get prototype() {
            return this._prototype;
        }
        get name() {
            return this._name;
        }
        get mixins() {
            return this._mixins;
        }
        get view() {
            return this._view;
        }
        applyMixin(mixin) {
            var target = this,
                source = mixin.prototype;
            Object.getOwnPropertyNames(source).forEach(function(name) {
                if (name !== "constructor" || name !== "afterInit") Object.defineProperty(target, name,
                    Object.getOwnPropertyDescriptor(source, name));
            });
            if (mixin.prototype.hasOwnProperty('afterInit')) {
                mixin.prototype.afterInit(this.view, this);
            }
        }
        init() {
            var statement = '',
                mixin = null,
                i = 0;
            for (; i < this.mixins.length; i++) {
                statement = 'new ' + this.mixins[i] + '();';
                mixin = eval(statement);
                if (mixin) {
                    this.applyMixin(mixin);
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
                    this.hook.appendChild(this.docElementNS);
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
     * Collection of static event
     * handler methods.
     */
    class AppController {
        /**
         * Static method used to configure default
         * event handlers. If a
         * class is defined with a specific
         * set of event handlers, this method
         * can be used to wire-up (and then test) the default
         * configuration. Impetus for this method
         * came from the addition of the Text class.
         */
        static onEmptyFn() {
                return true;
            }
            /**
             * Static method used to handle (listen for)
             * the Surface (svg) load event.
             *
             * @param evt {object}
             * @param id {string}
             */
        static onSurfaceLoad(evt) {
                console.log('onSurfaceLoad');
                console.log(evt);
            }
            /**
             * Static method used to handle (listen for)
             * the Path Mouse down event.
             *
             * @param evt {object}
             * @param id {string}
             */
        static onPathMouseDown(evt, id) {
                console.log('onPathMouseDown');
                if (!app.controller.selectedShape) {
                    app.controller.selectShape(evt, id);
                }
            }
            /**
             * Static method used to handle (listen for)
             * the Path Mouse over event.
             *
             * @param evt {object}
             * @param id {string}
             */
        static onPathMouseOver(evt, id) {
                console.log('onPathMouseOver');
                var opacity = '';
                if (id === 'over') {
                    opacity = app.controller.selectedShape.getAttribute('opacity');
                    app.controller.selectedShape.setAttribute('stroke', 'red');
                    app.controller.selectedShape.setAttribute('stroke-width', 3);
                    app.controller.selectedShape.setAttribute('opacity', 3 * opacity / 4);
                }
                /**
                 if (!first) return
                 if (o=='over'){
                        opac=document.getElementById("P"+c).getAttribute("opacity")
                        document.getElementById("P"+c).setAttribute("stroke","red")
                        document.getElementById("P"+c).setAttribute("stroke-width",3)
                        document.getElementById("P"+c).setAttribute("opacity",3*opac/4)
                        //Chosen=svgDocument.getElementById("P"+c)
                    }
                 else{
                        document.getElementById("P"+c).setAttribute("stroke","black")
                        document.getElementById("P"+c).setAttribute("opacity",opac)
                        document.getElementById("P"+c).setAttribute("stroke-width",1)
                    }
                 */
            }
            /**
             * Static method used to handle (listen for)
             * the Path Mouse out event.
             *
             * @param evt {object}
             * @param id {string}
             */
        static onPathMouseOut(evt, id) {
                console.log('onPathMouseOut');
                console.log(id);
            }
            /**
             * Static method used to handle (listen for)
             * the group mouse down event.
             *
             * @param evt {object}
             */
        static onShapeGroupMouseDown(evt) {
            console.log('onGroupMouseDown');
            console.log(evt);
        }
        static onTextMouseDown(evt) {}
        static onTextMouseOver(evt) {}
        static onTextMouseOut(evt) {}
        static onTextClick(evt) {}
        static selectShape(evt, id) {
            var shapesGroup = document.getElementById('shapesGroup'),
                groupTransform = Util.splitAttribute('shapesGroup', 'transform', 'translate(0,0)'),
                oldX = evt.clientX - parseInt(groupTransform[1]),
                oldY = evt.clientY - parseInt(groupTransform[2]);
            app.controller.selectedShape = document.getElementById(id);
            app.controller.selectedShape.setAttribute('onmouseup', "app.controller.onSelectedShapeMouseUp()");
            app.controller.selectedShape.setAttribute('stroke-width', 2);
            app.controller.selectedShape.setAttribute('stroke', 'yellow');
            shapesGroup.setAttribute('onmousemove', 'app.controller.onSelectedShapeDrag(evt,' + oldX + ', ' + oldY + ')');
            /*if (!first) return;
            Chosen=document.getElementById(U);
            GT=getTransform(Chosen);
            oldX=evt.clientX - parseInt(GT[1]);
            oldY=evt.clientY - parseInt(GT[2]);
            place.setAttribute("onmousemove", "drag(evt)");
            Chosen.setAttribute("onmouseup", "selectIt()");
            thingclicked=true
            Chosen.setAttribute("stroke-width", 3);
            Chosen.setAttribute("stroke", "green");
            ShowPts();*/
        }
        static onSelectedShapeDrag(evt, x, y) {
            console.log('onSelectedShapeDrag');
            var shapesGroup = document.getElementById('shapesGroup'),
                deltaX = evt.clientX - x,
                deltaY = evt.clientY - y,
                shapeTransform = "translate(" + (deltaX) + "," + (deltaY) + ")";
            app.controller.selectedShape.setAttribute("transform", shapeTransform);
            shapesGroup.setAttribute('onmouseup', 'app.controller.onSelectedShapeDrop()');
            app.controller.selectedShape.setAttribute("onmouseup", null);
            /*
             ShowPts()
             place.setAttribute("onmouseup", "stopdrag()");
             nX=evt.clientX-oldX;
             nY=evt.clientY-oldY;
             if (grid){
             nX=Math.floor(nX/gridsize)*gridsize+gridsize/2
             nY=Math.floor(nY/gridsize)*gridsize+gridsize/2
             }
             sT="translate("+(nX)+","+(nY)+")"
             Chosen.setAttribute("transform", sT);
             if (PGon) PG.setAttribute("transform", sT);
             Chosen.setAttribute("onmouseup", null);
             */
        }
        static onSelectedShapeDrop() {
            console.log('onSelectedShapeDrop');
            var shapesGroup = document.getElementById('shapesGroup');
            shapesGroup.setAttribute('onmousemove', null);
            shapesGroup.setAttribute('onmouseup', null);
            //shapesGroup.setAttribute('transform', 'translate(0,0)');
            app.controller.selectedShape.setAttribute('mouseover', null);
            app.controller.selectedShape.setAttribute('mousemove', null);
            app.controller.selectedShape.setAttribute('stroke-width', '1');
            app.controller.selectedShape.setAttribute('stroke', 'black');
            app.controller.selectedShape = null;
            /*
              place.setAttribute("onmousemove", null);
              place.setAttribute("onmouseup", null);
              Chosen.setAttribute("stroke", "black");
              Chosen.setAttribute("stroke-width", "1");
              finished=false
              first=true
              unselect()
              //place.setAttribute("onkeyup", null);
              selectM.setAttribute("visibility","hidden")
              */
        }
        static onSelectedShapeMouseUp() {
            console.log('onSelectedShapeMouseUp');
            var shapesGroup = document.getElementById('shapesGroup');
            app.controller.selectedShape.setAttribute('stroke-width', 2);
            app.controller.selectedShape.setAttribute('stroke', 'red');
            shapesGroup.setAttribute('onkeyup', 'app.controller.onShapeGroupKeyUp(evt);');
            shapesGroup.setAttribute('onmousemove', null);
            shapesGroup.setAttribute('onmouseup', null);
            /**
             * unselect()
             Chosen.setAttribute("stroke-width", 2);
             Chosen.setAttribute("stroke", "red");
             place.setAttribute("onkeyup", "keyHandle(evt)");
             place.setAttribute("onmousemove", null);
             place.setAttribute("onmousedown", null);
             selectM.setAttribute("visibility","visible")
             ShowPts()
             */
        }
        static onShapeGroupKeyUp(evt) {
            console.log('onShapeGroupKeyUp');
        }
        static onToolButtonMouseOver(btn) {
            btn.setAttribute('fill', '#ffff88');
        }
        static onToolButtonMouseOut(btn) {
            btn.setAttribute('fill', '#88ffff');
        }
        static onToolButtonMouseDown() {
            return AppController.showToolMenu();
        }
        static onToolStatusMouseOver() {
            document.getElementById('toolButton').setAttribute('fill', '#ffff88');
        }
        static onToolStatusMouseOut() {
            document.getElementById('toolButton').setAttribute('fill', '#88ffff');
        }
        static onToolStatusMouseDown() {
            return AppController.showToolMenu();
        }
        static showToolMenu() {
            var toolMenu = document.getElementById("toolMenu");
            toolMenu.setAttribute('visibility', 'visible');
            document.getElementById('toolButton').setAttribute('fill', '#88ffff');
        }
        static hide(obj) {
            obj.setAttribute('visibility', 'hidden');
        }
        static onToolMenuMouseOut() {
            return AppController.hide(document.getElementById('toolMenu'));
        }
        static onToolMenuItemSelect(shape) {
            var toolStatus = document.getElementById("toolStatus");
            for (var i in app.controller.toolMenuItems) {
                var toolMenuItem = app.controller.toolMenuItems[i];
                if (shape == toolMenuItem) {
                    toolStatus.firstChild.remove();
                    toolStatus.appendChild(document.createTextNode(toolMenuItem));
                    app.controller.chosenToolMenuItem = toolMenuItem;
                }
            }
            return AppController.hide(document.getElementById('toolMenu'));
        }
        static onToolMenuItemMouseOver(itemId) {
            document.getElementById(itemId).setAttribute('fill', 'red');
        }
        static onToolMenuItemMouseOut(itemId) {
            document.getElementById(itemId).setAttribute('fill', 'black');
        }
    }


    class Star extends Path {
        /**
         * Class constructor.
         *
         * @param config
         */
        constructor(config) {
            if (config && !config.hasOwnProperty('id')) {
                config.id = 'star1';
            }
            super(config);
            this._permutations = 0;
            this._vertices = 0;
            this._angle = 0.0;
            this._randomizeShape = config && config.hasOwnProperty('randomizeShape') ? config.randomizeShape : false;
            this._randomizeColor = config && config.hasOwnProperty('randomizeColor') ? config.randomizeColor : false;
            this._clientX = config && config.hasOwnProperty('clientX') ? config.clientX : 156;
            this._clientY = config && config.hasOwnProperty('clientY') ? config.clientY : 116;
            this._fill = config && config.hasOwnProperty('fill') ? config.fill : '#56e9d4';
            this._radius = config && config.hasOwnProperty('radius') ? config.radius : 100;
            this._data = "";
            this.postInit();
        }
        get randomizeShape() {
            return this._randomizeShape;
        }
        get randomizeColor() {
            return this._randomizeColor;
        }
        get clientX() {
            return this._clientX;
        }
        get clientY() {
            return this._clientY;
        }
        get permutations() {
            return this._permutations;
        }
        get radius() {
            return this._radius;
        }
        get vertices() {
            return this._vertices;
        }
        get angle() {
            return this._angle;
        }
        get data() {
            return this._data;
        }
        get fill() {
            return this._fill;
        }
        initPath() {
                var x = this.clientX,
                    y = this.clientY,
                    data = "M ",
                    xCoordinates,
                    yCoordinates,
                    i = 0;
                if (this._permutations !== 1) {
                    if (this.randomizeShape) {
                        this._vertices = Math.floor(Math.random() * 12) + 5;
                        this._permutations = Math.floor(Math.random() * (this.vertices - 4)) + 3;
                    } else {
                        this._vertices = Math.floor(2 * 12) + 5;
                        this._permutations = Math.floor(2 * (this.vertices - 4)) + 3;
                    }
                    if (Math.floor(this.vertices / this.permutations) * this.permutations == this.vertices) {
                        this._vertices++;
                    }
                } else {
                    if (this.randomizeShape) {
                        this._vertices = Math.floor(Math.random() * 8) + 3;
                    } else {
                        this._vertices = 12;
                    }
                }
                this._angle = 2 * Math.PI / this.vertices;
                xCoordinates = new Array(this.vertices);
                yCoordinates = new Array(this.vertices);
                for (; i < this.vertices; i++) {
                    xCoordinates[i] = x + Math.ceil(this.radius * Math.cos(i * this.angle));
                    yCoordinates[i] = y + Math.ceil(this.radius * Math.sin(i * this.angle));
                }
                for (i = 0; i < this.vertices; i++) {
                    data += xCoordinates[(i * this.permutations) % this.vertices] + " " + yCoordinates[(i * this.permutations) % this.vertices] + " ";
                }
                this._data += data + "z";
            }
            /**
             * Method called by the constructor to complete the initialization of the
             * docElement after the base class constructor is called.
             */
        postInit() {
            this.initPath();
            this.docElementNS.setAttribute("d", this.data);
            if (this.randomizeColor) {
                this.docElementNS.setAttribute("fill", Util.color());
            } else {
                this.docElementNS.setAttribute("fill", this.fill);
            }
        }
    }


    /**
     * Wrapper for the following svg block:
     *
     *  <g xmlns="http://www.w3.org/2000/svg" id="menubar">
     *      <rect x="0" y="0" width="100%" height="22" fill="#ddd" stroke="black" stroke-width="1"/>
     *      <text x="350" y="15">Click below to draw</text>
     *      <g id="toolGroup" transform="translate(85,0)">
     *      ...
     *      </g>
     * </g>
     *
     */
    class Menubar extends Group {
        /**
         * Static config method. Object returned defines the default properties of the class. This
         * also defines the properties that may be passed to the class constructor.
         *
         * @returns {{hook: HTMLElement, autoBind: boolean}}
         */
        config() {
                return {
                    hook: window.document.body,
                    autoBind: false
                }
            }
            /**
             * Class constructor. Used to invoke the base class
             * with configuration settings.
             */
        constructor(config) {
            super({
                id: 'menubar',
                stroke: 'black',
                strokeWidth: 1,
                xmlns: Util.xmlNamespaces().xmlns,
                hook: config && config.hasOwnProperty('hook') ? config.hook : null,
                autoBind: config && config.hasOwnProperty('autoBind') ? config.autoBind : false,
                onMouseDown: null,
                onKeyUp: null,
                children: [
                    new Rectangle({
                        x: 0,
                        y: 0,
                        width: '100%',
                        height: 22,
                        fill: '#F5F5F5',
                        stroke: 'black',
                        strokeWidth: '1'
                    }),
                    new Text({
                        x: 350,
                        y: 15,
                        onMouseDown: null,
                        onMouseOver: null,
                        onClick: null,
                        onMouseOut: null,
                        text: 'Click below to draw'
                    }),
                    new ToolGroup()
                ],
                transform: null
            });
        }
    }


    /**
     * Wrapper class based on the following block of SVG:
     *
     * <text
     *      xmlns="http://www.w3.org/2000/svg"
     *      id="toolstatus"
     *      x="45"
     *      y="15"
     *      onmouseover="document.getElementById('toolButton').setAttribute('fill','#ffff88')"
     *      onmouseout="document.getElementById('toolButton').setAttribute('fill','#88ffff')"
     *      onmousedown="ToolsView()">Rectangle
     *</text>
     *
     */
    class ToolStatus extends Text {
        /**
         * Class constructor.
         */
        constructor() {
            super({
                id: 'toolStatus',
                x: 45,
                y: 15,
                xmlns: Util.xmlNamespaces().xmlns,
                hook: null,
                autoBind: false,
                cursor: 'pointer',
                text: 'Rectangle',
                onMouseOver: 'app.controller.onToolStatusMouseOver();',
                onMouseOut: 'app.controller.onToolStatusMouseOut();',
                onMouseDown: 'app.controller.onToolStatusMouseDown();'
            });
        }
    }


    /**
     * Wrapper class based on the following block of SVG:
     *
     * <rect xmlns="http://www.w3.org/2000/svg"
     *       id="toolButton"
     *       x="40" y="0"
     *       width="65"
     *       height="20"
     *       onmousedown="app.controller.onToolButtonMouseDown()"
     *       onmouseover="app.controller.onToolButtonMouseOver(this)"
     *       onmouseout="app.controller.onToolButtonMouseOut(this)"
     *       fill="#88ffff"
     *       stroke="black"
     *       stroke-width="2"/>
     *
     */
    class ToolButton extends Rectangle {
        constructor() {
            super({
                id: 'toolButton',
                stroke: 'black',
                strokeWidth: 1,
                fill: '#88ffff',
                height: 22,
                width: 94,
                x: 40,
                y: 0,
                cursor: 'pointer',
                xmlns: Util.xmlNamespaces().xmlns,
                hook: null,
                autoBind: false,
                onMouseOver: 'app.controller.onToolButtonMouseOver(this);',
                onMouseOut: 'app.controller.onToolButtonMouseOut(this);',
                onMouseDown: 'app.controller.onToolButtonMouseDown();'
            });
        }
    }


    /**
     * Wrapper class based on the following block of SVG:
     *
     *      <rect
     *      xmlns="http://www.w3.org/2000/svg"
     *      id="toolMenuInnerRect"
     *      x="4"
     *      y="0"
     *      width="86"
     *      height="160"
     *      fill="#eee"/>
     *
     *
     */
    class ToolMenuInnerBorder extends Rectangle {
        constructor() {
            super({
                xmlns: Util.xmlNamespaces().xmlns,
                id: 'toolMenuInnerBorder',
                stroke: null,
                strokeWidth: null,
                x: 4,
                y: 0,
                width: 86,
                height: 160,
                fill: '#88ffff'
            });
        }
    }


    /**
     * Wrapper class based on the following block of SVG:
     *
     *     <rect
     *     xmlns="http://www.w3.org/2000/svg"
     *     id="toolMenuOuterBorder"
     *     x="0"
     *     y="0"
     *     width="94"
     *     height="164"
     *     stroke="black"
     *     stroke-width="1"
     *     fill="#ddd"
     *     onmouseout="app.controller.onToolMenuMouseOut()"/>
     *
     *
     */
    class ToolMenuOuterBorder extends Rectangle {
        constructor() {
            super({
                xmlns: Util.xmlNamespaces().xmlns,
                id: 'toolMenuOuterBorder',
                x: 0,
                y: 0,
                width: 94,
                height: 164,
                stroke: 'black',
                strokeWidth: 1,
                fill: '#88ffff',
                onMouseOut: 'app.controller.onToolMenuMouseOut()'
            });
        }
    }


    /**
     * Wrapper class based on the following block of SVG:
     *
     *      <text
     *      xmlns="http://www.w3.org/2000/svg"
     *      id="toolMenuItemRectangle"
     *      y="18" x="5"
     *      onmousedown="app.controller.onToolMenuItemSelect('Rectangle')"
     *      onmouseover="app.controller.onToolMenuItemMouseOver('toolMenuItemRectangle')"
     *      onmouseout="app.controller.onToolMenuItemMouseOut('toolMenuItemRectangle')">
     *      Rectangle</text>
     *
     */
    class ToolMenuItem extends Text {
        /**
         * Class constructor.
         *
         * @param descriptor string
         * @param x integer
         * @param y integer
         */
        constructor(descriptor, xCoordinate, yCoordinate) {
            super({
                xmlns: Util.xmlNamespaces().xmlns,
                id: 'toolMenuItem' + descriptor,
                x: xCoordinate,
                y: yCoordinate,
                text: descriptor,
                cursor: 'pointer',
                onClick: null,
                onMouseDown: "app.controller.onToolMenuItemSelect('" + descriptor + "');",
                onMouseOver: "app.controller.onToolMenuItemMouseOver('" + 'toolMenuItem' + descriptor + "');",
                onMouseOut: "app.controller.onToolMenuItemMouseOut('" + 'toolMenuItem' + descriptor + "');"
            });
        }
    }


    /**
     * Wrapper class based on the following block of SVG:
     *
     *  <g xmlns="http://www.w3.org/2000/svg" id="toolMenu" visibility="hidden">
     *      <rect ... ToolMenuOuterBorder() ... />
     *      <rect ... ToolMenuInnerBorder() ... />
     *      <text ... ToolMenuItem('Rectangle', 5, 18) ... />
     *      <text ... ToolMenuItem('Ellipse', 5, 36) ... />
     *      <text ... ToolMenuItem('Star', 5, 54) ... />
     *  </g>
     *
     */
    class ToolMenu extends Group {
        constructor() {
            super({
                xmlns: Util.xmlNamespaces().xmlns,
                id: 'toolMenu',
                visibility: 'hidden',
                fill: '#88ffff',
                children: [
                    new ToolMenuOuterBorder(),
                    new ToolMenuInnerBorder(),
                    new ToolMenuItem('Rectangle', 5, 18),
                    new ToolMenuItem('Ellipse', 5, 36),
                    new ToolMenuItem('Star', 5, 54)
                ],
                transform: 'translate(40,22)'
            });
        }
    }


    /**
     * Wrapper class based on the following block of SVG:
     *
     * <g xmlns="http://www.w3.org/2000/svg" id="toolGroup" transform="translate(85,0)">
     *     <rect ... ToolButton() ... />
     *     <text x="8" y="15">Tool</text>
     *     <text ... ToolStatus() ... />
     *     <g ... ToolMenu() ... />
     * </g>
     *
     */
    class ToolGroup extends Group {
        /**
         * Class constructor. Used to invoke the base class
         * with configuration settings.
         */
        constructor() {
            super({
                id: 'toolGroup',
                stroke: null,
                strokeWidth: null,
                opacity: null,
                xmlns: Util.xmlNamespaces().xmlns,
                hook: null,
                autoBind: false,
                transform: 'translate(10,0)',
                children: [
                    new ToolButton(),
                    new Text({
                        id: null,
                        text: 'Tool:',
                        x: 0,
                        y: 15
                    }),
                    new ToolStatus(),
                    new ToolMenu()
                ]
            });
        }
    }


    /**
     * AppController static method page hook.
     *
     * @type {{selectedShape: null, onSurfaceLoad: Function, onPathMouseDown: Function, onPathMouseOut: Function, onPathMouseOver: Function, onGroupMouseDown: Function, onSelectedShapeMouseUp: Function, onSelectedShapeMouseDown: Function, onSelectedShapeDrop: Function, selectShape: Function, onDOMContentLoaded: Function}|*}
     */
    app.controller = app.controller || {
        selectedShape: null,
        toolMenuItems: new Array("Rectangle", "Ellipse", "Star"),
        chosenToolMenuItem: "Rectangle",
        emptyFn: function() {
            return AppController.onEmptyFn();
        },
        onSurfaceLoad: function(evt) {
            return AppController.onSurfaceLoad(evt);
        },
        onPathMouseDown: function(path, evt) {
            return AppController.onPathMouseDown(path, evt);
        },
        onPathMouseOut: function(path, evt) {
            return AppController.onPathMouseOut(path, evt);
        },
        onPathMouseOver: function(path, evt) {
            return AppController.onPathMouseOver(path, evt);
        },
        onShapeGroupMouseDown: function(evt) {
            return AppController.onShapeGroupMouseDown(evt);
        },
        onShapeGroupKeyUp: function(evt) {
            return AppController.onShapeGroupKeyUp(evt);
        },
        onSelectedShapeMouseUp: function() {
            return AppController.onSelectedShapeMouseUp();
        },
        onSelectedShapeMouseDown: function(evt) {
            return AppController.onSelectedShapeMouseDown(evt);
        },
        onSelectedShapeDrop: function() {
            return AppController.onSelectedShapeDrop();
        },
        onSelectedShapeDrag: function(evt, x, y) {
            return AppController.onSelectedShapeDrag(evt, x, y);
        },
        selectShape: function(evt, id) {
            return AppController.selectShape(evt, id);
        },
        onToolButtonMouseOver: function(btn) {
            return AppController.onToolButtonMouseOver(btn);
        },
        onToolButtonMouseOut: function(btn) {
            return AppController.onToolButtonMouseOut(btn);
        },
        onToolButtonMouseDown: function() {
            return AppController.onToolButtonMouseDown();
        },
        onToolStatusMouseOver: function() {
            return AppController.onToolStatusMouseOver();
        },
        onToolStatusMouseOut: function() {
            return AppController.onToolStatusMouseOut();
        },
        onToolStatusMouseDown: function() {
            return AppController.onToolStatusMouseDown();
        },
        onToolMenuMouseOut: function() {
            return AppController.onToolMenuMouseOut();
        },
        onToolMenuItemSelect: function(shape) {
            return AppController.onToolMenuItemSelect(shape);
        },
        onToolMenuItemMouseOver: function(itemId) {
            return AppController.onToolMenuItemMouseOver(itemId);
        },
        onToolMenuItemMouseOut: function(itemId) {
            return AppController.onToolMenuItemMouseOut(itemId);
        },
        onDOMContentLoaded: function() {
            var fiddleHook = document.getElementById('fiddleHook');
            app.surface = app.surface || new Surface({
                hook: fiddleHook,
                autoBind: true,
                autoPopulate: true
            });
        }
    };
    /**
     * "Debug" Jasmine testing hooks.
     *
     * @type {*|{group: Function, surface: Function, basePath: Function, star: Function, xmlNamespaces: Function, splitAttribute: Function, mapFromQueryString: Function, color: Function}}
     */
    app.test = window.location.pathname.match('test') ? app.test || {
        group: function(config) {
            return new Group(config);
        },
        surface: function(config) {
            return new Surface(config);
        },
        basePath: function(config) {
            return new BasePath(config);
        },
        star: function(config) {
            return new Star(config);
        },
        xmlNamespaces: function() {
            return Util.xmlNamespaces();
        },
        splitAttribute: function(field, id, defVal) {
            return Util.splitAttribute(field, id, defVal);
        },
        mapFromQueryString: function(url, parameter) {
            return Util.mapFromQueryString(url, parameter);
        },
        color: function() {
            return Util.color();
        },
        rectangle: function(config) {
            return new Rectangle(config);
        },
        text: function(config) {
            return new Text(config);
        },
        menubar: function(config) {
            return new Menubar(config);
        },
        toolStatus: function() {
            return new ToolStatus();
        },
        toolButton: function() {
            return new ToolButton();
        },
        toolMenuInnerBorder: function() {
            return new ToolMenuInnerBorder();
        },
        toolMenuOuterBorder: function() {
            return new ToolMenuOuterBorder();
        },
        toolMenuItem: function(text, x, y) {
            return new ToolMenuItem(text, x, y);
        },
        toolMenu: function() {
            return new ToolMenu();
        },
        toolGroup: function() {
            return new ToolGroup();
        }
    } : null;
    if (!window.location.pathname.match('test')) {
        document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
    }
})(window.app = window.app || {})
