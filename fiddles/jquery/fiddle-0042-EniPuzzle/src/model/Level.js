class Level {

    config() {
        return {
            id: 'level1',
            value: null,
            cols: 3,
            rows: 3,
            selected: false,
            hook: window.document.body,
            autoBind: false,
            text: 1,
            store: null,
            listeners: {
                click: null
            }
        }
    }

    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._value = config && config.hasOwnProperty('value') ? config.value : this.config().value;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._store = config && config.hasOwnProperty('store') ? config.store : this.config().store;
        this._cols = config && config.hasOwnProperty('cols') ? config.cols : this.config().cols;
        this._rows = config && config.hasOwnProperty('rows') ? config.rows : this.config().rows;
        this._text = config && config.hasOwnProperty('text') ? config.text : this.config().text;
        this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
        this._selected = config && config.hasOwnProperty('selected') ? config.selected: this.config().selected;
        this.init();
    }

    get docElement() {
        return this._docElement;
    }

    get id() {
        return this._id;
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
    }

    get value() {
        return this._value;
    }

    get cols() {
        return this._cols;
    }

    get rows() {
        return this._rows;
    }

    get hook() {
        return this._hook;
    }

    get text() {
        return this._text;
    }

    get store() {
        return this._store;
    }

    get listeners() {
        return this._listeners;
    }

    get autoBind() {
        return this._autoBind;
    }

    destroy() {
        var domSquare = window.document.getElementById(this.id);
        if (domSquare) {
            this.hook.removeChild(domSquare);
        }
    }

    bind() {
        this.hook.appendChild(this.docElement);
    }

    init() {
        var link = window.document.createElement('a');

        this._docElement = window.document.createElement('li');
        this.docElement.setAttribute('id', this.id);

        link.setAttribute('href', '#');
        link.setAttribute('id', this.id + '-link');
        link.innerText = this.text;

        if (this.listeners && this.listeners.click) {
            link.addEventListener('click', this.listeners.click.bind(this), false);
        }

        this.docElement.appendChild(link);

        if (this.autoBind) {
            this.bind();
        }
    }
}
