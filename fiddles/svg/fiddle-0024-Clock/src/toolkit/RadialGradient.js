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
