(function(app) {
    "use strict";


    app.view = app.view || {};
    app.view.button = app.view.button || {};
    app.view.button.mixin = app.view.button.mixin || {};


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
                    cssClass: 'rectangle',
                    stroke: 'black',
                    strokeWidth: '1',
                    fill: '#000000',
                    opacity: null,
                    height: 50,
                    width: 50,
                    x: null,
                    y: null,
                    cornerRadius: 15,
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
            docElement.setAttribute('class', this.cssClass);
            if (this.x) {
                docElement.setAttribute('x', this.x);
            }
            if (this.y) {
                docElement.setAttribute('y', this.y);
            }
            docElement.setAttribute('width', this.width);
            docElement.setAttribute('height', this.height);
            docElement.setAttribute('fill', this.fill);
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
                    children: [],
                    transform: null,
                    visibility: null,
                    zIndex: null,
                    cursor: null
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
                this._children = config && config.hasOwnProperty('children') ? config.children : this.config().children;
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
            docElement.setAttribute('x', this.x);
            docElement.setAttribute('y', this.y);
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
     * screen.
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
                    text: '&nbsp;',
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
            docElement.setAttribute('style', style);
            docElement.setAttribute('x', this.x);
            docElement.setAttribute('y', this.y);
            docElement.setAttribute('font-family', "arial");
            docElement.setAttribute('font-size', '12');
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
                    stroke: 'black',
                    strokeWidth: 1,
                    opacity: .5,
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
        init() {
            var docElement = document.createElementNS(this.xmlns, 'path');
            docElement.setAttribute('id', this.id);
            docElement.setAttribute('stroke', this.stroke);
            docElement.setAttribute('stroke-width', this.strokeWidth);
            docElement.setAttribute('opacity', this.opacity);
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
                    width: '100%',
                    height: '500px',
                    hook: window.document.body,
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
            svg.setAttribute('id', 'surface1');
            svg.setAttribute('width', this.coorWidth);
            svg.setAttribute('height', this.coorHeight);
            svg.setAttribute('zoomAndPan', this.zoomAndPan);
            if (this.onload) {
                svg.setAttribute('onload', this.onLoad);
            }
            me._docElementNS = svg;
            if (this.children.length > 0) {
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
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
                    'app.view.button.mixin.Text',
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
        }
    } : null;
    if (!window.location.pathname.match('test')) {
        document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
    }
})(window.app = window.app || {})
