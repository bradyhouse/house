

class Path {
    config() {
        return {
            id: 'path1',
            stroke: 'black',
            strokeWidth: 1,
            opacity: .5,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            onMouseDown: 'app.controller.onPathMouseDown(evt, this.id);',
            onMouseOver: 'app.controller.onPathMouseOver(evt, this.id);',
            onMouseOut: 'app.controller.onPathMouseOut(evt, this.id);'

        };
    }

    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._stroke = config && config.hasOwnProperty('stroke') ? config.stroke : this.config().stroke;
        this._strokeWidth = config && config.hasOwnProperty('strokeWidth') ? config.strokeWidth : this.config().strokeWidth;
        this._opacity = config && config.hasOwnProperty('opacity') ? config.opacity : this.config().opacity;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._onMouseOver = config && config.hasOwnProperty('onMouseOver') ? config.onMouseOver : this.config().onMouseOver;
        this._onMouseOut = config && config.hasOwnProperty('onMouseOut') ? config.onMouseOut : this.config().onMouseOut;
        this._onMouseDown = config && config.hasOwnProperty('onMouseDown') ? config.onMouseDown : this.config().onMouseDown;
        this.init();
    }

    get xmlns() {
        return this._xmlns;
    }

    get docElementNS() {
        return this._docElementNS;
    }

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

    get onMouseOver() {
        return this._onMouseOver;
    }

    get onMouseDown() {
        return this._onMouseDown;
    }

    bind() {
        this.hook.appendChild(this.docElement);
    }

    init() {
        var docElement = document.createElementNS(this.xmlns, 'path');
        docElement.setAttribute('id', this.id);
        docElement.setAttribute('stroke', this.stroke);
        docElement.setAttribute('stroke-width', this.strokeWidth);
        docElement.setAttribute('opacity', this.opacity);
        docElement.setAttribute("onmousedown", this.onMouseDown);
        docElement.setAttribute("onmouseover", this.onMouseOver);
        docElement.setAttribute("onmouseout", this.onMouseOut);
        this._docElementNS = docElement;
        if (this.autoBind) {
            this.bind();
        }
    }
}

