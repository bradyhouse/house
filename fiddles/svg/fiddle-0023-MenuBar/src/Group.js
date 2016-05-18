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
        this.init();
    }

    /**
     * Getter for the component controller class.
     * @returns {*}
     */
    get controller () {
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
      * @returns {*}
     */
    get visibility() {
        return this._visibility;
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
