

class Surface {
    config() {
        return {
            id: 'surface1',
            cssWidth: '500%',
            cssHeight: '500px',
            xmlns: Util.xmlNamespaces().xmlns,
            xmlnsEv: Util.xmlNamespaces().xmlnsEv,
            xmlnsXlink: Util.xmlNamespaces().xmlnsXLink,
            zoomAndPan: "disabled",
            coorWidth: '100%',
            coorHeight: '500px',
            hook: window.document.body,
            autoBind: false,
            autoPopulate: false,
            onLoad: 'app.controller.onSurfaceLoad(evt);'
        };
    }

    constructor(config) {

        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._cssWidth = config && config.hasOwnProperty('cssWidth') ? config.width : this.config().cssWidth;
        this._cssHeight = config && config.hasOwnProperty('cssHeight') ? config.height : this.config().cssHeight;
        this._xmlns = config && config.hasOwnProperty('xmlns') ? config.xmlns : this.config().xmlns;
        this._xmlnsXlink = config && config.hasOwnProperty('xmlnsXlink') ? config.xmlnsXlink : this.config().xmlnsXlink;
        this._xmlnsEv = config && config.hasOwnProperty('xmlnsEv') ? config.xmlnsEv : this.config().xmlnsEv;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._zoomAndPan = config && config.hasOwnProperty('zoomAndPan') ? config.zoomAndPan : this.config().zoomAndPan;
        this._coorWidth = config && config.hasOwnProperty('coorWidth') ? config.coorWidth : this.config().coorWidth;
        this._coorHeight = config && config.hasOwnProperty('coorHeight') ? config.coorHeight : this.config().coorHeight;
        this._onLoad = config && config.hasOwnProperty('onLoad') ? config.onLoad : this.config().onLoad;
        this._autoPopulate = config && config.hasOwnProperty('autoPopulate') ? config.autoPopulate : this.config().autoPopulate;
        this._shapes = [];
        this.init();
    }

    get coorWidth() {
        return this._coorWidth;
    }

    get coorHeight() {
        return this._coorHeight;
    }

    get cssWidth() {
        return this._cssWidth;
    }

    get cssHeight() {
        return this._cssHeight;
    }

    get xmlns() {
        return this._xmlns;
    }

    get xmlnsXlink() {
        return this._xmlnsXlink;
    }

    get xmlnsEv() {
        return this._xmlnsEv;
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

    get autoPopulate() {
        return this._autoPopulate;
    }

    get zoomAndPan() {
        return this._zoomAndPan;
    }

    get onLoad() {
        return this._onLoad;
    }

    get group() {
        return this._group;
    }

    get menubar() {
        return this._menubar;
    }

    get shapes() {
        return this._shapes;
    }

    bind() {
        this.hook.appendChild(this.docElement);
    }

    initMenubar() {
        this._menubar = new Menubar({
            hook: this.docElement,
            autoBind: this.autoBind
        });
    }

    initGroup() {
        this._group = new Group({
            id: 'shapesGroup',
            hook: this.docElement,
            autoBind: this.autoBind
        });
    }

    initShapes() {
        var star = new Star({ id: 'star-1' });
        this.group.docElementNS.appendChild(star.docElementNS);
        this.shapes.push(star);
    }

    init() {
        var me = this,
            svg = document.createElementNS(this.xmlns, 'svg');

        svg.setAttribute('id', 'surface1');
        svg.setAttribute('width', this.coorWidth);
        svg.setAttribute('height', this.coorHeight);
        svg.setAttribute('xmlns:xlink', this.xmlnsXlink);
        svg.setAttribute('xmlns:ev', this.xmlnsEv);
        svg.setAttribute('zoomAndPan', this.zoomAndPan);

        svg.setAttribute('onload', this.onLoad);

        me._docElement = svg;

        if (me.autoBind) {
            me.initGroup();
            me.initMenubar();
            if (me.autoPopulate) {
                me.initShapes();
            }
            me.bind();
        }
    }

}

