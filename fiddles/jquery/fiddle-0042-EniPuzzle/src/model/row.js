class Row {

  config() {
    return {
      id: 'row',
      index: 0,
      hook: window.document.body,
      autoBind: false,
      isLast: false,
      css: {
        base: 'row',
        group: 'form-inline',
        subgroup: 'form-group',
        left: 'btn empty',
        right: 'btn empty'
      },
      sequence: null,
      listeners: {
        ondragstart: null,
        onleftdrop: null,
        onleftclick: null,
        onleftdragover: null,
        onrightdrop: null,
        onrightclick: null,
        onrightdragover: null,
        onsquareclick: null
      }
    }
  }

  constructor(config) {
    this._docElement = window.document.createElement('div');
    this._leftGroupElement = window.document.createElement('div');
    this._rightGroupElement = window.document.createElement('div');
    this._bodyGroupElement = window.document.createElement('div');
    this._leftElement = window.document.createElement('a');
    this._rightElement = window.document.createElement('a');

    this._index = config && config.hasOwnProperty('index') ? config.index : this.config().index;
    this._isLast = config && config.hasOwnProperty('isLast') ? config.isLast : this.config().isLast;
    this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
    this._sequence = config && config.hasOwnProperty('sequence') ? config.sequence : this.config().sequence;
    this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
    this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
    this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
    this.init();
  }

  get docElement() {
    return this._docElement;
  }

  get leftGroupElement() {
    return this._leftGroupElement;
  }

  get leftElement() {
    return this._leftElement;
  }

  get rightGroupElement() {
    return this._rightGroupElement;
  }

  get rightElement() {
    return this._rightElement;
  }

  get bodyGroupElement() {
    return this._bodyGroupElement;
  }

  get isLast() {
    return this._isLast;
  }

  get index() {
    return this._index;
  }

  get id() {
    return this._id;
  }

  get hook() {
    return this._hook;
  }

  get sequence() {
    return this._sequence;
  }

  get store() {
    return this._store;
  }

  get css() {
    return this._css;
  }

  get listeners() {
    return this._listeners;
  }

  get autoBind() {
    return this._autoBind;
  }

  destroy() {
    var el = window.document.getElementById(this.id);
    if (el) {
      this.hook.removeChild(el);
    }
  }

  bind() {
    this.hook.appendChild(this.docElement);
  }

  init() {
    this.docElement.setAttribute('class', this.css.base);
    this.docElement.setAttribute('id', this.id + '-' + this.index);
    this.initLeft();
    this.initBody();
    this.initRight();


  }

  initBody() {
    this.bodyGroupElement.setAttribute('class', this.css.subgroup);
    this.bodyGroupElement.setAttribute('id', this.id + '-' + this.index + 'group-body');


    if (this.listeners) {
      if (this.listeners.ondragstart) {
        this.bodyGroupElement.setAttribute('draggable', true);
        this.bodyGroupElement.addEventListener('ondragstart', this.listeners.ondragstart.bind(this), false);
      }
    }

    if (this.sequence) {
      this._store = new Squares({
        hook: this.bodyGroupElement,
        cols: 8,
        rows: 1,
        index: this.index,
        parent: this,
        sequence: this.sequence,
        isLast: this.isLast,
        listeners: {
          squareclick: this.onsquareclick
        },
        autoBind: true
      });
    } else {
      this._store = null;
    }



  }

  initRight() {
    this.rightElement.setAttribute('id', this.id + '-' + this.index + '-right');
    this.rightElement.setAttribute('class', this.css.right);
    this.rightGroupElement.setAttribute('id', this.id + '-' + this.index + 'group-right');
    this.rightGroupElement.setAttribute('class', this.css.subgroup);

    if (this.listeners) {
      if (this.listeners.onrightclick) {
        this.rightElement.addEventListener('click', this.listeners.onrightclick.bind(this), false);
      }
      if (this.listeners.onrightdrop) {
        this.rightGroupElement.addEventListener('ondrop', this.listeners.onrightdrop.bind(this), false);
      }
      if (this.listeners.onrightdragover) {
        this.rightGroupElement.addEventListener('ondragover', this.listeners.onrightdragover.bind(this), false);
      }
    }


    this.rightGroupElement.appendChild(this.rightElement);
    this.docElement.appendChild(this.rightGroupElement);

  }

  initLeft() {
    this.leftElement.setAttribute('id', this.id + '-' + this.index + '-left');
    this.leftElement.setAttribute('class', this.css.left);
    this.leftGroupElement.setAttribute('id', this.id + '-' + this.index + 'group-left');
    this.leftGroupElement.setAttribute('class', this.css.subgroup);
    this.leftGroupElement.addEventListener('ondrop', this.listeners.onleftdrop.bind(this), false);

    if (this.listeners) {
      if (this.listeners.onleftclick) {
        this.leftElement.addEventListener('click', this.listeners.onleftclick.bind(this), false);
      }
      if (this.listeners.onleftdrop) {
        this.leftGroupElement.addEventListener('ondrop', this.listeners.onleftdrop.bind(this), false);
      }
      if (this.listeners.onleftdragover) {
        this.leftGroupElement.addEventListener('ondragover', this.listeners.onleftdragover.bind(this), false);
      }
    }

    this.leftGroupElement.appendChild(this.leftElement);
    this.docElement.appendChild(this.leftGroupElement);

  }

}
