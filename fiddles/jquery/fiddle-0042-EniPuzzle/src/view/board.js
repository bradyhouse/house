class Board {

  config() {
    return {
      id: 'puzzleBoard',
      hook: window.document.body,
      autoBind: false,
      levels: 1,
      cols: 8,
      rows: 8,
      css: {
        base: 'container',
        row: 'row',
        form: 'form-inline',
        cols: 'col-lg-4'
      }
    }
  }

  constructor(config) {
    this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
    this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
    this._cols = config && config.hasOwnProperty('cols') ? config.cols : this.config().cols;
    this._rows = config && config.hasOwnProperty('rows') ? config.rows : this.config().rows;
    this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
    this._levels = config && config.hasOwnProperty('levels') ? config.levels : this.config().levels;
    this.init();
  }

  get id() {
    return this._id;
  }

  get levels() {
    return this._levels;
  }

  get docElement() {
    return this._docElement;
  }

  get toolBar() {
    return this._toolBar;
  }

  get header() {
    return this._header;
  }

  get hook() {
    return this._hook;
  }

  get autoBind() {
    return this._autoBind;
  }

  get store() {
    return this._store;
  }

  get css() {
    return this._css;
  }

  set css(updates) {
    let colsEl;
    if (updates.hasOwnProperty('cols') && updates.cols != this.css.cols) {
      this._css = Util.overlay(updates, this._css);
      colsEl = window.document.getElementById(this.id + '-cols');
      if (colsEl) {
        colsEl.setAttribute('class', this.css.cols);
      }
    }
  }

  get cols() {
    return this._cols;
  }

  get rows() {
    return this._rows;
  }

  get colsEl() {
    let el = window.document.createElement('div');
    el.setAttribute('id', this.id + '-cols');
    el.setAttribute('class', this.css.cols);
    return el;
  }

  get rowEl() {
    let el = window.document.createElement('div');
    el.setAttribute('class', this.css.row);
    return el;
  }

  get formEl() {
    let el = window.document.createElement('div');
    el.setAttribute('class', this.css.form);
    return el;
  }

  selectLevel(level) {
    let header = level.store.parent,
      board = header.parent,
      store = board.store,
      currentLevel = header.text.right,
      cssCols = 'col-lg-' + level.cols;

    if (currentLevel != level.value) {
      header.text = {right: level.value};
      board.css.cols = cssCols;
      store.unload();
      store.cols = level.cols;
      store.rows = level.rows;
      store.load();
    }
  }

  onLevelSelect() {
    let level = this,
      header = level.store.parent,
      board = header.parent;
    board.selectLevel(level);
  }

  onResetClick() {
    this.parent.store.reset(this.parent.store);
  }

  onHelpClick() {
    let link = document.createElement('a');
    link.setAttribute('href', window.app.metadata.helpUrl);
    link.setAttribute('target', '_blank');
    link.click();
  }

  onSquareClick() {
    let store = this.store,
      squareA = this,
      squareB = store.emptySquare,
      board = store.parent,
      emptyCssClass = squareB.docElement.getAttribute('class'),
      emptyHTML = squareB.docElement.innerHTML,
      emptyValue = squareB.value,
      levels;

    if (!squareA.isEmpty && store.isValidMove(squareA, squareB)) {
      squareB.value = squareA.value;
      squareB.docElement.innerHTML = squareA.docElement.innerHTML;
      squareB.docElement.setAttribute('class', squareA.docElement.getAttribute('class'));
      squareA.docElement.innerHTML = emptyHTML;
      squareA.docElement.setAttribute('class', emptyCssClass);
      squareA.value = emptyValue;
    }

    if (store.solved) {
      if (store.cols == 5) {
        alert('You win!');
      } else {
        alert('Genius!');
        levels = store.parent.header.store.data.filter(function (level) {
          return level.cols == (store.cols + 1);
        }, store);
        if (levels.length == 1) {
          board.selectLevel(levels[0]);
        }
      }
    }

  }

  onSquareDrag() {
    console.log('onSquareDrag');

  }

  bind() {
    this.hook.appendChild(this.docElement);
  }

  init() {
    this._docElement = window.document.createElement('div');
    this.docElement.setAttribute('class', this.css.base);




    this._toolBar = new Toolbar({
      hook: this.docElement,
      autoBind: true,
      listeners: {
        reset: this.onResetClick,
        help: this.onHelpClick
      },
      parent: this
    });

    if (this.autoBind) {
      this.bind();
    }

  }

}
