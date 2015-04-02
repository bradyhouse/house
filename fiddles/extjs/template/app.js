Ext.onReady(function () {
    Ext.QuickTips.init();
    try {
        if (Ext.getVersion().parts[0] < 5) {
            Ext.Error.raise("This fiddle requires ExtJS 5.*.");
        }
        Ext.Msg.alert('Neptune', 'Ext JS ' + Ext.getVersion().version);
    } catch (err) {
        Ext.Msg.alert('Error', err.message);
    }
});