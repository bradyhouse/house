Ext.define('FiddleBaseGridColumn', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'fiddleBaseGridColumm',
        before: {
            constructor: 'onBeforeConstructor'
        }
    },
    onBeforeConstructor: function (config) {
        var me = this;

        me.getStateId = function () {
            return this.dataIndex || this.headerId
        };

        me.getColumnState = function () {
            var me = this,
                items = me.items.items,
                iLen = items ? items.length : 0,
                i,
                columns = [],
                state = {
                    id: me.getStateId()
                };

            state = Ext.copyTo(state, this, 'dataIndex, text, width, flex, locked, hidden, sortable, xtype');

            if (me.isGroupHeader) {
                for (i = 0; i < iLen; i++) {
                    columns.push(items[i].getColumnState());
                }

                if (columns.length) {
                    state.columns = columns;
                }
            }

            if (!state.width) {
                delete state.width;
            }
            if ('width' in state || !state.flex) {
                delete state.flex;
            }

            return state;
        };

    }

});

