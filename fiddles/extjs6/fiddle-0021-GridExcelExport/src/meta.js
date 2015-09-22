var meta = {
    fiddleHeader: 'Grid Excel Exporter',
    fiddleSubHeader: '<i>Fiddle exploring the Ext.grid.plugin.Exporter class.</i></br>',
    recordsUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/data.json'
}

function getGridColumnState(grid) {
    var localStorage = Ext.state.Manager.getProvider(),
        state = localStorage.get(grid.getStateId(), []);
    return state && state.columns ? state.columns : null;
}

function onGridSaveState(grid) {
    var me = grid,
        state = {},
        storeState = me.store.getState(),
        localStorage = Ext.state.Manager.getProvider();

    state = me.addPropertyToState(state, 'columns', me.headerCt.getColumnsState());

    if (storeState) {
        state.storeState = storeState;
    }
    localStorage.set(me.getStateId(), state);
}

function onGridApplyState(grid) {
    var me = grid,
        localStorage = Ext.state.Manager.getProvider(),
        state = localStorage.get(me.getStateId(), []),
        sorter = !Ext.isEmpty(state) ? state.sort : null,
        storeState = !Ext.isEmpty(state) ? state.storeState : null,
        store = !Ext.isEmpty(state) ? me.store : null,
        columns = !Ext.isEmpty(state) ? state.columns : null;

    if (!Ext.isEmpty(state)) {
        store.loadRecords([], {addRecords: false});
        delete state.columns;
        if (columns) {
            me.headerCt.applyColumnsState(columns);
        }
        if (sorter) {
            if (store.remoteSort) {
                store.sort({
                    property: sorter.property,
                    direction: sorter.direction,
                    root: sorter.root
                }, null, false);
            } else {
                store.sort(sorter.property, sorter.direction);
            }
        }
        else if (storeState) {
            store.applyState(storeState);
        }
        store.load();
    }
}



