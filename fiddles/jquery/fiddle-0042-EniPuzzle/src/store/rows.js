class Rows {

  config() {
    return {
      autoBind: false,
      id:'rows-store',
      isSolved: false,
      parent: null,
      hook: window.document.body,
      listeners: {
        dragstart: null,
        leftdrop: null,
        leftclick: null,
        leftdragover: null,
        rightdrop: null,
        rightclick: null,
        rightdragover: null,
        squareclick: null
      },
      css: {
        base: 'container-fluid'
      },
      rows: 8,
      cols: 8
    }
  }

  constructor(config) {
    this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
    this._docElement = window.document.createElement('div');
    this._data = [];
    this._sequence = [];
    this._expectedSequence = [];
    this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
    this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
    this._isSolved = config && config.hasOwnProperty('isSolved') ? config.isSolved : this.config().isSolved;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
    this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
    this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
    this._rows = config && config.hasOwnProperty('rows') ? config.rows : this.config().rows;
    this._cols = config && config.hasOwnProperty('cols') ? config.cols : this.config().cols;
    this.init();
  }

  get autoBind() {
    return this._autoBind;
  }

  get emptySquare() {
    let emptyRows = this.data.filter(function (row) {
      return row.containsEmpty;
    });

    if (emptyRows && emptyRows.length) {
      return emptyRows[0].store.emptySquare;
    }
    return null;
  }

  get parent() {
    return this._parent;
  }

  get id() {
    return this._id;
  }

  get isSolved() {
    return this._isSolved;
  }

  set isSolved(val) {
    this._isSolved = val;
  }

  get hook() {
    return this._hook;
  }

  get docElement() {
    return this._docElement;
  }

  get size() {
    let count = 0;
    this.data.forEach((row) => {
      count+= row.store.size;
    });
    return count;
  }

  get sequence() {
    return this._sequence;
  }

  get expectedSequence() {
    return this._expectedSequence;
  }

  get listeners() {
    return this._listeners;
  }

  get css() {
    return this._css;
  }

  get rows() {
    return this._rows;
  }

  get cols() {
    return this._cols;
  }

  set data(arr) {
    this._data = [];
  }

  get data() {
    return this._data;
  }

  zero() {
    this.data.map(function (row) {
      row.destroy();
    }, this);
    this._data = [];
    this.hook.removeChild(this.docElement);
  }

  solve() {
    this.zero();
    this.isSolved = true;
    this.init();
  }

  play() {
    this.zero();
    this.isSolved = false;
    this.init();
  }

  load() {

    let row = 1,
        i = 1,
        pos = 0,
        seq = [],
        expectedSeq = [];

    for (; row <= this.rows; row++) {
      if (this.isSolved) {
        seq = Util.parseSubSequence(this.expectedSequence, pos, this.cols);
      } else {
        seq = Util.parseSubSequence(this.sequence, pos, this.cols);
      }
      expectedSeq = Util.parseSubSequence(this.expectedSequence, pos, this.cols);

      this.data.push(new Row({
        index: i,
        parent: this.parent,
        hook: this.docElement,
        autoBind: true,
        isLast: row === this.rows ? true : false,
        sequence: seq,
        expectedSequence: expectedSeq,
        listeners: this.listeners
      }));
      i++;
      pos += this.cols;
    }
  }

  reset() {
    this.data = [];
    this.load();
  }

  bind() {
    this.hook.appendChild(this.docElement);
  }

  init() {
    this.docElement.setAttribute('class', this.css.base);
    this.docElement.setAttribute('id', this.id);

    this.initSequence();
    this.initExpectedSequence();

    if (this.sequence.length > 0 && this.sequence.length === this.expectedSequence.length) {
      this.load();
      if (this.data.length) {
        if (this.autoBind) {
          this.bind();
        }
      }
    }
  }

  initSequence() {
    let min = 1,
      max = this.rows && this.cols ? this.rows * this.cols : 0;

    if (max > 0) {
      this._sequence = Util.generateSequence(min, max, max);
    }
  }

  initExpectedSequence() {
    let min = 1,
      max = this.rows && this.cols ? this.rows * this.cols : 0;

    if (max > 0) {
      this._expectedSequence = Util.generateSequentialSequence(min, max);
    }
  }

}
