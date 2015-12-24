
class Group {
    config() {
        return {
            id: 'group1',
            stroke: null,
            strokeWidth: null,
            opacity: null,
            xmlns: Util.xmlNamespaces().xmlns,
            hook: null,
            autoBind: false,
            onMouseDown: 'app.controller.onShapeGroupMouseDown(evt);',
            onKeyUp: 'app.controller.onShapeGroupKeyUp(evt);',
            children: [],
            transform: null,
            visibility: null,
            zIndex: null,
            cursor: null
        };
    }

    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._onKeyUp = config && config.hasOwnProperty('onKeyUp') ? config.onKeyUp : this.config().onKeyUp;
        this._onMouseDown = config && config.hasOwnProperty('onMouseDown') ? config.onMouseDown : this.config().onMouseDown;
        this._children = config && config.hasOwnProperty('children') ? config.children : this.config().children;
        this._transform = config && config.hasOwnProperty('transform') ? config.transform : this.config().transform;
        this._visibility = config && config.hasOwnProperty('visibility') ? config.visibility : this.config().visibility;
        this._zIndex = config && config.hasOwnProperty('zIndex') ? config.zIndex : this.config().zIndex;
        this._opacity = config && config.hasOwnProperty('opacity') ? config.opacity : this.config().opacity;
        this._strokeWidth = config && config.hasOwnProperty('strokeWidth') ? config.strokeWidth : this.config().strokeWidth;
        this._stroke = config && config.hasOwnProperty('stroke') ? config.stroke : this.config().stroke;
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

    get onKeyUp() {
        return this._onKeyUp;
    }

    get onMouseDown() {
        return this._onMouseDown;
    }

    get children() {
        return this._children;
    }

    get transform() {
        return this._transform;
    }

    get opacity() {
        return this._opacity;
    }

    get stroke() {
        return this._stroke;
    }

    get strokeWidth() {
        return this._strokeWidth;
    }

    get visibility() {
        return this._visibility;
    }

    get zIndex() {
        return this._zIndex;
    }

    bind() {
        this.hook.appendChild(this.docElementNS);
    }

    init() {
        var i = 0,
            child = null,
            docElement = document.createElementNS(this.xmlns, 'g');

        docElement.setAttribute('id', this.id);

        if (this.onMouseDown) {
            docElement.setAttribute('onmousedown', this.onMouseDown);
        }

        if (this.onKeyUp) {
            docElement.setAttribute('onkeyup', this.onKeyUp);
        }

        if (this.transform) {
            docElement.setAttribute('transform', this.transform);
        }

        if (this.stroke) {
            docElement.setAttribute('stroke', this.stroke);
        }

        if (this.strokeWidth) {
            docElement.setAttribute('stroke-width', this.strokeWidth);
        }

        if (this.visibility) {
            docElement.setAttribute('visibility', this.visibility);
        }

        if (this.opacity) {
            docElement.setAttribute('opacity', this.opacity);
        }

        if (this.zIndex) {
            docElement.setAttribute('z-index', this.zIndex);
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

