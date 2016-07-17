
/**
 * Class used to wrap (or model)
 * an Scalar Vector Graphic (SVG) circle,
 * "<circle>", tag.  For additional info,
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
