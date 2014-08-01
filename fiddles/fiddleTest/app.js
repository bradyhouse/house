

Ext.onReady(function() {
    Ext.application({
        name : '$1',
        launch : function() {
            Ext.Msg.alert('ExtJS Version', Ext.getVersion());
        }
    });
});
