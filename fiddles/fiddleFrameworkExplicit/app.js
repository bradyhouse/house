Ext.onReady(function () {
    try {
        if (Ext.getVersion().parts[0] < 5) {
            Ext.Error.raise("This fiddle requires ExtJS 5.*.");
        }
        Ext.Msg.alert('Alert', 'Hi there!');
    } catch (err) {
        Ext.Msg.alert('Error', err.message);
    }
});