Ext.onReady(function() {
    Ext.application({
        name : '{{FiddleName}}',
        launch : function() {
            Ext.Msg.alert('ExtJS Version', Ext.getVersion());
        }
    });
});
