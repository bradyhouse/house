'use strict';
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

module.exports = AnimateTransform;
