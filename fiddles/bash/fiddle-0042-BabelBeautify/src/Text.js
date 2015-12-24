
class Text {
    config() {
        return {
            id: 'text1',
            x: 0,
            y: 0,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            cursor: null,
            text: '&nbsp;',
            onMouseOver: 'app.controller.emptyFn();',
            onMouseOut: 'app.controller.emptyFn();',
            onMouseDown: 'app.controller.emptyFn();',
            onClick: 'app.controller.emptyFn();'
        };
    }

    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._onMouseDown = config && config.hasOwnProperty('onMouseDown') ? config.onMouseDown : this.config().onMouseDown;
        this._onMouseOut = config && config.hasOwnProperty('onMouseOut') ? config.onMouseOut : this.config().onMouseOut;
        this._onMouseOver = config && config.hasOwnProperty('onMouseOver') ? config.onMouseOver : this.config().onMouseOver;
        this._onClick = config && config.hasOwnProperty('onClick') ? config.onClick : this.config().onClick;
        this._x = config && config.hasOwnProperty('x') ? config.x : this.config().x;
        this._y = config && config.hasOwnProperty('y') ? config.y : this.config().y;
        this._text = config && config.hasOwnProperty('text') ? config.text : this.config().text;
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

    get onClick() {
        return this._onClick;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get text() {
        return this._text;
    }

    get cursor() {
        return this._cursor;
    }

    init() {
        var docElement = document.createElementNS(this.xmlns, 'text'),
            textNode = document.createTextNode(this.text);

        if (this.id) {
            docElement.setAttribute('id', this.id);
        }

        if (this.onMouseOut) {
            docElement.setAttribute('onmouseout', this.onMouseOut);
        }

        if (this.onMouseDown) {
            docElement.setAttribute('onmousedown', this.onMouseDown);
        }

        if (this.onMouseOver) {
            docElement.setAttribute('onmouseover', this.onMouseOver);
        }

        if (this.onClick) {
            docElement.setAttribute('onclick', this.onClick);
        }

        if (this.cursor) {
            docElement.setAttribute('style', 'cursor: ' + this.cursor + ';');
        }

        docElement.setAttribute('x', this.x);
        docElement.setAttribute('y', this.y);

        docElement.appendChild(textNode);

        this._docElementNS = docElement;

        if (this.autoBind) {
            this.bind();
        }
    }

    bind() {
        if (this.hook) {
            this.hook.appendChild(this.docElementNS);
        }
    }

}

