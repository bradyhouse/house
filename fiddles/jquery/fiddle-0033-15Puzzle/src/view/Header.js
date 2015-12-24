class Header {

    config() {
        return {
            id: 'puzzle-header',
            levels: 6,
            parent: null,
            hook: window.document.body,
            autoBind: false,
            css: {
                base: 'row',
                left: 'nav navbar-collapse navbar-left navbar-brand dropdown',
                right: 'nav navbar-collapse navbar-right navbar-brand',
                link: 'dropdown-toggle',
                caret: 'caret'
            },
            text: {
                left: 'Level',
                right: '1'
            },
            store: null,
            listeners: {
                levelselect: null
            }
        }
    }

    constructor(config) {
        this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
        this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
        this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
        this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
        this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
        this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
        this._text = config && config.hasOwnProperty('text') ? config.text : this.config().text;
        this._levels = config && config.hasOwnProperty('levels') ? config.levels : this.config().levels;
        this.init();
    }

    get id() {
        return this._id;
    }

    get hook() {
        return this._hook;
    }

    get levels() {
        return this._levels;
    }

    get docElement() {
        return this._docElement;
    }

    get listeners() {
        return this._listeners;
    }

    get parent() {
        return this._parent;
    }

    get css() {
        return this._css;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        var rightEl = document.getElementById(this.id +'-right');

        this._text.left = value.hasOwnProperty('left') ? value.left : this._text.left;
        this._text.right = value.hasOwnProperty('right') ? value.right : this._text.right;

        if (rightEl) {
            rightEl.innerText = this.text.right;
        }
    }

    get store() {
        return this._store;
    }

    get autoBind() {
        return this._autoBind;
    }

    get menuLabelEl() {

        var href = window.document.createElement('a'),
            caret = window.document.createElement('span');

        caret.setAttribute('class', 'caret');
        href.setAttribute('id', this.id + '-menulabel');
        href.setAttribute('href', '#');
        href.setAttribute('class', this.css.link);
        href.setAttribute('data-toggle', 'dropdown');
        href.setAttribute('role', 'button');
        href.setAttribute('aria-expanded', 'false');
        href.innerHTML = this.text.left;
        href.appendChild(caret);

        return href;
    }

    get leftEl() {
        var el = window.document.createElement('ul');
        el.setAttribute('class', this.css.left);
        el.setAttribute('id', this.id + '-left');

        el.appendChild(this.menuLabelEl);

        this._store = new Levels({
            size: this.levels,
            parent: this,
            autoBind: true,
            hook: el,
            listeners: {
                levelclick: this.listeners.levelselect
            }
        });
        return el;
    }

    get rightEl() {
        var el = window.document.createElement('div');
        el.setAttribute('id', this.id + '-right');
        el.setAttribute('style', 'padding-right: 30px;');
        el.setAttribute('class', this.css.right);
        el.innerText = this.text.right;
        return el;
    }

    bind() {
        this.hook.appendChild(this.docElement);
    }

    init() {
        this._docElement = window.document.createElement('div');
        this.docElement.setAttribute('class', this.css.base);
        this.docElement.setAttribute('id', this.id);
        this.docElement.appendChild(this.leftEl);
        this.docElement.appendChild(this.rightEl);

        if (this.autoBind) {
            this.bind();
        }
    }


}
