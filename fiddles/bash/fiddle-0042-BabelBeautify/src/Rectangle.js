
class Rectangle {
    config() {
        return {
            id: 'rect1',
            stroke: 'black',
            strokeWidth: '1',
            fill: '#000000',
            height: 50,
            width: 50,
            x: 0,
            y: 0,
            cursor: null,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            onMouseOver: null,
            onMouseOut: null,
            onMouseDown: null
        };
    }

    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._x = config && config.hasOwnProperty('x') ? config.x : this.config().x;
        this._y = config && config.hasOwnProperty('y') ? config.y : this.config().y;
        this._width = config && config.hasOwnProperty('width') ? config.width : this.config().width;
        this._height = config && config.hasOwnProperty('height') ? config.height : this.config().height;
        this._fill = config && config.hasOwnProperty('fill') ? config.fill : this.config().fill;
        this._stroke = config && config.hasOwnProperty('stroke') ? config.stroke : this.config().stroke;
        this._strokeWidth = config && config.hasOwnProperty('strokeWidth') ? config.strokeWidth : this.config().strokeWidth;
        this._onMouseDown = config && config.hasOwnProperty('onMouseDown') ? config.onMouseDown : this.config().onMouseDown;
        this._onMouseOut = config && config.hasOwnProperty('onMouseOut') ? config.onMouseOut : this.config().onMouseOut;
        this._onMouseOver = config && config.hasOwnProperty('onMouseOver') ? config.onMouseOver : this.config().onMouseOver;
        this._cursor = config && config.hasOwnProperty('cursor') ? config.cursor : this.config().cursor;
        this.init();
    }

    get docElementNS() {
        return this._docElementNS;
    }

    get id() {
        return this._id;
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

    bind() {
        this.hook.appendChild(this.docElementNS);
    }

    init() {
        var docElement = document.createElementNS(this.xmlns, 'rect');

        docElement.setAttribute('id', this.id);
        docElement.setAttribute('x', this.x);
        docElement.setAttribute('y', this.y);
        docElement.setAttribute('width', this.width);
        docElement.setAttribute('height', this.height);
        docElement.setAttribute('fill', this.fill);

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
            docElement.setAttribute('onmousedown', this);
        }

        if (this.cursor) {
            docElement.setAttribute('style', 'cursor: ' + this.cursor + ';');
        }

        this._docElementNS = docElement;

        if (this.autoBind) {
            this.bind();
        }
    }

}

