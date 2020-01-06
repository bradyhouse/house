'use strict';

const Util = require('./../statics').default;

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

module.exports = LinearGradient;
