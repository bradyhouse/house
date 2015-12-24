
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
