(function(app) {
    "use strict";


    app.model = app.model || {};
    app.store = app.store || {};
    app.view = app.view || {};
    app.view.navbar = app.view.navbar || {};


    app.model.Link = class {
        config() {
            return {
                href: '#',
                text: 'link1',
                target: '_self',
                title: 'click here'
            }
        }
        constructor(config) {
            this._href = config && config.hasOwnProperty('href') ? config.href : this.config().href;
            this._text = config && config.hasOwnProperty('text') ? config.text : this.config().text;
            this._target = config && config.hasOwnProperty('target') ? config.target : this.config().target;
            this._title = config && config.hasOwnProperty('title') ? config.title : this.config().title;
        }
        get href() {
            return this._href;
        }
        get text() {
            return this._text;
        }
        get target() {
            return this._target;
        }
        get title() {
            return this._title;
        }
        get el() {
            let a = window.document.createElement('a');
            a.setAttribute('href', this.href);
            a.setAttribute('target', this.target);
            a.setAttribute('title', this.title);
            a.innerHTML = this.text;
            return a;
        }
    }


    app.store.Links = class {
        constructor(config) {
            this._data = config && config.hasOwnProperty('links') ? config.links : [];
        }
        get data() {
            return this._data;
        }
    }


    app.view.navbar.NavBar = class {
        config() {
            return {
                id: 'navbar1',
                parent: null,
                title: 'Links',
                hook: window.document.body,
                autoBind: false,
                css: {
                    base: 'navbar navbar-default',
                    container: 'container-fluid',
                    header: 'navbar-header',
                    nav: 'collapse navbar-collapse',
                    button: 'navbar-toggle collapsed',
                    span: 'icon-bar',
                    brand: 'navbar-brand',
                    ul: 'nav navbar-nav'
                },
                store: new app.store.Links({
                    data: [
                        new app.model.Link({
                            href: '#',
                            text: 'link1',
                            target: '_self'
                        })
                    ]
                })
            }
        }
        constructor(config) {
            this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
            this._title = config && config.hasOwnProperty('title') ? config.title : this.config().title;
            this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
            this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
            this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
            this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
            this._store = config && config.hasOwnProperty('store') ? config.store : this.config().store;
            this.init();
        }
        get id() {
            return this._id;
        }
        get hook() {
            return this._hook;
        }
        get title() {
            return this._title;
        }
        get docElement() {
            return this._docElement;
        }
        get parent() {
            return this._parent;
        }
        get css() {
            return this._css;
        }
        get store() {
            return this._store;
        }
        get autoBind() {
            return this._autoBind;
        }
        bind() {
            if (this.parent && this.parent.docElement) {
                this.parent.docElement.appendChild(this.docElement);
            } else if (this.hook) {
                this.hook.appendChild(this.docElement);
            }
        }
        initStore(list, button) {
            this.store.data.map(function(link) {
                let li = window.document.createElement('li'),
                    span = window.document.createElement('span');
                span.setAttribute('class', this.css.span);
                button.appendChild(span);
                li.appendChild(link.el);
                list.appendChild(li);
            }, this);
        }
        init() {
            var doc = window.document.createElement('nav'),
                container = window.document.createElement('div'),
                header = window.document.createElement('div'),
                nav = window.document.createElement('div'),
                ul = window.document.createElement('ul'),
                button = window.document.createElement('button'),
                brand = window.document.createElement('a');
            this._docElement = doc;
            if (this.css) {
                this.docElement.setAttribute('class', this.css.base);
                container.setAttribute('class', this.css.container);
                header.setAttribute('class', this.css.header);
                nav.setAttribute('class', this.css.nav);
                ul.setAttribute('class', this.css.ul);
                brand.setAttribute('class', this.css.brand);
            }
            brand.setAttribute('href', "#");
            brand.innerText = this.title;
            button.appendChild(brand);
            button.setAttribute('type', "button");
            button.setAttribute('data-toggle', "collapse");
            button.setAttribute('data-target', "#" + this.id);
            nav.setAttribute('id', this.id);
            nav.appendChild(ul);
            header.appendChild(button);
            container.appendChild(header);
            container.appendChild(nav);
            this.docElement.appendChild(container);
            if (this.store && this.store.data.length > 0) {
                this.initStore(ul, button);
            }
            if (this.autoBind) {
                this.bind();
            }
        }
    }


    app.view.Viewport = class extends app.view.navbar.NavBar {
        constructor(config) {
            super({
                id: config && config.hasOwnProperty('id') ? config.id : 'navBar1',
                hook: config && config.hasOwnProperty('hook') ? config.hook : window.document.body,
                title: 'Stuff',
                autoBind: true,
                store: new app.store.Links({
                    links: [
                        new app.model.Link({
                            href: 'http://duckduckgo.com',
                            text: 'duckduckgo',
                            target: '_blank',
                            title: 'Google Alternative'
                        }),
                        new app.model.Link({
                            href: 'https://github.com/bradyhouse',
                            text: 'github',
                            target: '_blank',
                            title: 'All my fiddles on github'
                        }),
                        new app.model.Link({
                            href: 'http://www.starwars.com/embed/522807c0b6c6761590ef1bee',
                            text: 'starwars',
                            target: '_blank',
                            title: 'The Force Awakens Trailer'
                        })
                    ]
                })
            });
        }
    }


    app.controller = app.controller || {
        onDOMContentLoaded: function() {
            var fiddleHook = document.getElementById('fiddleHook');
            new app.view.Viewport({
                hook: fiddleHook
            });
        }
    };
    document.body.addEventListener('DOMContentLoaded', app.controller.onDOMContentLoaded(), false);
})(window.app = window.app || {})
