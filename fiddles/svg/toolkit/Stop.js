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
