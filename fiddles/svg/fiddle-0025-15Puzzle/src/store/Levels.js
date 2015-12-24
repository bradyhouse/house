app.store.Levels = class {

    config() {
        return {
            id: 'levels',
            parent: null,
            size: 2,
            selected: 1,
            model: function (config) {
                return new Level(config);
            },
            css: {
                base: 'dropdown-menu'
            },
            data: [],
            listeners: {
                levelclick: null
            },
            hook: window.document.body,
            autoBind: false
        }
    }

    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._model = config && config.hasOwnProperty('model') ? config.model : this.config().model;
        this._size = config && config.hasOwnProperty('size') ? config.size : this.config().size;
        this._data = config && config.hasOwnProperty('data') ? config.data : this.config().data;
        this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
        this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._selected = config && config.hasOwnProperty('selected') ? config.selected : this.config().selected;
        this.init();
    }

    get docElement() {
        return this._docElement;
    }

    get autoBind() {
        return this._autoBind;
    }

    get id() {
        return this._id;
    }

    get parent() {
        return this._parent;
    }

    get size() {
        return this._size;
    }

    get hook() {
        return this._hook;
    }

    get model() {
        return this._model;
    }

    get css() {
        return this._css;
    }

    get data() {
        return this._data;
    }

    get listeners() {
        return this._listeners;
    }

    get menuEl() {
        var el = window.document.createElement('ul');
        el.setAttribute('class', this.css.menu);
        return el;
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
        this.data.map(function(level){
            if (level.value == this.selected) {
                level.selected = true;
            } else {
                level.selected = false;
            }
        }, this);
    }

    bind() {
        this.hook.appendChild(this.docElement);
    }

    init() {
        var level = 1,
            dimensions;

        this._docElement = window.document.createElement('ul');
        this.docElement.setAttribute('class', this.css.base);
        this.docElement.appendChild(this.menuEl);
        if (this.data.length === 0) {
            for (; level <= this.size; level++) {
                dimensions = Util.mapLevelDimensions(level);

                this.data.push(this.model({
                    selected: level == this.selected ? true : false,
                    value: level,
                    cols: dimensions.cols,
                    rows: dimensions.rows,
                    text: 'Level ' + level,
                    hook: this.docElement,
                    autoBind: true,
                    store: this,
                    listeners: {
                        click: this.listeners.levelclick
                    }
                }));
            }
        }

        if (this.autoBind) {
            this.bind();
        }

    }
}
