class Square {

  config() {
    return {
      idPrefix: 'square',
      isEmpty: false,
      row: 1,
      col: 1,
      parent: null,
      value: null,
      expectedValue: null,
      hook: window.document.body,
      autoBind: false,
      css: {
        base: 'btn'
      },
      store: null,
      listeners: {
        click: null
      }
    }
  }

  constructor(config) {
    this._docElement = window.document.createElement('a');
    this._idPrefix = config && config.hasOwnProperty('idPrefix') ? config.idPrefix : this.config().idPrefix;
    this._isEmpty = config && config.hasOwnProperty('isEmpty') ? config.isEmpty : this.config().isEmpty;
    this._row = config && config.hasOwnProperty('row') ? config.row : this.config().row;
    this._col = config && config.hasOwnProperty('col') ? config.col : this.config().col;
    this._value = config && config.hasOwnProperty('value') ? config.value : this.config().value;
    this._expectedValue = config && config.hasOwnProperty('expectedValue') ? config.expectedValue : this.config().expectedValue;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
    this._store = config && config.hasOwnProperty('store') ? config.store : this.config().store;
    this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
    this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
    this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;

    this._id = this._idPrefix + '-r' + this._row + '-c' + this._col + '-link';
    this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
    this.init();
  }

  get docElement() {
    return this._docElement;
  }

  get id() {
    return this._id;
  }

  get idPrefix() {
    return this._idPrefix;
  }

  set isEmpty(val) {
    this._isEmpty = val;
  }

  get isEmpty() {
    return this._isEmpty ? true : false;
  }

  get isSquare() {
    return true;
  }

  get row() {
    return this._row;
  }

  get col() {
    return this._col;
  }

  get parent() {
    return this._parent;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  get expectedValue() {
    return this._expectedValue;
  }

  set expectedValue(val) {
    this._expectedValue = val;
  }

  get hook() {
    return this._hook;
  }

  get store() {
    return this._store;
  }

  get css() {
    return this._css;
  }

  set css(cssObj) {
    this._css = cssObj;
    if (this.value && this.value < 64) {
      this.docElement.setAttribute('class', this.css.base + ' ' + Util.mapColClass(this.value));
    } else {
      this.docElement.setAttribute('class', this.css.base);
    }
  }

  get listeners() {
    return this._listeners;
  }

  get isCorrect() {
    return this._expectedValue == this._value ? true : false;
  }

  get autoBind() {
    return this._autoBind;
  }

  destroy() {
    let domSquare = window.document.getElementById(this.id);
    if (domSquare) {
      domSquare.setAttribute('class', 'exit-stage-right');
      this.hook.removeChild(domSquare);
    }
  }

  bind() {
    this.hook.appendChild(this.docElement);
  }

  click() {
    if (typeof this.listeners.click === 'function') {
      return this.listeners.click(this);
    }
    return false;
  }

  init() {
    let colClass = Util.mapColClass(this.value);
    this.docElement.setAttribute('href', '#');
    if (this.expectedValue < 64) {
      this.docElement.setAttribute('class', this.css.base + ' ' + colClass);
    } else {
      this.docElement.setAttribute('class', this.css.base);
    }
    this.docElement.setAttribute('id', this.id);
    this.docElement.setAttribute('draggable', 'true');
    this.docElement.innerHTML = '&nbsp;';
    this.docElement.addEventListener('click', this.click.bind(this), false);

    if (this.autoBind) {
      this.bind();
    }
  }

}
