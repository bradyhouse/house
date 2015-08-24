"use strict";

class Surface {
    constructor(config) {
        this._width = config && config.hasOwnProperty('width') ? config.width : this.config().width;
        this._height = config && config.hasOwnProperty('height') ? config.height : this.config().height;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._xlink = config && config.hasOwnProperty('xlink') ? config.xlink : this.config().xlink;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get xmlns() {
        return this._xmlns;
    }
    get xlink() {
        return this._xlink;
    }
    get docElement() {
        return this._docElement;
    }
    get hook() {
        return this._hook;
    }
    get autoBind() {
        return this._autoBind;
    }

    bind() {
        this.hook.appendChild(this.docElement);
    }
    config() {
        return {
            width: '500px',
            height: '500px',
            xmlns: 'http://www.w3.org/2000/svg',
            xlink: 'http://www.w3.org/1999/xlink',
            preserveAspectRatio: 'none',
            hook: window.document.body,
            autoBind: true
        }
    }
    init() {
        var svg = document.createElement('svg');
        svg.setAttribute('width', this.width);
        svg.setAttribute('height', this.height);
        svg.setAttribute('xmlns', this.xmlns);
        svg.setAttribute('xmlns:xlink', this.xlink);
        this._docElement = svg;
        if(this.autoBind) {
            this.bind();
        }

    }
}
