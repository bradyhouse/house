class Squares {

  config() {
    return {
      id: 'squares',
      model: 'Square',
      parent: null,
      cols: 4,
      rows: 4,
      css: {
        rows: 'row',
        cells: 'btn-group-justified',
        empty: 'btn empty',
        square: 'btn',
        table: 'table-bordered'
      },
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
    this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
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
    var rowDelta = Math.abs(squareA.row - squareB.row),
      colDelta = Math.abs(squareA.col - squareB.col);
    if (squareA.col == squareB.col) {
      return (rowDelta == 1) && (colDelta == 0);
    }
    return false;
  }

  unload() {
    this.data.map(function (square) {
      var rowEl = window.document.getElementById(this.id + '-row' + square.row);
      square.destroy();
      if (rowEl) {
        this.docElement.removeChild(rowEl);
      }
    }, this);
    this._data = [];
  }

  load() {
    var squareCount = this.range - 1,
      col = 1,
      row = 1,
      i = 0;
    if (this.data.length === 0) {
      this._sequence = Util.generateGameSequence(1, squareCount, squareCount);
      for (; row <= this.rows; row++) {
        var rowElement = window.document.createElement('div');
        rowElement.setAttribute('class', this.css.rows);
        rowElement.setAttribute('id', this.id + '-row' + row);
        var btnGroupElement = window.document.createElement('div');
        btnGroupElement.setAttribute('id', this.id + '-btngroup' + row);
        if (row == 1) {
          btnGroupElement.setAttribute('class', this.css.cells + ' top-row');
        } else if (row == this.rows) {
          btnGroupElement.setAttribute('class', this.css.cells + ' body-row');
        } else {
          btnGroupElement.setAttribute('class', this.css.cells + ' bottom-row');
        }
        rowElement.appendChild(btnGroupElement);
        for (; col <= this.cols; col++) {
          this.data.push(new Square({
            id: 'square' + i,
            row: row,
            col: col,
            value: i < this.sequence.length ? this.sequence[i] : this.text.empty,
            css: {
              base: i < this.sequence.length ? this.css.square : this.css.empty
            },
            expectedValue: i < this.sequence.length ? i + 1 : null,
            listeners: {
              click: this.listeners.squareclick
            },
            store: this,
            hook: btnGroupElement,
            autoBind: true
          }));
          i++;
        }
        ;
        col = 1;
        this.docElement.appendChild(rowElement);
      }
    }
  }

  get range() {
    return (this.cols * this.rows);
  }

  get solved() {
    var moves = this.data.filter(function (square) {
      return square.isCorrect;
    });
    return moves && moves.length == (this.range - 1) ? true : false;
  }

  reset(store) {
    var squareCount = store.range - 1,
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
    var docElement = document.createElement('div');
    docElement.setAttribute('id', this.id);
    docElement.setAttribute('style', 'background-color: white;');
    this._docElement = docElement;
    this.load();

    if (this.autoBind) {
      this.bind();
    }

  }
}
