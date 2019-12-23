'use strict';
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

module.exports = Definitions;
