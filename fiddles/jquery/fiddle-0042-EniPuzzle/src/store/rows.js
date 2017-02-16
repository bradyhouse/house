class Rows {
  config() {
    return {
      _id:'rows1',
      _hook: window.document.body,
      _sequence: null,
      _listeners: {
        ondragstart: null,
        onleftdrop: null,
        onleftclick: null,
        onleftdragover: null,
        onrightdrop: null,
        onrightclick: null,
        onrightdragover: null,
        onsquareclick: null
      },
      _css: {
        base: 'row',
        group: 'form-inline',
        subgroup: 'form-group',
        left: 'btn empty',
        right: 'btn empty'
      },
      _rows: 1,
      _cols = 8
    }
  }

  constructor(config) {
    this._docElement = window.document.createElement('div');
    this._date = [];
    this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
    this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
    this._sequence = config && config.hasOwnProperty('sequence') ? config.sequence : this.config().sequence;
    this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
    this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
    this._rows = config && config.hasOwnProperty('rows') ? config.rows : this.config().rows;
    this._cols = config && config.hasOwnProperty('cols') ? config.cols : this.config().cols;
    this.init();
  }


  get id() {
    return this._id;
  }

  get hook() {
    return this._hook;
  }

  get docElement() {
    return this._docElement;
  }

  get sequence() {
    return this._sequence;
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

  get data() {
    return this._data;
  }

  unload() {
    this.data.map(function (row) {
      row.destroy();
    }, this);
    this._data = [];
  }

  load() {

    let row = 1,
        i = this.index,
        seq = [];

    for (; row <= this.rows; row++) {
      seq = Util.parseSubSequence(this.sequence, i, this.cols);
      this.data.push(new Row({
        id: 'row' + row,
        index: i,
        hook: this.docElement,
        autoBind: true,
        isLast: row === this.rows,
        sequence: seq,
        listeners: this.listeners
      }));
      i++;
    }
  }



  bind() {
    this.hook.appendChild(this.docElement);
  }


  init() {
    this.docElement.setAttribute('class', this.css.base);
    this.docElement.setAttribute('id', this.id);
    if (this.sequence && this.sequence.length) {
      this.load();
      if (this.data.length) {
        if (this.autobind) {
          this.bind();
        }
      }
    }

  }


}
