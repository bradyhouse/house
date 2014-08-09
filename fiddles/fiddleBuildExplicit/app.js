/* UNDER CONSTRUCTION  08/07/2014 */

Ext.onReady(function() {

    try {

        var manifest = Ext.manifest;
        console.log(Ext);
        Ext.Msg.alert('Alert', manifest);
    } catch (err) {
        Ext.Msg.alert('Error', err.message);
    }

});