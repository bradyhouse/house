class Toolbar {

    config() {
        return {
            id: 'puzzle-toolbar',
            parent: null,
            hook: window.document.body,
            autoBind: false,
            css: {
                base: 'row',
                group: 'btn-group-justified',
                reset: 'btn btn-danger',
                help: 'btn btn-info'
            },
            text: {
              reset: 'Reset',
              help: 'Help'
            },
            listeners: {
                reset: null,
                help: null
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
        this.init();
    }

    get id() {
        return this._id;
    }

    get hook() {
        return this._hook;
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

    get autoBind() {
        return this._autoBind;
    }

    bind() {
        this.hook.appendChild(this.docElement);
    }

    init() {

        var btnGroup = window.document.createElement('div'),
            btnReset = window.document.createElement('div'),
            btnHelp = window.document.createElement('div'),
            lineBreak = window.document.createElement('br');


        if (!this.docElement) {
            this._docElement = window.document.createElement('div');
        }

        this.docElement.setAttribute('id', this.id);

        if(this.text) {
            btnReset.innerText = this.text.reset;
            btnHelp.innerText = this.text.help;
        }

        if (this.css) {
            this.docElement.setAttribute('class', this.css.base);
            btnGroup.setAttribute('class', this.css.group);
            btnReset.setAttribute('class', this.css.reset);
            btnHelp.setAttribute('class', this.css.help);
        }

        if (this.listeners) {
            if (this.listeners.reset) {
                btnReset.addEventListener('click', this.listeners.reset.bind(this), false);
            }
            if (this.listeners.help) {
                btnHelp.addEventListener('click', this.listeners.help.bind(this), false);
            }
        }
        this.docElement.appendChild(lineBreak);
        btnGroup.appendChild(btnReset);
        btnGroup.appendChild(btnHelp);
        this.docElement.appendChild(btnGroup);

        if (this.autoBind) {
            this.bind();
        }
    }

}
