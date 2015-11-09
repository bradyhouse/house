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
