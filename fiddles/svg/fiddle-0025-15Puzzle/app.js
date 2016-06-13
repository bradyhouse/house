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
     * an Scalar Vector Graphic (SVG) setter,
     * "<set>", tag.  This tag
     * is used as a child element to create a property transition effect
     * for the parent element.  For example, given a rectangle, "<rect>" tag, element,
     * the following setter, "<set>" tag, child elements could be used
     * to create a rollover type effect --
     *
     * <set attributeName="x" from="40" to="42" begin="mousedown" end="mouseup"></set>
     * <set attributeName="y" from="0" to="2" begin="mousedown" end="mouseup"></set>
     *
     */
    class Setter {
        config() {
            return {
                id: 'setter1',
                hook: null,
                autoBind: false,
                attributeName: "y",
                from: "0",
                to: "2",
                begin: "mousedown",
                end: "mouseup",
                xmlns: Util.xmlNamespaces().xmlns
            };
        }
        constructor(config) {
            this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
            this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
            this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
            this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
            this._attributeName = config && config.hasOwnProperty('attributeName') ? config.attributeName : this.config().attributeName;
            this._from = config && config.hasOwnProperty('from') ? config.from : this.config().from;
            this._to = config && config.hasOwnProperty('to') ? config.to : this.config().to;
            this._begin = config && config.hasOwnProperty('begin') ? config.begin : this.config().begin;
            this._end = config && config.hasOwnProperty('end') ? config.end : this.config().end;
            this.init();
        }
        get hook() {
            return this._hook;
        }
        get autoBind() {
            return this._autoBind;
        }
        get id() {
            return this._id;
        }
        get docElementNS() {
            return this._docElementNS;
        }
        get xmlns() {
            return this._xmlns;
        }
        get attributeName() {
            return this._attributeName;
        }
        get from() {
            return this._from;
        }
        get to() {
            return this._to;
        }
        get begin() {
            return this._begin;
        }
        get end() {
                return this._end;
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
            var docElement = document.createElementNS(this.xmlns, 'set');
            if (this.id) {
                docElement.setAttribute('id', this.id);
            }
            docElement.setAttribute('attributeName', this.attributeName);
            docElement.setAttribute('from', this.from);
            docElement.setAttribute('to', this.to);
            docElement.setAttribute('begin', this.begin);
            docElement.setAttribute('end', this.end);
            this._docElementNS = docElement;
            if (this.autoBind) {
                this.bind();
            }
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


    app.view.button.mixin.Rectangle = class {
        constructor() {
            this.prototype = new Object();
            this.prototype.onButtonRectangleClick = this.onButtonRectangleClick;
            this.prototype.afterInit = this.afterInit;
        }
        afterInit(view, controller) {
            if (view && view.docElementNS) {
                var buttonId = view.docElementNS.getAttribute('id'),
                    rectId = buttonId + '-rectangle',
                    rect = view.docElementNS.querySelector("rect[id=" + rectId + "]");
                if (rect) {
                    rect.addEventListener('click', this.onButtonRectangleClick);
                    // Must use globals for mousedown and mouseout-- ie addEventListener doesn't seem to work
                    rect.setAttribute('onmousedown', 'window.app.view.button.mixin.Rectangle.onButtonRectangleMouseDown("' + buttonId + '");');
                    rect.setAttribute('onmouseout', 'window.app.view.button.mixin.Rectangle.onButtonRectangleMouseOut("' + buttonId + '");');
                }
            }
        }
        onButtonRectangleClick() {
            var rectId = this.getAttribute('id'),
                buttonId = rectId.split('-')[0];
            alert('You clicked button id "' + buttonId + '"');
        }
        static onButtonRectangleMouseOut(buttonId) {
            var rectangleId = buttonId + '-rectangle',
                backRectangleId = buttonId + '-backrectangle',
                pathId = buttonId + '-text',
                backRectangle = document.getElementById(backRectangleId),
                backRectangleX = backRectangle ? backRectangle.getAttribute('x') : 0,
                backRectangleY = backRectangle ? backRectangle.getAttribute('y') : 0,
                rectangle = document.getElementById(rectangleId),
                rectangleX = rectangle ? rectangle.getAttribute('x') : 0,
                rectangleY = rectangle ? rectangle.getAttribute('y') : 0,
                path = document.getElementById(pathId),
                pathX = path ? path.getAttribute('x') : 0,
                pathY = path ? path.getAttribute('y') : 0;
            if (backRectangle && backRectangleX == rectangleX && backRectangleY == rectangleY) {
                backRectangleX = parseInt(rectangleX) + 2;
                backRectangleY = parseInt(rectangleY) + 3;
                backRectangle.setAttribute('x', backRectangleX);
                backRectangle.setAttribute('y', backRectangleY);
                if (path) {
                    pathX = parseInt(pathX) - 2;
                    pathY = parseInt(pathY) - 3;
                    path.setAttribute('x', pathX);
                    path.setAttribute('y', pathY);
                }
            }
        }
        static onButtonRectangleMouseDown(buttonId) {
            var rectangleId = buttonId + '-rectangle',
                backRectangleId = buttonId + '-backrectangle',
                pathId = buttonId + '-text',
                backRectangle = document.getElementById(backRectangleId),
                backRectangleX = backRectangle ? backRectangle.getAttribute('x') : 0,
                backRectangleY = backRectangle ? backRectangle.getAttribute('y') : 0,
                rectangle = document.getElementById(rectangleId),
                rectangleX = rectangle ? rectangle.getAttribute('x') : 0,
                rectangleY = rectangle ? rectangle.getAttribute('y') : 0,
                path = document.getElementById(pathId),
                pathX = path ? path.getAttribute('x') : 0,
                pathY = path ? path.getAttribute('y') : 0;
            if (backRectangle) {
                backRectangle.setAttribute('x', rectangleX);
                backRectangle.setAttribute('y', rectangleY);
                if (path) {
                    pathX = parseInt(pathX) + 2;
                    pathY = parseInt(pathY) + 3;
                    path.setAttribute('x', pathX);
                    path.setAttribute('y', pathY);
                }
            }
        }
    }


    app.view.button.mixin.Text = class {
        constructor() {
            this.prototype = new Object();
            this.prototype.onButtonTextClick = this.onButtonTextClick;
            this.prototype.afterInit = this.afterInit;
        }
        afterInit(view, controller) {
            if (view && view.docElementNS) {
                var buttonId = view.docElementNS.getAttribute('id'),
                    text = view.docElementNS.querySelector('text');
                if (text) {
                    text.addEventListener('click', controller.onButtonRectangleClick);
                    // Must use globals for mousedown and mouseout-- ie addEventListener doesn't seem to work
                    text.setAttribute('onmousedown', 'window.app.view.button.mixin.Rectangle.onButtonRectangleMouseDown("' + buttonId + '");');
                    text.setAttribute('onmouseout', 'window.app.view.button.mixin.Rectangle.onButtonRectangleMouseOut("' + buttonId + '");');
                }
            }
        }
    }


    app.view.button.ButtonController = class extends ViewController {
        constructor(config) {
            super({
                id: 'button',
                mixins: [
                    'app.view.button.mixin.Rectangle',
                    'app.view.button.mixin.Text'
                ],
                view: config && config.hasOwnProperty('view') ? config.view : null
            });
        }
    }


    app.view.button.Button = class extends Group {
        constructor(config) {
            var _id = config && config.hasOwnProperty('id') ? config.id : 'button1',
                _pathId = _id + '-path',
                _backRectId = _id + '-backrectangle',
                _rectId = _id + '-rectangle',
                _textId = _id + '-text',
                _setterId = _id + '-setter',
                _textPathId = _id + '-textpath',
                _text = config && config.hasOwnProperty('text') ? config.text : null,
                _width = config && config.hasOwnProperty('width') ? config.width : 94,
                _height = config && config.hasOwnProperty('height') ? config.height : 24,
                _left = config && config.hasOwnProperty('left') ? config.left : 0,
                _top = config && config.hasOwnProperty('top') ? config.top : 0,
                _color = config && config.hasOwnProperty('color') ? config.color : '#0CE3A7',
                _cornerRadius = config && config.hasOwnProperty('cornerRadius') ? config.cornerRadius : 15,
                _recX = _left,
                _recY = _top,
                _textWidth = _text ? _text.length * 6 : 0,
                _pntAx = _recX + Math.floor(_width / 2) - Math.floor(_textWidth / 2),
                _pntAy = _recY + Math.floor(_height / 2) + 3,
                _pntBx = _recX + _width,
                _pntBy = _pntAy,
                _pathData = 'M ' + _pntAx + ',' + _pntAy + ' L ' + _pntBx + ',' + _pntBy;
            super({
                id: _id,
                stroke: null,
                strokeWidth: null,
                opacity: null,
                xmlns: Util.xmlNamespaces().xmlns,
                hook: config && config.hasOwnProperty('hook') ? config.hook : null,
                autoBind: config && config.hasOwnProperty('autobind') ? config.autoBind : false,
                transform: config && config.hasOwnProperty('transform') ? config.transform : null,
                controller: 'app.view.button.ButtonController',
                children: [
                    new Rectangle({
                        id: _backRectId,
                        fill: _color,
                        stroke: _color,
                        strokeWidth: 1,
                        width: _width,
                        height: _height,
                        x: _recX + 2,
                        y: _recY + 3,
                        cornerRadius: _cornerRadius,
                        xmlns: Util.xmlNamespaces().xmlns
                    }),
                    new Rectangle({
                        id: _rectId,
                        fill: _color,
                        stroke: _color,
                        strokeWidth: 0,
                        width: _width,
                        height: _height,
                        x: _recX,
                        y: _recY,
                        cornerRadius: _cornerRadius,
                        cursor: 'pointer',
                        xmlns: Util.xmlNamespaces().xmlns,
                        hook: null,
                        autoBind: false
                    }),
                    new Path({
                        xmlns: Util.xmlNamespaces().xmlns,
                        id: _pathId,
                        data: _pathData,
                        strokeWidth: "0"
                    }),
                    new Text({
                        id: _textId,
                        xmlns: Util.xmlNamespaces().xmlns,
                        hook: null,
                        text: null,
                        autoBind: false,
                        cursor: 'pointer',
                        children: [
                            new TextPath({
                                id: _textPathId,
                                text: _text,
                                link: '#' + _pathId,
                                autoBind: false,
                                hook: null
                            })
                        ]
                    })
                ]
            });
            this.postInit();
        }
        postInit() {
            var backRect = this.docElementNS.firstChild,
                backFill = backRect ? backRect.getAttribute('fill') : null;
            if (backFill) {
                backFill = Util.darkenColor(backFill, -.50);
                backRect.setAttribute('fill', backFill);
                backRect.setAttribute('stroke', backFill);
            }
        }
    }


    class Viewport extends Surface {
        constructor(config) {
            super({
                hook: config && config.hasOwnProperty('hook') ? config.hook : window.document.body,
                height: '300px',
                width: '100%',
                autoBind: true,
                children: [
                    new app.view.button.Button({
                        id: 'button1',
                        text: 'Button 1',
                        color: '#58D3F7',
                        cornerRadius: 10,
                        width: 100,
                        height: 30,
                        left: 25,
                        top: 25
                    }),
                    new app.view.button.Button({
                        id: 'button2',
                        text: 'Button 2',
                        color: '#FA5858',
                        cornerRadius: 20,
                        width: 200,
                        height: 30,
                        left: 150,
                        top: 25
                    }),
                    new app.view.button.Button({
                        id: 'button3',
                        text: 'Button 3',
                        color: '#58FA58',
                        cornerRadius: 8,
                        width: 100,
                        height: 30,
                        left: 375,
                        top: 25
                    }),
                    new app.view.button.Button({
                        id: 'button4',
                        text: 'Button 4',
                        color: '#F781F3',
                        cornerRadius: 5,
                        width: 100,
                        height: 50,
                        left: 500,
                        top: 25
                    }),
                    new app.view.button.Button({
                        id: 'button5',
                        text: 'Button 5',
                        color: '#F3F781',
                        cornerRadius: 25,
                        width: 400,
                        height: 50,
                        left: 25,
                        top: 100
                    })
                ]
            });
        }
    }


    app.controller = app.controller || {
        onDOMContentLoaded: function() {
            var fiddleHook = document.getElementById('fiddleHook');
            app.view.Viewport = new Viewport({
                hook: fiddleHook
            });
        }
    };
    /**
     * "Debug" Jasmine testing hooks.
     */
    app.test = window.location.pathname.match('test') ? app.test || {
        group: function(config) {
            return new Group(config);
        },
        surface: function(config) {
            return new Surface(config);
        },
        path: function(config) {
            return new Path(config);
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
        circle: function(config) {
            return new Circle(config);
        }
    } : null;
    if (!window.location.pathname.match('test')) {
        document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
    }
})(window.app = window.app || {})
