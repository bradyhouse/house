(function(app) {
    "use strict";


    app.metadata = app.metadata || {
        gitHubUrl: 'https://github.com/bradyhouse/house/tree/master/fiddles/jquery/fiddle-0042-EniPuzzle',
        helpUrl: 'http://mathworld.wolfram.com/15Puzzle.html'
    };


    class Util {
        static isEven(x) {
            return (x % 2) == 0;
        }
        static generateSequence(min, max, count) {
            var range = [],
                number = 0,
                matches = [],
                i = 0;
            while (i < count) {
                number = Math.floor(Math.random() * (max - min + 1)) + min;
                matches = range.filter(function(elem) {
                    return elem == number;
                });
                if (matches.length == 0) {
                    range.push(number);
                    i++;
                }
            }
            return range;
        }
        static generateGameSequence(min, max, count) {
            var sequence = Util.generateSequence(min, max, count);
            while (!Util.isValid(sequence)) {
                sequence = Util.generateSequence(min, max, count);
            }
            return sequence;
        }
        static isValid(sequence) {
            var inversionCounts = [],
                inversionSum = 0;
            sequence.map(function(a, x, arr) {
                var inversions = arr.filter(function(b, y) {
                    return y > x && b < a;
                });
                if (inversions.length) {
                    inversionCounts.push(inversions.length);
                } else {
                    inversionCounts.push(0);
                }
            });
            inversionCounts.map(function(cnt) {
                inversionSum += cnt;
            });
            return Util.isEven(inversionSum);
        }
        static mapLevelDimensions(level) {
            switch (level) {
                case 8:
                    return {
                        cols: 10,
                        rows: 10
                    }
                case 7:
                    return {
                        cols: 9,
                        rows: 9
                    }
                case 6:
                    return {
                        cols: 8,
                        rows: 8
                    }
                case 5:
                    return {
                        cols: 7,
                        rows: 7
                    }
                case 4:
                    return {
                        cols: 6,
                        rows: 6
                    }
                case 3:
                    return {
                        cols: 5,
                        rows: 5
                    }
                case 2:
                    return {
                        cols: 4,
                        rows: 4
                    }
                default:
                    return {
                        cols: 3,
                        rows: 3
                    }
            }
        }
        static overlay(updates, obj) {
            for (var prop in updates) {
                if (obj.hasOwnProperty(prop)) {
                    obj[prop] = updates[prop];
                }
            }
            return obj;
        }
        static mapColClass(value) {
            switch (value) {
                case 1:
                case 9:
                case 17:
                case 25:
                case 33:
                case 41:
                case 49:
                case 57:
                    return 'col-a';
                case 2:
                case 10:
                case 18:
                case 26:
                case 34:
                case 42:
                case 50:
                case 58:
                    return 'col-b';
                case 3:
                case 11:
                case 19:
                case 27:
                case 35:
                case 43:
                case 51:
                case 59:
                    return 'col-c';
                case 4:
                case 12:
                case 20:
                case 28:
                case 36:
                case 44:
                case 52:
                case 60:
                    return 'col-d';
                case 5:
                case 13:
                case 21:
                case 29:
                case 37:
                case 45:
                case 53:
                case 61:
                    return 'col-e';
                case 6:
                case 14:
                case 22:
                case 30:
                case 38:
                case 46:
                case 54:
                case 62:
                    return 'col-f';
                case 7:
                case 15:
                case 23:
                case 31:
                case 39:
                case 47:
                case 55:
                case 63:
                    return 'col-g';
                default:
                    return 'col-h';
            }
        }
    }


    class Square {
        config() {
            return {
                id: 'square1',
                row: 1,
                col: 1,
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
            this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
            this._row = config && config.hasOwnProperty('row') ? config.row : this.config().row;
            this._col = config && config.hasOwnProperty('col') ? config.col : this.config().col;
            this._value = config && config.hasOwnProperty('value') ? config.value : this.config().value;
            this._expectedValue = config && config.hasOwnProperty('expectedValue') ? config.expectedValue : this.config().expectedValue;
            this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
            this._store = config && config.hasOwnProperty('store') ? config.store : this.config().store;
            this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
            this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
            this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
            this.init();
        }
        get docElement() {
            return this._docElement;
        }
        get id() {
            return this._id;
        }
        get row() {
            return this._row;
        }
        get col() {
            return this._col;
        }
        get value() {
            return this._value;
        }
        set value(val) {
            this._value = val;
            this.docElement.innerHTML = val;
        }
        get expectedValue() {
            return this._expectedValue;
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
        get isEmpty() {
            return this._value == '&nbsp;' ? true : false;
        }
        get isCorrect() {
            return this._expectedValue == this._value ? true : false;
        }
        get autoBind() {
            return this._autoBind;
        }
        destroy() {
            var domSquare = window.document.getElementById(this.id);
            if (domSquare) {
                domSquare.setAttribute('class', 'exit-stage-right');
                this.hook.removeChild(domSquare);
            }
        }
        bind() {
            this.hook.appendChild(this.docElement);
        }
        init() {
            let colClass = Util.mapColClass(this.value);
            this.docElement.setAttribute('href', '#');
            if (this.expectedValue < 64) {
                this.docElement.setAttribute('class', this.css.base + ' ' + colClass);
            } else {
                this.docElement.setAttribute('class', this.css.base);
            }
            this.docElement.setAttribute('row', this.row);
            this.docElement.setAttribute('col', this.col);
            this.docElement.setAttribute('id', this.id);
            this.docElement.setAttribute('draggable', 'true');
            this.docElement.setAttribute('val', this.value);
            if (this.value) {
                this.docElement.innerHTML = '&nbsp;';
            }
            if (this.listeners && this.listeners.click) {
                this.docElement.addEventListener('click', this.listeners.click.bind(this), false);
            }
            if (this.autoBind) {
                this.bind();
            }
        }
    }


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
            return this.data.filter(function(square) {
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
            this.data.map(function(square) {
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
                    this.docElement.appendChild(rowElement);
                }
            }
        }
        get range() {
            return (this.cols * this.rows);
        }
        get solved() {
            let moves = this.data.filter(function(square) {
                return square.isCorrect;
            });
            return moves && moves.length == (this.range - 1) ? true : false;
        }
        reset(store) {
            let squareCount = store.range - 1,
                i = 0,
                sequence = Util.generateGameSequence(1, squareCount, squareCount);
            store.data.map(function(square) {
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


    class Toolbar {
        config() {
            return {
                id: 'puzzle-toolbar',
                parent: null,
                hook: window.document.body,
                autoBind: false,
                css: {
                    base: 'row',
                    group: 'btn-group-justified',
                    reset: 'btn btn-danger',
                    help: 'btn btn-info'
                },
                text: {
                    reset: 'Reset',
                    help: 'Help'
                },
                listeners: {
                    reset: null,
                    help: null
                }
            }
        }
        constructor(config) {
            this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
            this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
            this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
            this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
            this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
            this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
            this._text = config && config.hasOwnProperty('text') ? config.text : this.config().text;
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
        get listeners() {
            return this._listeners;
        }
        get parent() {
            return this._parent;
        }
        get css() {
            return this._css;
        }
        get text() {
            return this._text;
        }
        get autoBind() {
            return this._autoBind;
        }
        bind() {
            this.hook.appendChild(this.docElement);
        }
        init() {
            var btnGroup = window.document.createElement('div'),
                btnReset = window.document.createElement('div'),
                btnHelp = window.document.createElement('div'),
                lineBreak = window.document.createElement('br');
            if (!this.docElement) {
                this._docElement = window.document.createElement('div');
            }
            this.docElement.setAttribute('id', this.id);
            if (this.text) {
                btnReset.innerText = this.text.reset;
                btnHelp.innerText = this.text.help;
            }
            if (this.css) {
                this.docElement.setAttribute('class', this.css.base);
                btnGroup.setAttribute('class', this.css.group);
                btnReset.setAttribute('class', this.css.reset);
                btnHelp.setAttribute('class', this.css.help);
            }
            if (this.listeners) {
                if (this.listeners.reset) {
                    btnReset.addEventListener('click', this.listeners.reset.bind(this), false);
                }
                if (this.listeners.help) {
                    btnHelp.addEventListener('click', this.listeners.help.bind(this), false);
                }
            }
            this.docElement.appendChild(lineBreak);
            btnGroup.appendChild(btnReset);
            btnGroup.appendChild(btnHelp);
            this.docElement.appendChild(btnGroup);
            if (this.autoBind) {
                this.bind();
            }
        }
    }


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
                header.text = {
                    right: level.value
                };
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
                    levels = store.parent.header.store.data.filter(function(level) {
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
            this._store = new Squares({
                hook: this.docElement,
                cols: this.cols,
                rows: this.rows,
                parent: this,
                listeners: {
                    squareclick: this.onSquareClick,
                    squareDrag: this.onSquareDrag
                },
                autoBind: true
            });
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


    app.controller = app.controller || {
        onDomContentLoaded: function() {
            var docElement = window.document.getElementById('fiddleHook');
            app.docElement = new Board({
                hook: docElement,
                autoBind: true
            })
        }
    };
    document.body.addEventListener('DOMContentLoaded', app.controller.onDomContentLoaded(), false);
})(window.app = window.app || {})
