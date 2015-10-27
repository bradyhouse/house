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
