class Row {

  config() {
    return {
      idPrefix: 'row',
      index: 0,
      hook: window.document.body,
      parent: null,
      autoBind: false,
      isLast: false,
      css: {
        base: 'row',
        group: 'form-inline',
        subgroup: 'form-group',
        left: 'btn empty',
        right: 'btn empty'
      },
      sequence: [],
      expectedSequence: [],
      listeners: {
        dragstart: null,
        leftdrop: null,
        leftclick: null,
        leftdragover: null,
        rightdrop: null,
        rightclick: null,
        rightdragover: null,
        squareclick: null
      }
    }
  }

  constructor(config) {
    this._docElement = window.document.createElement('div');
    this._groupElement = window.document.createElement('div');
    this._leftGroupElement = window.document.createElement('div');
    this._rightGroupElement = window.document.createElement('div');
    this._bodyGroupElement = window.document.createElement('div');
    this._leftElement = window.document.createElement('a');
    this._rightElement = window.document.createElement('a');

    this._index = config && config.hasOwnProperty('index') ? config.index : this.config().index;
    this._isLast = config && config.hasOwnProperty('isLast') ? config.isLast : this.config().isLast;
    this._idPrefix = config && config.hasOwnProperty('idPrefix') ? config.idPrefix : this.config().idPrefix;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
    this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
    this._sequence = config && config.hasOwnProperty('sequence') ? config.sequence : this.config().sequence;
    this._expectedSequence = config && config.hasOwnProperty('expectedSequence') ? config.expectedSequence : this.config().expectedSequence;
    this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
    this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
    this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;

    this._id = this._idPrefix + '-' + this._index;

    this.init();
  }

  get containsEmpty() {
    return this.store.containsEmpty;
  }

  get docElement() {
    return this._docElement;
  }

  get groupElement() {
    return this._groupElement;
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

  get idPrefix() {
    return this._idPrefix;
  }

  get isRow() {
    return true;
  }

  get hook() {
    return this._hook;
  }

  get parent() {
    return this._parent;
  }

  get board() {
    return this.parent && this.parent.isBoard ? this.parent : null;
  }

  get sequence() {
    return this._sequence;
  }

  get expectedSequence() {
    return this._expectedSequence;
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
    let el = window.document.getElementById(this.id);
    if (el) {
      this.hook.removeChild(el);
      el = null;
    }
  }

  bind() {
    this.hook.appendChild(this.docElement);
  }

  init() {
    this.docElement.setAttribute('class', this.css.base);
    this.docElement.setAttribute('id', this.id);
    this.groupElement.setAttribute('class', this.css.group);

    this.initSubGroupCss();
    this.initLeft();
    this.initBody();
    this.initRight();

    this.docElement.appendChild(this.groupElement);

    if (this.autoBind) {
      this.bind();
    }
  }

  initBody() {

    this.bodyGroupElement.setAttribute('class', this.css.subgroup);
    this.bodyGroupElement.setAttribute('id', this.id + '-body-group');

    if (this.listeners) {
      if (this.listeners.dragstart) {
        this.bodyGroupElement.setAttribute('draggable', true);
        this.bodyGroupElement.addEventListener('ondragstart', this.listeners.dragstart.bind(this), false);
      }
    }

    if (this.sequence.length > 0 && this.sequence.length === this.expectedSequence.length) {
      this._store = new Squares({
        hook: this.bodyGroupElement,
        cols: 8,
        rows: 1,
        index: this.index,
        parent: this,
        sequence: this.sequence,
        expectedSequence: this.expectedSequence,
        isLast: this.isLast,
        listeners: {
          click: this.listeners.squareclick
        },
        autoBind: true
      });
    } else {
      this._store = null;
    }

    this.groupElement.appendChild(this.bodyGroupElement);

  }

  initRight() {
    this.rightElement.setAttribute('id', this.id + '-right-link');
    this.rightElement.setAttribute('class', this.css.right);
    this.rightGroupElement.setAttribute('id', this.id + '-right-group');
    this.rightGroupElement.setAttribute('class', this.css.subgroup);

    if (this.listeners) {
      this.rightElement.addEventListener('click', this.onRightClick.bind(this), false);
      if (this.listeners.rightdrop) {
        this.rightGroupElement.addEventListener('ondrop', this.listeners.rightdrop.bind(this), false);
      }
      if (this.listeners.rightdragover) {
        this.rightGroupElement.addEventListener('ondragover', this.listeners.rightdragover.bind(this), false);
      }
    }

    this.rightElement.innerHTML = '&gt;';

    this.rightGroupElement.appendChild(this.rightElement);
    this.groupElement.appendChild(this.rightGroupElement);

  }

  initLeft() {
    this.leftElement.setAttribute('id', this.id + '-left-link');
    this.leftElement.setAttribute('class', this.css.left);
    this.leftGroupElement.setAttribute('id', this.id + '-left-group');
    this.leftGroupElement.setAttribute('class', this.css.subgroup);

    if (this.listeners) {
      this.leftElement.addEventListener('click', this.onLeftClick.bind(this), false);
      if (this.listeners.leftdrop) {
        this.leftGroupElement.addEventListener('ondrop', this.listeners.leftdrop.bind(this), false);
      }
      if (this.listeners.leftdragover) {
        this.leftGroupElement.addEventListener('ondragover', this.listeners.leftdragover.bind(this), false);
      }
    }

    this.leftElement.innerHTML = '&lt;';
    this.leftGroupElement.appendChild(this.leftElement);
    this.groupElement.appendChild(this.leftGroupElement);

  }

  initSubGroupCss() {
    if (this.css && this.css.hasOwnProperty('subgroup')) {
      if (this.index === 1) {
        this.css.subgroup += ' top-row';
      } else if (this.isLast) {
        this.css.subgroup += ' bottom-row';
      } else {
        this.css.subgroup += ' body-row';
      }
    }
  }

  click(isLeft) {
    if (isLeft) {
      return this.onLeftClick();
    }
    return this.onRightClick();
  }

  onLeftClick() {
    if (this.listeners && typeof this.listeners.leftclick === 'function') {
      return this.listeners.leftclick(this);
    }
    return false;
  }

  onRightClick() {
    if (this.listeners && typeof this.listeners.rightclick === 'function') {
      return this.listeners.rightclick(this);
    }
    return false;
  }

}
