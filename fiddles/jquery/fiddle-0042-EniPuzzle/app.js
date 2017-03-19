(function(app) {
    "use strict";


    app.metadata = app.metadata || {
        gitHubUrl: 'https://github.com/bradyhouse/house/tree/master/fiddles/jquery/fiddle-0042-EniPuzzle',
        helpUrl: 'http://www.enipuzzles.com/'
    };


    class Util {
        static isEven(x) {
            return (x % 2) == 0;
        }
        static generateSequence(min, max, count) {
            let range = [],
                number = 0,
                i = 0;
            while (i < count) {
                number = Math.floor(Math.random() * (max - min + 1)) + min;
                if (range.indexOf(number) === -1) {
                    range.push(number);
                    i++;
                }
            }
            return range;
        }
        static generateSequentialSequence(min, max) {
            let sequence = [],
                i = 0,
                number = min,
                count = (max - min);
            if (count > 0) {
                while (i < (count + 1)) {
                    sequence.push(number);
                    number++;
                    i++;
                }
            }
            return sequence;
        }
        static generateGameSequence(min, max, count) {
            let sequence = Util.generateSequence(min, max, count);
            while (!Util.isValid(sequence)) {
                sequence = Util.generateSequence(min, max, count);
            }
            return sequence;
        }
        static isValid(sequence) {
            let inversionCounts = [],
                inversionSum = 0;
            sequence.forEach(function(a, x, arr) {
                let inversions = arr.filter(function(b, y) {
                    return y > x && b < a;
                });
                if (inversions.length) {
                    inversionCounts.push(inversions.length);
                } else {
                    inversionCounts.push(0);
                }
            });
            inversionCounts.forEach(function(cnt) {
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
        static parseSubSequence(sequence, pos, range) {
            let subSequence = [],
                i = pos,
                lim = pos + range;
            sequence.map(function(element) {
                while (i < lim) {
                    subSequence.push(sequence[i]);
                    i++;
                }
            });
            return subSequence;
        }
        static isValidMove(squareA, squareB) {
            let rowDelta = Math.abs(squareA.row - squareB.row),
                colDelta = Math.abs(squareA.col - squareB.col);
            if (squareA.col == squareB.col) {
                return (rowDelta == 1) && (colDelta == 0);
            }
            if (squareA.row == squareB.row) {
                return (rowDelta == 0) && (colDelta == 1);
            }
            return false;
        }
        static swap(squareA, squareB) {
            if (squareA && squareB && squareA.isSquare && squareB.isSquare) {
                let squareAValue = squareA.value,
                    squareAIsEmpty = squareA.isEmpty,
                    squareAClass = squareA.docElement.getAttribute('class'),
                    squareBValue = squareB.value,
                    squareBIsEmpty = squareB.isEmpty,
                    squareBClass = squareB.docElement.getAttribute('class');
                squareA.value = squareBValue;
                squareA.isEmpty = squareBIsEmpty;
                squareA.docElement.setAttribute('class', squareBClass);
                squareB.value = squareAValue;
                squareB.isEmpty = squareAIsEmpty;
                squareB.docElement.setAttribute('class', squareAClass);
            }
        }
    }


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


    class Rows {
        config() {
            return {
                autoBind: false,
                id: 'rows-store',
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
            let emptyRows = this.data.filter(function(row) {
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
                count += row.store.size;
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
            this.data.map(function(row) {
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


    class Squares {
        config() {
            return {
                idPrefix: 'squares',
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
                expectedSequence: null,
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
            this._idPrefix = config && config.hasOwnProperty('idPrefix') ? config.idPrefix : this.config().idPrefix;
            this._index = config && config.hasOwnProperty('index') ? config.index : this.config().index;
            this._isLast = config && config.hasOwnProperty('isLast') ? config.isLast : this.config().isLast;
            this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
            this._sequence = config && config.hasOwnProperty('sequence') ? config.sequence : this.config().sequence;
            this._expectedSequence = config && config.hasOwnProperty('expectedSequence') ? config.expectedSequence : this.config()._expectedSequence;
            this._model = config && config.hasOwnProperty('model') ? config.model : this.config().model;
            this._cols = config && config.hasOwnProperty('cols') ? config.cols : this.config().cols;
            this._rows = config && config.hasOwnProperty('rows') ? config.rows : this.config().rows;
            this._data = config && config.hasOwnProperty('data') ? config.data : this.config().data;
            this._css = config && config.hasOwnProperty('css') ? config.css : this.config().css;
            this._text = config && config.hasOwnProperty('text') ? config.text : this.config().text;
            this._listeners = config && config.hasOwnProperty('listeners') ? config.listeners : this.config().listeners;
            this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
            this._parent = config && config.hasOwnProperty('parent') ? config.parent : this.config().parent;
            this._id = this._idPrefix + '-' + this._index;
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
        get idPrefix() {
            return this._idPrefix;
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
        get row() {
            return this.parent && this.parent.isRow ? this.parent : null;
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
        get expectedSequence() {
            return this._expectedSequence;
        }
        get size() {
            return this.data.length;
        }
        get listeners() {
            return this._listeners;
        }
        get containsEmpty() {
            return this.emptySquare ? true : false;
        }
        get emptySquare() {
            let emptySquares = this.data.filter(function(square) {
                return square.isEmpty;
            });
            if (emptySquares && emptySquares.length) {
                return emptySquares.pop();
            }
            return null;
        }
        get firstSquare() {
            return this.data && this.data.length ? this.data[0] : null;
        }
        get lastSquare() {
            return this.data && this.data.length ? this.data[this.data.length - 1] : null;
        }
        shiftLeft() {
            if (this.data && this.data.length === 8) {
                Util.swap(this.data[0], this.data[1]);
                Util.swap(this.data[1], this.data[2]);
                Util.swap(this.data[2], this.data[3]);
                Util.swap(this.data[3], this.data[4]);
                Util.swap(this.data[4], this.data[5]);
                Util.swap(this.data[5], this.data[6]);
                Util.swap(this.data[6], this.data[7]);
            }
        }
        shiftRight() {
            if (this.data && this.data.length === 8) {

                Util.swap(this.data[7], this.data[6]);
                Util.swap(this.data[6], this.data[5]);
                Util.swap(this.data[5], this.data[4]);
                Util.swap(this.data[4], this.data[3]);
                Util.swap(this.data[3], this.data[2]);
                Util.swap(this.data[2], this.data[1]);
                Util.swap(this.data[1], this.data[0]);
            }
        }
        zero() {
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
                i = 0;
            if (this.data.length === 0 && this.sequence && this.expectedSequence) {
                for (; row <= this.rows; row++) {
                    for (; col <= this.cols; col++) {
                        if (i < (this.sequence.length - 1) || (i < this.sequence.length && !this.isLast)) {
                            this.data.push(new Square({
                                row: this.index,
                                col: col,
                                parent: this.parent,
                                value: this.sequence[i],
                                css: {
                                    base: this.css.square
                                },
                                isEmpty: false,
                                expectedValue: this.expectedSequence[i],
                                listeners: this.listeners,
                                store: this,
                                hook: this.docElement,
                                autoBind: true
                            }));
                        } else {
                            this.data.push(new Square({
                                row: this.index,
                                col: col,
                                parent: this.parent,
                                value: null,
                                css: {
                                    base: this.css.empty
                                },
                                isEmpty: true,
                                expectedValue: this.expectedSequence[i],
                                listeners: this.listeners,
                                store: this,
                                hook: this.docElement,
                                autoBind: true
                            }));
                        }
                        i++;
                    };
                    col = 1;
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
                id: 'toolbar',
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
            let btnGroup = window.document.createElement('div'),
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
            if (el.innerHTML === 'play') {
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


    app.controller = app.controller || {
        onDomContentLoaded: function() {
            let docElement = window.document.getElementById('fiddleHook');
            app.board = app.board || new Board({
                hook: docElement,
                isSolved: true,
                autoBind: true
            })
        }
    };
    /**
     * "Debug" Jasmine testing hooks.
     */
    app.test = window.location.pathname.match('test') ? app.test || {
        board: function(config) {
            return new Board(config);
        },
        row: function(config) {
            return new Row(config);
        },
        rows: function(config) {
            return new Rows(config);
        },
        square: function(config) {
            return new Square(config);
        },
        util: function() {
            return Util;
        }
    } : null;
    if (!window.location.pathname.match('test')) {
        document.body.addEventListener('DOMContentLoaded', app.controller.onDomContentLoaded(), false);
    }
})(window.app = window.app || {})