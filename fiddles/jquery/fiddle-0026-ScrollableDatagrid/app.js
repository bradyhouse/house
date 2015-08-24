(function (app) {
    "use strict";

    const debug = false; // Test Hook On/Off switch

    class Util {
        static convertToColumnName(index) {
            var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                    'U', 'V', 'W', 'X', 'Y', 'Z'],
                useActual = index <= 27 ? true : false,
                repeat = !useActual && Math.floor(index / 27) > 1 ? Math.floor(index / 27) : 0,
                actualIndex = useActual ? index : index % 27,
                letterIndex = actualIndex > 0 ? actualIndex - 1 : 0,
                i = 0,
                colNameSuffix = '',
                colName = 'c';
            if (useActual) {
                return colName + alphabet[letterIndex];
            }
            if (repeat == 0) {
                return colName + 'A' + alphabet[letterIndex]
            }
            for (; i < repeat; i++) {
                colNameSuffix += alphabet[i];
            }
            return colName += colNameSuffix + alphabet[letterIndex];
        }

        static getAsyncPromise(url) {
            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.open('GET', url);
                req.onload = function () {
                    if (req.status == 200) {
                        resolve(JSON.parse(req.responseText));
                    } else {
                        reject(Error(req.statusText));
                    }
                };
                req.onerror = function () {
                    reject(Error("Network Error"));
                };
                req.send();

            });
        }

        static isDigit(ch) {
            var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                match = digits.filter(function (digit) {
                    return digit === ch;
                });
            if (match && match.length > 0) {
                return true;
            }
            return false;
        }

        static popInt(str) {
            var i = 0,
                ch = '',
                intStr = '',
                rc = 0;

            for (; i < str.length; i++) {
                ch = str.charAt(i);
                if (Util.isDigit(ch)) {
                    intStr += ch;
                }
            }
            if (intStr.length > 0) {
                rc = parseInt(intStr);
            }
            return rc;
        }

        static calculateAdjustedTableWidth(tableWidth, padding, fieldCount) {
            var adjustedWidth = this.popInt(tableWidth) - padding,
                newTableWidth = adjustedWidth + 'px';

            while (adjustedWidth % fieldCount > 0) {
                adjustedWidth += 1;
                newTableWidth = adjustedWidth + 'px';
                adjustedWidth = this.popInt(newTableWidth, fieldCount);
            }
            return newTableWidth;
        }

        static calculateColumnWidth(tableWidth, fieldCount) {
            var width = Util.popInt(tableWidth),
                colWidth = 0;
            if (fieldCount > 0) {
                colWidth = width / fieldCount;
            }
            return colWidth + 'px';
        }
    }
    class Model {
        constructor(config) {
            var field = '',
                i = 0;
            this._fields = config && config.hasOwnProperty('fields') ? config.fields : this.config().fields;
            for (; i < this.fields.length; i++) {
                field = this.fields[i];
                if (config && config.hasOwnProperty(field)) {
                    this[field] = config[field];
                } else {
                    this[field] = '';
                }
            }
        }

        config() {
            return {
                fields: ['id', 'isActive', 'checking', 'savings', 'name']
            }
        }

        get fields() {
            return this._fields;
        }
    }
    class Store {
        constructor(config) {
            this._owner = config && config.hasOwnProperty('owner') ? config.owner : null,
                this._url = config && config.hasOwnProperty('url') ? config.url : this.config().url;
            this._rootNode = config && config.hasOwnProperty('rootNode') ? config.rootNode : this.config().rootNode;
            this._autoBind = config && config.hasOwnProperty('autoBind') ? config.autoBind : this.config().autoBind;
            this._afterLoad = config && config.hasOwnProperty('afterLoad') ? config.afterLoad : this.config().afterLoad;
            this._model = this.config().model();
            this._data = null;
            this._models = [];
            this.bind();
        }

        get owner() {
            return this._owner;
        }

        get autoBind() {
            return this._autoBind;
        }

        get count() {
            return this.models.length;
        }

        get data() {
            return this._data;
        }

        get rootNode() {
            return this._rootNode;
        }

        get afterLoad() {
            return this._afterLoad;
        }

        get model() {
            return this._model;
        }

        get models() {
            return this._models;
        }

        get url() {
            return this._url;
        }

        set data(value) {
            this._data = value;
        }

        set url(value) {
            this._url = value;
        }

        bind() {
            if (this.autoBind) {
                if (this.data) {
                    this.localBind(this.data);
                } else {
                    this.remoteBind();
                }
            }
        }

        config() {
            return {
                autoBind: true,
                url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/data3.json',
                rootNode: 'data',
                afterLoad: null,
                model: function (config) {
                    return new Model(config);
                }
            }
        }

        push(model) {
            this.models.push(model);
        }

        remoteBind() {
            var me = this;
            Util.getAsyncPromise(this.url).then(function (details) {
                me.localBind(details);
            });
        }

        transform() {
            var me = this,
                i = 0,
                nodes = me.data[me.rootNode],
                config = null;
            me.zero();
            for (; i < nodes.length; i++) {
                config = nodes[i];
                me.push(me.config().model(config));
            }
            if (me.afterLoad && me.owner) {
                me.afterLoad.apply(me, [me.owner, me]);
            }
        }

        localBind(data) {
            this.data = data;
            this.transform();
        }

        zero() {
            this._models = [];
        }
    }

    class DataGridRow {
        constructor(config) {
            this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
            this._model = config && config.hasOwnProperty('model') ? config.model : this.config().model;
            this._cssClass = config && config.hasOwnProperty('cssClass') ? config.cssClass : this.config().cssClass;
            this._width = config && config.hasOwnProperty('width') ? config.width : this.config().width;
            this.init();
        }

        get cssClass() {
            return this._cssClass;
        }

        get docElement() {
            return this._docElement;
        }

        get id() {
            return this._id;
        }

        get model() {
            return this._model;
        }

        get width() {
            return this._width;
        }

        config() {
            return {
                id: 'r1',
                cssClass: 'datagridrow',
                model: null,
                width: '120px'
            }
        }

        init() {
            var i = 0,
                row = window.document.createElement('tr'),
                cell = null,
                field = '',
                fields = this.model && this.model.fields ? this.model.fields : null,
                cellId = '',
                colWidth = '';
            //row.setAttribute('id', this.id);
            //row.setAttribute('class', this.cssClass);
            if (fields && fields.length > 0) {
                colWidth = Util.calculateColumnWidth(this.width, fields.length);
                for (; i < fields.length; i++) {
                    field = fields[i];
                    cellId = this.id + 'c' + (i + 1);
                    cell = window.document.createElement('td');
                    cell.setAttribute('style', 'width: ' + colWidth + ' important!;');
                    cell.setAttribute('width', colWidth);
                    cell.setAttribute('id', cellId);
                    cell.appendChild(document.createTextNode(this.model[field]));
                    row.appendChild(cell);
                }

            }
            this._docElement = row;
        }
    }
    class DataGridHeader {
        constructor(config) {
            this._fields = config && config.hasOwnProperty('fields') ? config.fields : this.config().fields;
            this._cssClass = config && config.hasOwnProperty('cssClass') ? config.class : this.config().cssClass;
            this._height = config && config.hasOwnProperty('height') ? config.height : this.config().height;
            this._width = config && config.hasOwnProperty('width') ? config.width : this.config().width;
            this._colWidth = config && config.hasOwnProperty('colWidth') ? config.colWidth : this.config().colWidth;
            this.init();
        }

        get width() {
            return this._width;
        }

        get colWidth() {
            return this._colWidth;
        }

        get height() {
            return this._height;
        }

        get cssClass() {
            return this._cssClass;
        }

        get docElement() {
            return this._docElement;
        }

        get fields() {
            return this._fields;
        }

        config() {
            return {
                fields: [],
                cssClass: 'table table-condensed',
                height: '30px',
                width: '100%',
                colWidth: '120px'
            }
        }

        init() {
            var i = 0,
                table = window.document.createElement('table'),
                thead = window.document.createElement('thead'),
                tbody = window.document.createElement('tbody'),
                row = window.document.createElement('tr'),
                cell = null,
                colId = '',
                field = '',
                colWidth = this.colWidth;
            row.setAttribute('class','success');
            table.setAttribute('style','table-layout:fixed');
            table.setAttribute('class', this.cssClass);
            if (this.fields && this.fields.length > 0) {
                colWidth = Util.calculateColumnWidth(this.width, this.fields.length);
                this._colWidth = colWidth;
                for (; i < this.fields.length; i++) {
                    field = this.fields[i];
                    colId = Util.convertToColumnName(i + 1);
                    cell = window.document.createElement('th');
                    cell.setAttribute('id', colId);
                    cell.setAttribute('width', colWidth);
                    cell.setAttribute('style', 'width: ' + colWidth + ' important!;');
                    cell.appendChild(window.document.createTextNode(field));
                    row.appendChild(cell);
                }
            }
            thead.appendChild(row);
            table.appendChild(thead);
            this._docElement = table;
        }
    }
    class DataGridBody {
        constructor(config) {
            this._width = config && config.hasOwnProperty('width') ? config.width : this.config().width;
            this._height = config && config.hasOwnProperty('height') ? config.width : this.config().height;
            this._cssClass = config && config.hasOwnProperty('cssClass') ? config.height : this.config().cssClass;
            this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
            this._store = config && config.hasOwnProperty('store') ? config.store : null;
            this._isBound = false;
            this.init();
        }

        get isBound() {
            return this._isBound;
        }

        get id() {
            return this._id;
        }

        get height() {
            return this._height;
        }

        get width() {
            return this._width;
        }

        get cssClass() {
            return this._cssClass;
        }

        get docElement() {
            return this._docElement;
        }

        get store() {
            return this._store;
        }

        config() {
            return {
                id: 'datagridBody',
                width: '100%',
                height: '500px',
                cssClass: 'table table-condensed table-striped table-hover'
            }
        }

        bind(store) {
            var i = 0,
                model = null,
                table = this.docElement.firstChild.firstChild,
                tbody = table.firstChild,
                row = null,
                id = 0;

            this._store = store;

            for (; i < this.store.count; i++) {
                model = this.store.models[i];
                id = i + 1;
                row = new DataGridRow({
                    id: 'r' + id,
                    model: model,
                    width: this.width,
                    cssClass: 'datagridrow'
                });
                tbody.appendChild(row.docElement);
            }
            this._isBound = true;

        }

        init() {
            var i = 0,
                container = window.document.createElement('div'),
                scrollBox = window.document.createElement('div'),
                table = window.document.createElement('table'),
                tbody = window.document.createElement('tbody');

            container.setAttribute('style', 'width:' + this.width + ' important!;' +
            'height:' + this.height + ';position:relative;');
            container.setAttribute('id', this.id);
            scrollBox.setAttribute('style', 'max-height:100%;overflow:auto;');

            table.setAttribute('id', this.id + '-body');
            table.setAttribute('class', this.cssClass);
            table.setAttribute('style','table-layout:fixed');
            table.appendChild(tbody);
            scrollBox.appendChild(table);
            container.appendChild(scrollBox);
            this._docElement = container;


        }
    }
    class DataGrid {

        constructor(config) {

            this._id = config && config.hasOwnProperty('id') ? config.id : this.config().id;
            this._width = config && config.hasOwnProperty('width') ? config.width : this.config().width;
            this._height = config && config.hasOwnProperty('height') ? config.height : this.config().height;
            this._hook = config && config.hasOwnProperty('hook') ? config.hook : this.config().hook;
            this._store = config && config.hasOwnProperty('store') ? config.store : this.config().store;
            this.init();
        }

        get hook() {
            return this._hook;
        }

        get height() {
            return this._height;
        }

        get width() {
            return this._width;
        }

        get id() {
            return this._id;
        }

        get docElement() {
            return this._docElement;
        }

        get header() {
            return this._dataGridHeader;
        }

        get body() {
            return this._dataGridBody;
        }

        get store() {
            return this._store;
        }

        config() {
            return {
                id: 'datagrid1',
                width: '500px',
                height: '500px',
                hook: window.document.body,
                store: new Store({
                    afterLoad: this['onAfterStoreLoad'],
                    owner: this
                })
            }
        }

        init() {
            var fieldCount = this.store.model.fields.length,
                adjustedWidth = Util.calculateAdjustedTableWidth(this.width, 30, fieldCount),
                container = window.document.createElement('div'),
                header = new DataGridHeader({
                    id: this.id + 'header',
                    width: adjustedWidth,
                    fields: this.store.model.fields
                }),
                body = new DataGridBody({
                    id: this.id + 'body',
                    width: adjustedWidth
                });
            container.setAttribute('id', this.id);
            container.setAttribute('class', 'panel panel-default');
            container.setAttribute('style', 'height: ' + this.height +';');
            container.appendChild(header.docElement);
            container.appendChild(body.docElement);
            this._dataGridHeader = header;
            this._dataGridBody = body;
            this._docElement = container;
            this.show();
        }

        show() {
            if (this.hook) {
                this.hook.appendChild(this.docElement);
            }
        }

        onAfterStoreLoad(grid, store) {
            if (store.count > 0 && !grid.body.isBound) {
                grid.body.bind(store);
            }
        }
    }
    function onLoad() {
        app.dataGrid = app.dataGrid || new DataGrid({
            hook: document.getElementById('fiddleHook'),
            height: '500px',
            width: '500px'
        });
    }

    // TEST HOOKS - Hooks used with jsTestDriver Unit Tests
    app.test = debug ? app.test || {
        convertToColumnName: function (index) {
            return Util.convertToColumnName(index);
        },
        calculateAdjustedTableWidth: function (tableWidth, fieldCount) {
            return Util.calculateAdjustedTableWidth(tableWidth, fieldCount);
        },
        calculateColumnWidth: function (tableWidth, fieldCount) {
            return Util.calculateColumnWidth(tableWidth, fieldCount);
        },
        isDigit: function (ch) {
            return Util.isDigit(ch);
        },
        popInt: function (str) {
            return Util.popInt(str);
        },
        getAsyncPromise: function (url) {
            return Util.getAsyncPromise(url);
        },
        dataGridRow: function (config) {
            return new DataGridRow(config);
        },
        dataGridHeader: function (config) {
            return new DataGridHeader(config);
        },
        dataGridBody: function (config) {
            return new DataGridBody(config);
        },
        dataGrid: function (config) {
            return new DataGrid(config);
        },
        model: function (config) {
            return new Model(config);
        },
        store: function (config) {
            return new Store(config);
        }
    } : document.body.addEventListener('load', onLoad(), false);

})(window.app = window.app || {})
