class Board {

  config() {
    return {
      id: 'board',
      hook: window.document.body,
      autoBind: false,
      isToolBar: false,
      isSolved: false,
      cols: 8,
      rows: 8,
      css: {
        base: 'container-fluid'
      }
    }
  }

  constructor(config) {
    this._docElement = window.document.createElement('div');
    this._toolBar = null;
    this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
    this._isSolved = config && config.hasOwnProperty('isSolved') ? config.isSolved : this.config().isSolved;
    this._isToolBar = config && config.hasOwnProperty('isToolBar') ? config.isToolBar : this.config().isToolBar;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
    this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
    this._cols = config && config.hasOwnProperty('cols') ? config.cols : this.config().cols;
    this._rows = config && config.hasOwnProperty('rows') ? config.rows : this.config().rows;
    this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
    this.init();
  }

  get id() {
    return this._id;
  }

  get isToolBar() {
    return this._isToolBar;
  }

  get isBoard() {
    return true;
  }

  get isSolved() {
    return this._isSolved;
  }

  get docElement() {
    return this._docElement;
  }

  get toolBar() {
    return this._toolBar;
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

  get cols() {
    return this._cols;
  }

  get rows() {
    return this._rows;
  }



  onHelpClick() {
    let link = document.createElement('a');
    link.setAttribute('href', window.app.metadata.helpUrl);
    link.setAttribute('target', '_blank');
    link.click();
  }

  onRightClick(row) {
    row.store.shiftRight();
  }

  onLeftClick(row) {
    row.store.shiftLeft();
  }

  onSquareClick(square) {

    let row = square.parent,
        board = row ? row.parent : null,
        store = board ? board.store : null,
        squareA = square,
        squareB = store.emptySquare;

    if (!squareA.isEmpty && Util.isValidMove(squareA, squareB)) {
      Util.swap(squareA, squareB);
    }
    if (window.document.activeElement !== window.document.body) {
      window.document.activeElement.blur();
    }
  }

  onResetClick() {
    this.store.reset();
  }

  bind() {
    this.hook.appendChild(this.docElement);
  }

  init() {
    this.docElement.setAttribute('class', this.css.base);
    this.docElement.setAttribute('id', this.id);

    this._store = new Rows({
      rows: this.rows,
      cols: this.cols,
      parent: this,
      hook: this.docElement,
      autoBind: true,
      isSolved: this.isSolved,
      listeners: {
        squareclick: this.onSquareClick,
        leftclick: this.onLeftClick,
        rightclick: this.onRightClick
      }
    });

    if (this.isToolBar) {
      this._toolBar = new Toolbar({
        hook: this.docElement,
        autoBind: true,
        listeners: {
          reset: this.onResetClick,
          help: this.onHelpClick
        }
      });
    }

    if (this.autoBind) {
      this.bind();
    }

  }

  solve() {
    this.store.solve();
  }

  play() {
    this.store.play();
  }

  toggle(el) {
    if(el.innerHTML === 'play') {
      this.play();
      el.innerHTML = 'solve';
      el.setAttribute('title', 'Solve the puzzle');

    } else {
      this.solve();
      el.innerHTML = 'play';
      el.setAttribute('title', 'Begin the game');
    }
  }

}
