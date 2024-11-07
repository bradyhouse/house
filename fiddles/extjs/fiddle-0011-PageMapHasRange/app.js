Ext.application({
    name: 'Fiddle',
    requires: ['Ext.window.MessageBox'],
    launch: function () {
        var Msg = Ext.Msg,
            pageMap = new Ext.data.PageMap(),
            version = Ext.getVersion().version;
        try {

            pageMap.hasRange(undefined, undefined);

            Msg.show({
                title: 'ExtJS Version ~ ' + version,
                message: "No error",
                modal: true,
                buttons: Msg.OK,
                icon: Msg.INFO
            });

        } catch (err) {
            Msg.show({
                title: 'ExtJS Version ~ ' + version,
                message: err.message,
                modal: true,
                buttons: Msg.OK,
                icon: Msg.WARNING
            });
        }
    }
});
