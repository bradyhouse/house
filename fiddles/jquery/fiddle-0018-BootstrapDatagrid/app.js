/**
 * Startup
 * 1) AJAX -> data.json
 * 2) On Callback ->
 * - bind app store
 * - render app
 *
 * Bind Store
 * Iterate json root ->
 * - create a model
 * - add to store
 *
 * Render App
 * 1) Create container
 * 2) Add Table
 * 3) Add Table header
 * 4) Iterate store fields ->
 * - Add a column header for each field
 * 5) Iterate store ->
 * - Create a table row for each record
 * - Add row to table
 *
 */

(function (app, $, undefined) {
    "use strict";
    app.util = app.util || {
        ajax: {
            request: function (fn) {
                fn.apply(this, [window.houseData.json]);
            }
        }
    };
    app.model = function (config) {
        var localFields = ['index', 'isActive', 'checkingBalance', 'savingsBalance', 'age', 'eyeColor', 'name', 'gender', 'company', 'latitude', 'longitude'],
            field = '',
            i = 0;
        for (; i < localFields.length; i++) {
            field = localFields[i];
            if (config && config.hasOwnProperty(field)) {
                this[field] = config[field];
            } else {
                this[field] = '';
            }
        }
        return {
            data: this,
            fields: localFields
        }
    };
    app.store = app.store || {
        request: null,
        data: []
    };
    app.view = app.view || {
        isRendered: false,
        Container: function (parent) {
            var me = this;
            new app.view.Base(me, '<div>', 'fiddleContainer', 'container-fluid', null, parent);
        },
        Tr: function (parent) {
            var me = this;
            new app.view.Base(me, '<tr>', null, null, null, parent);
        },
        Td: function (parent, value) {
            var me = this;
            new app.view.Base(me, '<td>', null, null, null, parent, function () {
                me.self.text(value);
            });
        },
        Th: function (parent, text) {
            var me = this;
            new app.view.Base(me, '<th>', null, null, null, parent, function () {
                me.self.text(text);
            });
        },
        Thead: function (parent) {
            new app.view.Base(this, '<thead>', null, null, null, parent);
        },
        Tbody: function (parent) {
            new app.view.Base(this, '<tbody>', null, null, null, parent);
        },
        Table: function (parent) {
            var me = this,
                columnIndex = 0,
                field = '',
                fields = app.model().fields,
                columnName = '';
            new app.view.Base(me, '<table>', 'fiddleTable', 'table table-bordered table-responsive table-hover', null, parent);
        },
        Base: function (that, tag, id, baseCls, cls, parent, callback) {
            var me = that;
            if (baseCls) {
                me.baseCls = baseCls;
            }
            if (cls) {
                me.cls = cls;
            }
            if (id) {
                me.title = id;
                me.id = id;
            }
            me.self = null;
            me.render = function () {
                var me = this,
                    renderedCls = me.cls ? (me.baseCls + ' ' + me.cls) : me.baseCls;

                me.self = $(tag);
                if (renderedCls) {
                    me.self.attr('class', renderedCls);
                }
                if (me.id) {
                    me.self.attr('id', me.id);
                }

                if (parent) {
                    me.parent = parent;
                    me.self.appendTo(parent);
                }
                if (callback) {
                    callback.apply(me, [arguments]);
                }
            };
            me.render();
        },
        beforeRender: function (fn) {
            var me = this;
            app.util.ajax.request(function (json) {
                var root = JSON.parse(json),
                    i = 0,
                    config,
                    model;
                for (; i < root.data.length; i++) {
                    config = root.data[i];
                    model = new app.model(config);
                    app.store.data.push(model);
                }
                if (fn) {
                    fn.apply(this, [arguments]);
                }
            });
        },
        render: function (hook) {
            app.view.beforeRender(function () {
                var fields = app.model().fields,
                    field = '',
                    rowIndex = 0,
                    rowName = 'row-',
                    fieldIndex = 0,
                    cellValue = '';

                app.container = new app.view.Container(hook);
                app.container.table = new app.view.Table(app.container.self);
                app.container.table.thead = new app.view.Thead(app.container.table.self);
                app.container.table.thead.tr = new app.view.Tr(app.container.table.thead.self);
                app.container.table.tbody = new app.view.Tbody(app.container.table.self);

                fields.map(function (field) {
                    app.container.table.thead.tr[field] = new app.view.Th(app.container.table.thead.tr.self, field);
                });

                app.store.data.map(function (model) {
                    rowName = 'row-' + rowIndex;
                    app.container.table.tbody[rowName] = new app.view.Tr(app.container.table.tbody.self);

                    fields.map(function (field) {
                        app.container.table.tbody[rowName][field] = new app.view.Td(app.container.table.tbody[rowName].self, model.data[field]);
                    });
                    rowIndex++;
                });

                app.view.isRendered = true;
                if (app.view.rendered) {
                    app.view.rendered.apply(app);
                }
            });
        },
        rendered: null,
        init: function () {
            var hook = $('#fiddleHook');
            window.app.view.render(hook);
        }
    };
    $(document).ready(function () {
        app.view.init();
    });

})(window.app = window.app || {}, jQuery)
