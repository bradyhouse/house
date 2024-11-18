Ext.define('FiddleStateManager', {
    requires: ['Ext.state.Manager', 'Ext.state.LocalStorageProvider']
}, function () {
    Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
        prefix: 'fiddle-'
    }));
});
