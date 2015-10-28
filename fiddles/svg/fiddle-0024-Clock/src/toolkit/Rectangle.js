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
            cornerRadius: null,
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

        if (this.fill) {
            docElement.setAttribute('fill', this.fill);
        }


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
            docElement.setAttribute('style', 'cursor: ' + this.cursor + ';' );
        }

        if (this.cornerRadius) {
            docElement.setAttribute('rx', this.cornerRadius);
            docElement.setAttribute('ry', this.cornerRadius);
        }

        this._docElementNS = docElement;

        if (this.children.length > 0) {
            for (var i= 0; i < this.children.length; i++) {
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
