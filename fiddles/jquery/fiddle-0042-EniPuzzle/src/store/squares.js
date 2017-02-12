class Squares {

  config() {
    return {
      id: 'squares',
      model: 'Square',
      index: 0,
      isLast: false,
      parent: null,
      cols: 4,
      rows: 4,
      css: {
        base: 'row',
        group: 'form-group',
        empty: 'btn empty',
        square: 'btn',
        table: 'table-bordered'
      },
      sequence: null,
      data: [],
      listeners: {
        squareclick: null
      },
      text: {
        empty: '&nbsp;'
      },
      hook: window.document.body,
      autoBind: false
    }
  }

  constructor(config) {
    this._docElement = document.createElement('div');

    this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
    this._index = config && config.hasOwnProperty('index') ? config.index : this.config().index;
    this._isLast = config && config.hasOwnProperty('isLast') ? config.isLast : this.config().isLast;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
    this._sequence = config && config.hasOwnProperty('sequence') ? config.sequence : this.config().sequence;
    this._model = config && config.hasOwnProperty('model') ? config.model : this.config().model;
    this._cols = config && config.hasOwnProperty('cols') ? config.cols : this.config().cols;
    this._rows = config && config.hasOwnProperty('rows') ? config.rows : this.config().rows;
    this._data = config && config.hasOwnProperty('data') ? config.data : this.config().data;
    this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
    this._text = config && config.hasOwnProperty('text') ? config.text : this.config().text;
    this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
    this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
    this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
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

  get index() {
    return this._index;
  }

  get isLast() {
    return this._isLast;
  }

  get parent() {
    return this._parent;
  }

  get hook() {
    return this._hook;
  }

  get model() {
    return this._model;
  }

  get cols() {
    return this._cols;
  }

  set cols(value) {
    this._cols = value;
  }

  get rows() {
    return this._rows;
  }

  set rows(value) {
    this._rows = value;
  }

  get css() {
    return this._css;
  }

  get text() {
    return this._text;
  }

  get data() {
    return this._data;
  }

  get sequence() {
    return this._sequence;
  }

  get listeners() {
    return this._listeners;
  }

  get emptySquare() {
    return this.data.filter(function (square) {
      return square.isEmpty;
    }).pop();
  }

  isValidMove(squareA, squareB) {
    let rowDelta = Math.abs(squareA.row - squareB.row),
      colDelta = Math.abs(squareA.col - squareB.col);
    if (squareA.col == squareB.col) {
      return (rowDelta == 1) && (colDelta == 0);
    }
    return false;
  }

  unload() {
    this.data.map(function (square) {
      let rowEl = window.document.getElementById(this.id + '-row' + square.row);
      square.destroy();
      if (rowEl) {
        this.docElement.removeChild(rowEl);
      }
    }, this);
    this._data = [];
  }

  load() {
    let squareCount = this.range - 1,
      col = 1,
      row = 1,
      i = this.index;
    if (this.data.length === 0 && this.sequence) {
      for (; row <= this.rows; row++) {
        for (; col <= this.cols; col++) {
          if (i < (this.sequence.length - 1) || (i < this.sequence.length && !this.isLast)) {
            this.data.push(new Square({
              id: 'squ-' + i,
              row: row,
              col: col,
              value: this.sequence[i],
              css: {
                base: this.css.square
              },
              expectedValue: this.index,
              listeners: {
                click: this.listeners.squareclick
              },
              store: this,
              hook: this.docElement,
              autoBind: true
            }));
          } else {
            this.data.push(new Square({
              id: 'squ-' + i,
              row: row,
              col: col,
              value: null,
              css: {
                base: this.css.empty
              },
              expectedValue: this.index,
              listeners: {
                click: this.listeners.squareclick
              },
              store: this,
              hook: this.docElement,
              autoBind: true
            }));
          }
          i++;
        };
        col = 1;
        //this.docElement.appendChild(rowElement);
      }
    }
  }

  get range() {
    return (this.cols * this.rows);
  }

  get solved() {
    let moves = this.data.filter(function (square) {
      return square.isCorrect;
    });
    return moves && moves.length == (this.range - 1) ? true : false;
  }

  reset(store) {
    let squareCount = store.range - 1,
      i = 0,
      sequence = Util.generateGameSequence(1, squareCount, squareCount);
    store.data.map(function (square) {
      if (i < sequence.length) {
        square.value = sequence[i];
        square.css = {
          base: store.css.square
        }
      } else {
        square.value = store.text.empty;
        square.css = {
          base: store.css.empty
        }
      }
      i++;
    });
  }

  bind() {
    this.hook.appendChild(this.docElement);
  }

  init() {
    this.docElement.setAttribute('id', this.id);
    this.docElement.setAttribute('style', 'background-color: white;');

    this.load();

    if (this.autoBind) {
      this.bind();
    }
  }

}
